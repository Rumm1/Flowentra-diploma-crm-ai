# Publishes this locally initialized diploma repository to a NEW PRIVATE GitHub repository.
# Run from PowerShell:  .\PUBLISH_TO_GITHUB.ps1
# Requires Git and GitHub CLI (gh). GitHub sign-in is performed interactively by the owner.
param(
    [ValidatePattern('^[A-Za-z0-9_.-]+$')]
    [string]$RepositoryName = 'diploma-crm-ai'
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw 'Git is not installed. Install Git for Windows from https://git-scm.com/downloads/win and retry.'
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw 'GitHub CLI is not installed. Install it from https://cli.github.com/ and retry.'
}
if (-not (Test-Path -LiteralPath '.git')) {
    throw 'Git history is missing. Re-extract the entire Git-ready ZIP including the hidden .git folder.'
}

# GitHub CLI is the ONLY place this script sends authentication requests.
# Never put tokens in this file or into the repository.
& gh auth status 1>$null 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host 'GitHub sign-in is required. Follow the browser/terminal authorization flow.'
    & gh auth login --git-protocol https --web
    if ($LASTEXITCODE -ne 0) { throw 'GitHub sign-in was not completed.' }
}

$gitBranch = (& git branch --show-current).Trim()
if ($gitBranch -ne 'main') { throw "Expected local branch 'main', got '$gitBranch'." }
$pending = (& git status --porcelain)
if ($pending) {
    throw 'The working tree has uncommitted changes. Review and commit them before publishing.'
}

$existingRemote = (& git remote)
if (@($existingRemote).Count -gt 0) {
    throw 'A Git remote already exists. Review `git remote -v` manually; this script will not overwrite it.'
}

$owner = (& gh api user --jq .login).Trim()
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($owner)) {
    throw 'Could not retrieve the authenticated GitHub username.'
}
$fullName = "$owner/$RepositoryName"
& gh repo view $fullName --json name --jq .name 1>$null 2>$null
if ($LASTEXITCODE -eq 0) {
    throw "GitHub repository '$fullName' already exists. Refusing to overwrite or reuse it automatically."
}

Write-Host "Creating a NEW PRIVATE GitHub repository: $fullName"
& gh repo create $RepositoryName --private --source . --remote origin --push
if ($LASTEXITCODE -ne 0) { throw 'Repository creation/push failed; inspect the GitHub CLI output.' }

Write-Host "Published: https://github.com/$fullName"
Write-Host 'NEXT: Invite Aibek, Daniil, supervisor Gulnur Shuteyeva and the committee as needed.'
Write-Host 'NEXT: Set up an actual YouTrack project using plans/YouTrack_Backlog.csv.'
Write-Host 'NEXT: Record verified URLs in SUBMISSION_STATUS.md with real contributions/feedback.'
Write-Host 'Do NOT create the pre-defense-1 tag until review and evidence requirements are met.'
