param(
  [switch]$Screenshots
)

$ErrorActionPreference = "Stop"
$Root = (Get-Location).Path
if (-not (Test-Path -LiteralPath (Join-Path $Root "app.js"))) {
  throw "Run this script from the repository root."
}

Write-Host "Checking JavaScript syntax..."
node -e "new Function(require('fs').readFileSync('app.js','utf8'));"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

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
}

Write-Host "Checking CSS asset references..."
$cssFiles = Get-ChildItem -LiteralPath $Root -Filter "*.css" -File
foreach ($file in $cssFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
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
    $rootUrl = $Root.Replace('\','/')
    $profileDir = Join-Path $Root "_chrome_tmp_profile"
    $screenshotsToRender = @(
      @{ Path = "$Root\_qa_home_desktop.png"; Size = "1440,1200"; Url = "file:///$rootUrl/index.html" },
      @{ Path = "$Root\_qa_home_mobile.png"; Size = "390,900"; Url = "file:///$rootUrl/index.html" },
      @{ Path = "$Root\_qa_vita.png"; Size = "970,700"; Url = "file:///$rootUrl/vita.html" }
    )

    if (Test-Path -LiteralPath $profileDir) {
      Remove-Item -LiteralPath $profileDir -Recurse -Force
    }

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
  } else {
    Write-Host "Chrome not found, skipping screenshots."
  }
}

Write-Host "All checks passed."
