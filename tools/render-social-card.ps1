param(
  [string]$ChromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
)

$ErrorActionPreference = "Stop"

$root = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$html = Join-Path $PSScriptRoot "social-card.html"
$png = Join-Path $root "_social-card-render.png"
$jpg = Join-Path $root "image\social-card.jpg"
$url = "file:///" + ($html -replace "\\", "/")

if (-not (Test-Path -LiteralPath $ChromePath)) {
  throw "Chrome not found at $ChromePath"
}

& $ChromePath `
  --headless=new `
  --disable-gpu `
  --disable-gpu-compositing `
  --disable-software-rasterizer `
  --disable-dev-shm-usage `
  --hide-scrollbars `
  --window-size=1200,630 `
  --screenshot="$png" `
  "$url" | Out-Null

Add-Type -AssemblyName System.Drawing

$bitmap = [System.Drawing.Image]::FromFile($png)
try {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $quality = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $quality.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)
  $bitmap.Save($jpg, $codec, $quality)
}
finally {
  $bitmap.Dispose()
  if (Test-Path -LiteralPath $png) {
    Remove-Item -LiteralPath $png -Force
  }
}

Write-Host "Rendered $jpg"
