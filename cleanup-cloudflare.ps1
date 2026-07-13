#Requires -Version 5.1
<#
.SYNOPSIS
    清理 KANAE 倉庫中的 Cloudflare 殘留記錄。
.DESCRIPTION
    此腳本會：
    1. 標記舊的 Cloudflare 部署為 inactive
    2. 刪除舊的 Cloudflare 部署記錄
    3. 刪除 feature/code-review-fixes 分支
    需要 gh CLI 和管理員權限。
.NOTES
    請先執行：gh auth login
#>

$ErrorActionPreference = "Stop"
$Owner = "hallemter-alt"
$Repo = "KANAE"
$RepoPath = "$Owner/$Repo"

$CloudflareDeploymentIds = @(
    3776711095, 3776719521, 3776720267, 3776729459, 3776735371,
    3790760423, 3790761683, 3793444240, 3793444292, 3793488950,
    3793490759, 3793490833, 3793491891
)

function Test-GhCli {
    $gh = Get-Command gh -ErrorAction SilentlyContinue
    if (-not $gh) {
        Write-Host "❌ 找不到 gh 指令。請先從 https://cli.github.com/ 安裝 GitHub CLI。" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ 找到 gh CLI：$($gh.Source)" -ForegroundColor Green
}

function Test-GhAuth {
    $status = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 尚未登入 GitHub CLI。請先執行：gh auth login" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ 已登入 GitHub CLI" -ForegroundColor Green
}

function Mark-DeploymentInactive {
    param([long]$Id)
    Write-Host "標記部署 $Id 為 inactive..." -NoNewline
    $result = gh api --method POST "repos/$RepoPath/deployments/$Id/statuses" `
        -f state=inactive `
        -f description="Stale Cloudflare deployment, project now uses Vercel" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✅" -ForegroundColor Green
    } else {
        Write-Host " ❌`n$result" -ForegroundColor Red
    }
}

function Remove-Deployment {
    param([long]$Id)
    Write-Host "刪除部署 $Id..." -NoNewline
    $result = gh api --method DELETE "repos/$RepoPath/deployments/$Id" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✅" -ForegroundColor Green
    } else {
        Write-Host " ❌`n$result" -ForegroundColor Red
    }
}

function Remove-StaleBranch {
    Write-Host "刪除分支 feature/code-review-fixes..." -NoNewline
    $result = gh api --method DELETE "repos/$RepoPath/git/refs/heads/feature/code-review-fixes" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host " ✅" -ForegroundColor Green
    } else {
        Write-Host " ❌`n$result" -ForegroundColor Red
    }
}

# Main
Write-Host "========================================"
Write-Host " KANAE Cloudflare 清理腳本"
Write-Host "========================================"
Write-Host ""

Test-GhCli
Test-GhAuth

Write-Host ""
Write-Host "步驟 1/3：標記 Cloudflare 部署為 inactive..." -ForegroundColor Cyan
foreach ($id in $CloudflareDeploymentIds) {
    Mark-DeploymentInactive -Id $id
}

Write-Host ""
Write-Host "步驟 2/3：刪除 Cloudflare 部署記錄..." -ForegroundColor Cyan
foreach ($id in $CloudflareDeploymentIds) {
    Remove-Deployment -Id $id
}

Write-Host ""
Write-Host "步驟 3/3：刪除舊分支..." -ForegroundColor Cyan
Remove-StaleBranch

Write-Host ""
Write-Host "========================================"
Write-Host " 清理完成"
Write-Host "========================================"
Write-Host ""
Write-Host "請在瀏覽器完成最後一步："
Write-Host "https://github.com/$RepoPath/settings/installations"
Write-Host "找到 'Cloudflare Workers and Pages' 並點擊 Uninstall。"
Write-Host ""
Write-Host "驗證指令："
Write-Host "gh api repos/$RepoPath/deployments --paginate --jq '.[] | {id, environment, created_at}'"
