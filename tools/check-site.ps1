param(
  [switch]$Screenshots
)

$ErrorActionPreference = "Stop"
$Root = (Get-Location).Path
if (-not (Test-Path -LiteralPath (Join-Path $Root "app.js"))) {
  throw "Run this script from the repository root."
}

Write-Host "Checking JavaScript syntax..."
node --check app.js
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Checking local HTML references..."
$htmlFiles = Get-ChildItem -LiteralPath $Root -Filter "*.html" -File
$missing = New-Object System.Collections.Generic.List[string]
$attributePattern = '(?:href|src)=["'']([^"'']+)["'']'

foreach ($file in $htmlFiles) {
  $content = Get-Content -Raw -LiteralPath $file.FullName
  foreach ($match in [regex]::Matches($content, $attributePattern)) {
    $raw = $match.Groups[1].Value
    if ($raw -match '^(https?:|mailto:|tel:|#)') { continue }
    $clean = ($raw -split '[?#]')[0]
    if ([string]::IsNullOrWhiteSpace($clean)) { continue }

    $target = Join-Path $file.DirectoryName $clean
    if (-not (Test-Path -LiteralPath $target)) {
      $missing.Add("$($file.Name): $raw")
    }
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
    & $chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1200 --screenshot="$Root\_qa_home_desktop.png" "file:///$rootUrl/index.html"
    & $chrome --headless=new --disable-gpu --hide-scrollbars --window-size=390,900 --screenshot="$Root\_qa_home_mobile.png" "file:///$rootUrl/index.html"
    & $chrome --headless=new --disable-gpu --hide-scrollbars --window-size=970,700 --screenshot="$Root\_qa_vita.png" "file:///$rootUrl/vita.html"
  } else {
    Write-Host "Chrome not found, skipping screenshots."
  }
}

Write-Host "All checks passed."
