# ================================================
# Port Forwarding WSL2 → Windows para Node-RED
# ================================================
# EXECUTE COMO ADMINISTRADOR no PowerShell do Windows
#
# Isso permite que o Android Emulator acesse o Node-RED
# rodando no WSL2 através do Windows host.
#
# Fluxo: Android (10.0.2.2:1880) → Windows → WSL2 (172.17.81.36:1880)
# ================================================

Write-Host "🔧 Configurando Port Forwarding WSL2 → Windows" -ForegroundColor Cyan
Write-Host ""

# IP do WSL2 (atualize se necessário com: wsl hostname -I)
$wslIP = "172.17.81.36"
$port = 1880

Write-Host "📍 WSL2 IP: $wslIP" -ForegroundColor Yellow
Write-Host "📍 Porta: $port" -ForegroundColor Yellow
Write-Host ""

# Remove regra antiga se existir
Write-Host "🧹 Removendo regras antigas..." -ForegroundColor Gray
netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 2>$null

# Adiciona nova regra de port forwarding
Write-Host "➕ Adicionando port forwarding..." -ForegroundColor Green
netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIP

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Port forwarding configurado!" -ForegroundColor Green
} else {
    Write-Host "   ❌ Erro ao configurar port forwarding" -ForegroundColor Red
    exit 1
}

# Configura regra no firewall
Write-Host "🔥 Configurando firewall..." -ForegroundColor Yellow

# Remove regra antiga se existir
Remove-NetFirewallRule -DisplayName "Node-RED WSL2" -ErrorAction SilentlyContinue

# Adiciona nova regra
New-NetFirewallRule -DisplayName "Node-RED WSL2" -Direction Inbound -LocalPort $port -Protocol TCP -Action Allow | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ Regra de firewall criada!" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Firewall pode não ter sido configurado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✅ CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Verificando configuração atual:" -ForegroundColor Yellow
netsh interface portproxy show all
Write-Host ""
Write-Host "🧪 Para testar no Windows:" -ForegroundColor Yellow
Write-Host "   curl http://localhost:1880/api/medications" -ForegroundColor White
Write-Host ""
Write-Host "📱 Agora reinicie o app React Native:" -ForegroundColor Yellow
Write-Host "   pnpm run android" -ForegroundColor White
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan

