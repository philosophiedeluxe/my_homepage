param(
  [switch]$Screenshots,
  [switch]$Pwa
)

$ErrorActionPreference = "Stop"
$Root = (Get-Location).Path
if (-not (Test-Path -LiteralPath (Join-Path $Root "app.js"))) {
  throw "Run this script from the repository root."
}

Write-Host "Checking JavaScript module syntax..."
$jsFiles = Get-ChildItem -LiteralPath $Root -Recurse -Filter "*.js" -File
foreach ($file in $jsFiles) {
  Get-Content -Raw -LiteralPath $file.FullName | node --input-type=module --check
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "Checking local HTML references..."
$htmlFiles = Get-ChildItem -LiteralPath $Root -Filter "*.html" -File
$missing = New-Object System.Collections.Generic.List[string]

function Add-LocalReference {
  param(
    [string]$BaseDirectory,
    [string]$Owner,
    [string]$Raw
  )

  if ([string]::IsNullOrWhiteSpace($Raw)) { return }
  if ($Raw -match '^(https?:|mailto:|tel:|#|data:)') { return }

  $clean = ($Raw -split '[?#]')[0].Trim()
  if ([string]::IsNullOrWhiteSpace($clean)) { return }

  $target = Join-Path $BaseDirectory $clean
  if (-not (Test-Path -LiteralPath $target)) {
    $missing.Add("${Owner}: $Raw")
  }
}

function Assert-Check {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw $Message
  }
}

function Test-JsonField {
  param(
    [object]$Object,
    [string]$Name
  )

  if ($null -eq $Object) { return $false }
  if (-not ($Object.PSObject.Properties.Name -contains $Name)) { return $false }
  $value = $Object.$Name
  if ($null -eq $value) { return $false }
  if ($value -is [array]) { return $value.Count -gt 0 }
  return -not [string]::IsNullOrWhiteSpace([string]$value)
}

function Resolve-SitePath {
  param([string]$Raw)

  $clean = ($Raw -split '[?#]')[0].Trim()
  if ([string]::IsNullOrWhiteSpace($clean)) { return $null }
  return Join-Path $Root $clean
}

Write-Host "Checking locale modules..."
foreach ($lang in @("de", "en", "es", "ja")) {
  $localePath = Join-Path $Root "js\locales\$lang.js"
  Assert-Check (Test-Path -LiteralPath $localePath) "Locale module missing: $localePath"
  Assert-Check ((Get-Item -LiteralPath $localePath).Length -gt 64) "Locale module is unexpectedly empty: $localePath"
}

Write-Host "Checking JavaScript module references..."
foreach ($file in $jsFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
  foreach ($match in [regex]::Matches($content, 'from\s+["'']([^"'']+)')) {
    Add-LocalReference -BaseDirectory $file.DirectoryName -Owner $file.Name -Raw $match.Groups[1].Value
  }
}

foreach ($file in $htmlFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
  foreach ($match in [regex]::Matches($content, '(?:href|src|data-cert-src)=["'']([^"'']+)["'']')) {
    Add-LocalReference -BaseDirectory $file.DirectoryName -Owner $file.Name -Raw $match.Groups[1].Value
  }

  foreach ($match in [regex]::Matches($content, 'srcset=["'']([^"'']+)["'']')) {
    $sources = $match.Groups[1].Value -split ','
    foreach ($source in $sources) {
      $raw = ($source.Trim() -split '\s+')[0]
      Add-LocalReference -BaseDirectory $file.DirectoryName -Owner "$($file.Name) srcset" -Raw $raw
    }
  }

  foreach ($match in [regex]::Matches($content, '<script[^>]+type=["'']application/ld\+json["''][^>]*>(.*?)</script>', [System.Text.RegularExpressions.RegexOptions]::Singleline)) {
    try {
      $null = $match.Groups[1].Value | ConvertFrom-Json
    } catch {
      throw "Invalid JSON-LD in $($file.Name): $($_.Exception.Message)"
    }
  }
}

