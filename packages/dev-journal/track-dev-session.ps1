# Dev Session Tracker – PowerShell Script
# Author: Maddy

$action = Read-Host "Type 'start' to begin a session or 'end' to finish one"

$logFolder = "$PSScriptRoot\journal"
if (!(Test-Path $logFolder)) {
    New-Item -ItemType Directory -Path $logFolder | Out-Null
}

$today = Get-Date -Format "yyyy-MM-dd"
$logPath = "$logFolder\$today.md"

if ($action -eq "start") {
    $startTime = Get-Date
    $timestamp = $startTime.ToString("HH:mm:ss")
    
    $entry = @"
# 🛠️ Dev Session – $today

## ⏱️ Start Time
$timestamp

---
"@
    $entry | Out-File -FilePath $logPath -Encoding utf8 -Force
    Write-Host "Session started at $timestamp. Logging to $logPath"

} elseif ($action -eq "end") {
    $endTime = Get-Date
    $timestamp = $endTime.ToString("HH:mm:ss")
    $duration = ($endTime - (Get-Content $logPath | Select-String 'Start Time' | ForEach-Object {
        [datetime]::Parse($_.Line -replace '## ⏱️ Start Time', '').Trim()
    })).ToString("hh\:mm\:ss")

    $achievements = Read-Host "✅ What did you accomplish?"
    $feeling = Read-Host "🧠 How do you feel now?"

    $entry = @"
## 🧾 End Time
$timestamp

## ⏳ Duration
$duration

## ✅ Achievements
$achievements

## 🧠 Reflection
$feeling

---
"@

    Add-Content -Path $logPath -Value $entry
    Write-Host "Session ended and logged at $timestamp"
} else {
    Write-Host "Invalid input. Type 'start' or 'end'."
}
