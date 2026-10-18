[CmdletBinding()]
param(
    [switch]$UpdateOnly,
    [switch]$NoAutoUpdate,
    [string]$Ref = 'main',
    [string]$CodexHome = $env:CODEX_HOME,
    [string]$CodexExecutable
)

$ErrorActionPreference = 'Stop'
if (-not $CodexHome) { $CodexHome = Join-Path $env:USERPROFILE '.codex' }
$env:CODEX_HOME = $CodexHome
$marketplace = 'tvg-skolotajiem'
$plugin = 'tvg@tvg-skolotajiem'
$taskName = 'TVG-Codex-Update'
$dataDir = Join-Path $CodexHome 'tvg-update'
$codexCommand = Get-Command codex -ErrorAction SilentlyContinue
if ($CodexExecutable) {
    $codexExe = $CodexExecutable
} elseif ($codexCommand) {
    $codexExe = $codexCommand.Source
} else {
    $codexExe = Join-Path $env:LOCALAPPDATA 'Programs/OpenAI/Codex/bin/codex.exe'
}
if (-not (Test-Path -LiteralPath $codexExe)) {
    throw 'Vispirms uzstadiet Codex. Pec tam palaidiet so failu velreiz.'
}

function Invoke-TvgCodex {
    param([string[]]$Arguments)
    & $codexExe @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Codex komanda neizdevas (kods $LASTEXITCODE): $($Arguments -join ' ')"
    }
}

try {
    if ($UpdateOnly) {
        # Refresh the tracked Git branch, then refresh the installed package.
        # Reinstall refreshes content even when the package version is unchanged.
        Invoke-TvgCodex -Arguments @('plugin', 'marketplace', 'upgrade', $marketplace)
        Invoke-TvgCodex -Arguments @('plugin', 'add', $plugin)
        if (Test-Path -LiteralPath $dataDir) {
            Set-Content -LiteralPath (Join-Path $dataDir 'last-update.txt') -Encoding UTF8 -Value "OK $(Get-Date -Format o)"
        }
        exit 0
    }

    Invoke-TvgCodex -Arguments @('plugin', 'marketplace', 'add', 'https://github.com/MI-skolotajiem/tvg-plugins.git', '--ref', $Ref)
    Invoke-TvgCodex -Arguments @('plugin', 'add', $plugin)

    if (-not $NoAutoUpdate) {
        New-Item -ItemType Directory -Force -Path $dataDir | Out-Null
        $updater = Join-Path $dataDir 'update-tvg.ps1'
        if ([IO.Path]::GetFullPath($PSCommandPath) -ne [IO.Path]::GetFullPath($updater)) {
            Copy-Item -LiteralPath $PSCommandPath -Destination $updater -Force
        }
        # Pass the same Codex data directory to the scheduled run.
        $arguments = '-NoProfile -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File "' + $updater + '" -UpdateOnly -CodexHome "' + $CodexHome + '" -CodexExecutable "' + $codexExe + '"'
        $windowsPowerShell = Join-Path $env:SystemRoot 'System32/WindowsPowerShell/v1.0/powershell.exe'
        $action = New-ScheduledTaskAction -Execute $windowsPowerShell -Argument $arguments
        $trigger = New-ScheduledTaskTrigger -Daily -At '12:00'
        $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -RunOnlyIfNetworkAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 10)
        $identity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
        $principal = New-ScheduledTaskPrincipal -UserId $identity -LogonType Interactive -RunLevel Limited
        Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description 'Atjaunina TVG Codex prasmes no MI-skolotajiem/tvg-plugins.' -Force | Out-Null
        Write-Host 'Automatiska parbaude ieslegta: reizi diena, kad lietotajs ir pierakstijies Windows.'
    }
    Write-Host 'TVG komplekts uzstadits. Atveriet jaunu Codex sarunu; ja prasmes nav redzamas, parstartejiet Codex.'
} catch {
    if ($UpdateOnly -and (Test-Path -LiteralPath $dataDir)) {
        Set-Content -LiteralPath (Join-Path $dataDir 'last-update.txt') -Encoding UTF8 -Value "ERROR $(Get-Date -Format o): $($_.Exception.Message)"
    }
    Write-Error $_
    exit 1
}
