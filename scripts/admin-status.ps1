# Read ADMIN_PASSWORD from .env.local and show /api/admin/status for the deployed site
# Usage: Open PowerShell in the repo root and run:
# powershell -ExecutionPolicy Bypass -File .\scripts\admin-status.ps1

$envPath = Join-Path $PSScriptRoot "..\.env.local"
if (!(Test-Path $envPath)) {
  Write-Error "Cannot find .env.local at $envPath"
  exit 1
}

$content = Get-Content $envPath -Raw
# match ADMIN_PASSWORD optionally quoted
$m = [regex]::Match($content, '(?m)^ADMIN_PASSWORD\s*=\s*"?([^"\r\n]+)"?')
if (-not $m.Success) {
  Write-Error "ADMIN_PASSWORD not found in .env.local"
  exit 1
}
$adminPassword = $m.Groups[1].Value

$loginUrl = 'https://www.bravobraziliansteakouse.com/api/admin/auth'
$statusUrl = 'https://www.bravobraziliansteakouse.com/api/admin/status'

$tempCookies = Join-Path $PSScriptRoot "..\cookies_admin.txt"
if (Test-Path $tempCookies) { Remove-Item $tempCookies -Force }

Write-Host "Logging in (hidden password read from .env.local)..."
$loginPayload = "{`"password`":`"$adminPassword`"}"
# use curl.exe for cookie jar compatibility
$login = & curl.exe -s -c $tempCookies -H "Content-Type: application/json" -X POST -d $loginPayload $loginUrl
if ($LASTEXITCODE -ne 0) {
  Write-Error "Login request failed"
  exit 1
}

# Check if login returned ok
if ($login -match 'Invalid password' -or $login -match 'Admin not configured' -or $login -match 'Invalid') {
  Write-Error "Login failed: $login"
  exit 1
}

Write-Host "Fetching status..."
$status = & curl.exe -s -b $tempCookies $statusUrl
if ($LASTEXITCODE -ne 0) {
  Write-Error "Status request failed"
  exit 1
}

# print raw JSON
Write-Output $status

# cleanup
if (Test-Path $tempCookies) { Remove-Item $tempCookies -Force }

Write-Host "Done."