Write-Host "Checking CSS asset references..."
$cssFiles = Get-ChildItem -LiteralPath $Root -Recurse -Filter "*.css" -File
foreach ($file in $cssFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
  foreach ($match in [regex]::Matches($content, '@import\s+(?:url\()?(["''])([^"'']+)\1\)?')) {
    Add-LocalReference -BaseDirectory $file.DirectoryName -Owner $file.Name -Raw $match.Groups[2].Value
  }
  foreach ($match in [regex]::Matches($content, 'url\((["'']?)([^)"'']+)\1\)')) {
    Add-LocalReference -BaseDirectory $file.DirectoryName -Owner $file.Name -Raw $match.Groups[2].Value
  }
}

Write-Host "Checking PWA manifest..."
$manifestPath = Join-Path $Root "manifest.webmanifest"
if (-not (Test-Path -LiteralPath $manifestPath)) {
  $missing.Add("manifest.webmanifest")
} else {
  $manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
  foreach ($icon in $manifest.icons) {
    Add-LocalReference -BaseDirectory $Root -Owner "manifest.webmanifest" -Raw $icon.src
  }
  foreach ($shortcut in $manifest.shortcuts) {
    Add-LocalReference -BaseDirectory $Root -Owner "manifest.webmanifest" -Raw $shortcut.url
    foreach ($icon in $shortcut.icons) {
      Add-LocalReference -BaseDirectory $Root -Owner "manifest.webmanifest" -Raw $icon.src
    }
  }
}

Write-Host "Checking service worker precache..."
$serviceWorkerPath = Join-Path $Root "sw.js"
if (-not (Test-Path -LiteralPath $serviceWorkerPath)) {
  $missing.Add("sw.js")
} else {
  $serviceWorker = Get-Content -Raw -LiteralPath $serviceWorkerPath
  foreach ($match in [regex]::Matches($serviceWorker, '["''](\./[^"'']+)["'']')) {
    Add-LocalReference -BaseDirectory $Root -Owner "sw.js" -Raw $match.Groups[1].Value
  }
}

if ($Pwa) {
  Write-Host "Running PWA installability audit..."
  Assert-Check (Test-Path -LiteralPath $manifestPath) "PWA audit failed: manifest.webmanifest is missing."
  Assert-Check (Test-Path -LiteralPath $serviceWorkerPath) "PWA audit failed: sw.js is missing."
  Assert-Check (Test-Path -LiteralPath (Join-Path $Root "offline.html")) "PWA audit failed: offline.html is missing."

  $manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
  foreach ($field in @("name", "short_name", "start_url", "scope", "display", "theme_color", "background_color", "icons")) {
    Assert-Check (Test-JsonField -Object $manifest -Name $field) "PWA audit failed: manifest field '$field' is missing or empty."
  }

  Assert-Check ($manifest.display -in @("standalone", "fullscreen", "minimal-ui")) "PWA audit failed: manifest display should be standalone, fullscreen or minimal-ui."

  $icons = @($manifest.icons)
  Assert-Check ($icons.Count -gt 0) "PWA audit failed: manifest contains no icons."
  Assert-Check (($icons | Where-Object { $_.sizes -match '192x192' }).Count -gt 0) "PWA audit failed: manifest needs a 192x192 icon."
  Assert-Check (($icons | Where-Object { $_.sizes -match '512x512' }).Count -gt 0) "PWA audit failed: manifest needs a 512x512 icon."
  Assert-Check (($icons | Where-Object { $_.purpose -match 'maskable' }).Count -gt 0) "PWA audit failed: manifest needs at least one maskable icon."

  foreach ($icon in $icons) {
    Assert-Check (Test-JsonField -Object $icon -Name "src") "PWA audit failed: an icon has no src."
    Assert-Check (Test-Path -LiteralPath (Resolve-SitePath $icon.src)) "PWA audit failed: icon file missing: $($icon.src)"
  }

  $serviceWorker = Get-Content -Raw -LiteralPath $serviceWorkerPath
  foreach ($needle in @("install", "activate", "fetch", "message", "SKIP_WAITING", "offline.html", "clients.claim")) {
    Assert-Check ($serviceWorker -match [regex]::Escape($needle)) "PWA audit failed: service worker does not contain '$needle'."
  }

  foreach ($page in @("index.html", "vita.html", "signals.html", "impressum.html", "datenschutz.html", "offline.html")) {
    $path = Join-Path $Root $page
    Assert-Check (Test-Path -LiteralPath $path) "PWA audit failed: $page is missing."
    $content = Get-Content -Raw -LiteralPath $path
    Assert-Check ($content -match 'rel=["'']manifest["'']') "PWA audit failed: $page has no manifest link."
    Assert-Check ($content -match 'name=["'']theme-color["'']') "PWA audit failed: $page has no theme-color meta tag."
    Assert-Check ($content -match 'rel=["'']apple-touch-icon["'']') "PWA audit failed: $page has no apple-touch-icon."
  }

  foreach ($page in @("index.html", "vita.html")) {
    $content = Get-Content -Raw -LiteralPath (Join-Path $Root $page)
    Assert-Check ($content -match 'application/ld\+json') "PWA audit failed: $page should include JSON-LD structured data."
  }

  Write-Host "PWA audit passed."
}

