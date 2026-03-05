$f = "src\components\AdminInterfaces.jsx"
$lines = Get-Content $f -Encoding UTF8
$kept = $lines[0..431] + $lines[728..($lines.Length - 1)]
$kept | Set-Content $f -Encoding UTF8
Write-Host "Done. Lines kept: $($kept.Length)"
