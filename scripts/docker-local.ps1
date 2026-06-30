param(
    [Parameter(Position = 0)]
    [ValidateSet("up", "down", "logs", "ps", "build")]
    [string]$Action = "up"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

Set-Location $Root

if (-not (Test-Path ".env.local")) {
    if (Test-Path ".env.local.example") {
        Copy-Item ".env.local.example" ".env.local"
        Write-Host "Created .env.local from .env.local.example"
    } else {
        Write-Error ".env.local not found. Copy .env.local.example to .env.local first."
    }
}

Copy-Item ".env.local" ".env" -Force
Write-Host "Synced .env from .env.local (gitignored)"

$null = docker network inspect dokploy-network 2>$null
if ($LASTEXITCODE -ne 0) {
    docker network create dokploy-network | Out-Null
}

$composeArgs = @(
    "-f", "docker-compose.yml",
    "-f", "docker-compose.local.yml",
    "--env-file", ".env.local"
)

switch ($Action) {
    "up"    { docker compose @composeArgs up -d --build }
    "down"  { docker compose @composeArgs down }
    "logs"  { docker compose @composeArgs logs -f --tail=100 }
    "ps"    { docker compose @composeArgs ps }
    "build" { docker compose @composeArgs build }
}