if ($missing.Count -gt 0) {
  Write-Host "Missing references:"
  $missing | ForEach-Object { Write-Host "  $_" }
  exit 1
}

Write-Host "Checking sitemap..."
[xml]$sitemap = Get-Content -Raw -LiteralPath "sitemap.xml"
if (-not $sitemap.urlset.url.loc) {
  throw "sitemap.xml contains no URLs."
}

if ($Screenshots) {
  $chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
  if (Test-Path -LiteralPath $chrome) {
    Write-Host "Rendering smoke screenshots..."
    $profileDir = Join-Path $Root "_chrome_tmp_profile"
    $qaPort = 41731
    $server = Start-Process -FilePath "node" -ArgumentList @("tools/serve-site.cjs", "--port=$qaPort") -WorkingDirectory $Root -WindowStyle Hidden -PassThru
    $serverReady = $false
    for ($attempt = 0; $attempt -lt 20; $attempt++) {
      try {
        Invoke-WebRequest -UseBasicParsing "http://127.0.0.1:$qaPort/index.html" | Out-Null
        $serverReady = $true
        break
      } catch {
        Start-Sleep -Milliseconds 150
      }
    }
    if (-not $serverReady) {
      if (-not $server.HasExited) { Stop-Process -Id $server.Id -Force }
      throw "Local screenshot server did not start."
    }
    $screenshotsToRender = @(
      @{ Path = "$Root\_qa_home_desktop.png"; Size = "1440,1200"; Url = "http://127.0.0.1:$qaPort/index.html" },
      @{ Path = "$Root\_qa_home_mobile.png"; Size = "390,900"; Url = "http://127.0.0.1:$qaPort/index.html" },
      @{ Path = "$Root\_qa_vita.png"; Size = "970,700"; Url = "http://127.0.0.1:$qaPort/vita.html" }
    )

    if (Test-Path -LiteralPath $profileDir) {
      Remove-Item -LiteralPath $profileDir -Recurse -Force
    }

    try {
      foreach ($shot in $screenshotsToRender) {
        if (Test-Path -LiteralPath $shot.Path) {
          Remove-Item -LiteralPath $shot.Path -Force
        }

        & $chrome --headless=new --disable-gpu --hide-scrollbars "--user-data-dir=$profileDir" "--window-size=$($shot.Size)" "--screenshot=$($shot.Path)" $shot.Url
        if (-not (Test-Path -LiteralPath $shot.Path)) {
          throw "Screenshot was not created: $($shot.Path)"
        }

        $created = Get-Item -LiteralPath $shot.Path
        if ($created.Length -le 0) {
          throw "Screenshot is empty: $($shot.Path)"
        }
      }
    } finally {
      if (-not $server.HasExited) { Stop-Process -Id $server.Id -Force }
    }
  } else {
    Write-Host "Chrome not found, skipping screenshots."
  }
}

Write-Host "All checks passed."
