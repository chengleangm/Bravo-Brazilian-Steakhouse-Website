# Read .env.local and push R2 env vars to Vercel (Preview + Production)
# Usage:
# 1. Install Vercel CLI: npm i -g vercel
# 2. Login: vercel login
# 3. Link project (if not linked): vercel link
# 4. Run this script in PowerShell: powershell -ExecutionPolicy Bypass -File .\scripts\vercel-set-env.ps1

$envFile = "${PSScriptRoot}\..\ .env.local"
# fallback path without space (works for this repo layout)
if (!(Test-Path "$PSScriptRoot\..\.env.local")) {
  Write-Error "Could not find .env.local in the repo root. Please run this script from the repository root or adjust the path."
  exit 1
}
$envFile = "$PSScriptRoot\..\.env.local"

# Keys to push
$keys = @("R2_BUCKET_NAME", "R2_ENDPOINT", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY")

# Read file
$content = Get-Content $envFile -Raw
foreach ($key in $keys) {
  # match KEY="value" or KEY=value
  $pattern = "(?m)^{0}\s*=\s*\"?([^\"\r\n]+)\"?" -f [regex]::Escape($key)
  $m = [regex]::Match($content, $pattern)
  if ($m.Success) {
    $value = $m.Groups[1].Value.Trim()
    if ([string]::IsNullOrWhiteSpace($value)) {
      Write-Host "Skipping $key — value empty in .env.local"
      continue
    }
    Write-Host "Setting $key for Production and Preview..."
    # Production
    vercel env add $key "$value" production
    # Preview
    vercel env add $key "$value" preview
  } else {
    Write-Warning "$key not found in .env.local. You can enter a value now or skip."
    $input = Read-Host "Enter value for $key (leave blank to skip)"
    if (-not [string]::IsNullOrWhiteSpace($input)) {
      vercel env add $key "$input" production
      vercel env add $key "$input" preview
    }
  }
}

Write-Host "Done. Please redeploy your project in Vercel dashboard or run a new commit to trigger deployment."
