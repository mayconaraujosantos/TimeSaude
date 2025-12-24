#!/bin/bash

echo "=========================================="
echo "Diagnóstico Expo Tunnel no WSL2 + iPhone"
echo "=========================================="
echo ""

# Verifica se o Expo CLI está instalado
echo "✓ Verificando Expo CLI..."
if command -v expo &>/dev/null; then
	echo "  Expo CLI encontrado: $(expo --version)"
else
	echo "  ⚠ Expo CLI não encontrado globalmente"
fi
echo ""

# Verifica o ngrok (usado pelo túnel)
echo "✓ Verificando ngrok..."
if command -v ngrok &>/dev/null; then
	echo "  ngrok encontrado: $(ngrok version)"
else
	echo "  ⚠ ngrok não encontrado (será baixado automaticamente pelo Expo)"
fi
echo ""

# Verifica conexão com a internet
echo "✓ Verificando conexão com internet..."
if ping -c 1 8.8.8.8 &>/dev/null; then
	echo "  ✓ Conexão com internet OK"
else
	echo "  ✗ Sem conexão com internet"
fi
echo ""

# Verifica se há processos Expo rodando
echo "✓ Verificando processos Expo ativos..."
EXPO_PROCESSES=$(ps aux | grep -i "expo\|metro\|react-native" | grep -v grep | wc -l)
if [ $EXPO_PROCESSES -gt 0 ]; then
	echo "  ✓ $EXPO_PROCESSES processo(s) Expo encontrado(s)"
	ps aux | grep -i "expo\|metro" | grep -v grep | awk '{print "    PID: " $2 " - " $11}'
else
	echo "  ⚠ Nenhum processo Expo ativo"
fi
echo ""

# Verifica portas em uso
echo "✓ Verificando portas Expo (8081, 19000, 19001, 19002)..."
for port in 8081 19000 19001 19002; do
	if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
		echo "  ✓ Porta $port está em uso"
	else
		echo "  ⚠ Porta $port está livre"
	fi
done
echo ""

# Verifica arquivo .env
echo "✓ Verificando configuração .env..."
if [ -f ".env" ]; then
	echo "  ✓ Arquivo .env encontrado"
	if grep -q "EXPO_USE_METRO_WORKSPACE_ROOT" .env; then
		echo "    - EXPO_USE_METRO_WORKSPACE_ROOT configurado"
	fi
	if grep -q "REACT_NATIVE_PACKAGER_HOSTNAME" .env; then
		echo "    - REACT_NATIVE_PACKAGER_HOSTNAME: $(grep REACT_NATIVE_PACKAGER_HOSTNAME .env | cut -d '=' -f2)"
	fi
else
	echo "  ⚠ Arquivo .env não encontrado"
fi
echo ""

# Verifica configuração do Expo
echo "✓ Verificando app.json..."
if [ -f "app.json" ]; then
	echo "  ✓ app.json encontrado"
	echo "  Nome: $(jq -r '.expo.name' app.json)"
	echo "  Slug: $(jq -r '.expo.slug' app.json)"
else
	echo "  ✗ app.json não encontrado"
fi
echo ""

# Instruções
echo "=========================================="
echo "SOLUÇÕES PARA PROBLEMAS COMUNS:"
echo "=========================================="
echo ""
echo "1. Se o QR code não aparece:"
echo "   - Pressione 'q' no terminal do Expo para mostrar o QR novamente"
echo "   - Ou acesse: http://localhost:19002 no navegador WSL"
echo ""
echo "2. Se o iPhone não consegue escanear:"
echo "   - Abra o app Expo Go no iPhone"
echo "   - Vá em 'Scan QR Code' ou pressione o ícone de QR"
echo "   - Aponte a câmera para o QR code no terminal"
echo ""
echo "3. Se aparecer 'Something went wrong':"
echo "   - Mate todos os processos: pkill -f expo"
echo "   - Limpe o cache: pnpm expo start --clear --tunnel"
echo ""
echo "4. Alternativa - Usar IP direto (sem túnel):"
echo "   - No WSL, obtenha o IP Windows: ip route | grep default | awk '{print \$3}'"
echo "   - Use: REACT_NATIVE_PACKAGER_HOSTNAME=<IP> pnpm expo start"
echo "   - Configure o firewall do Windows para permitir as portas"
echo ""
echo "5. Para usar túnel sem problemas:"
echo "   - Certifique-se de ter uma boa conexão"
echo "   - O túnel às vezes demora para conectar (aguarde 30-60s)"
echo "   - Se der timeout, tente novamente"
echo ""
echo "=========================================="
echo "COMANDOS ÚTEIS:"
echo "=========================================="
echo "Matar processos Expo:"
echo "  pkill -f expo && pkill -f metro && pkill -f react-native"
echo ""
echo "Iniciar com túnel:"
echo "  pnpm expo start --clear --tunnel"
echo ""
echo "Iniciar sem túnel (LAN):"
echo "  pnpm expo start --clear --lan"
echo ""
echo "Ver logs do dispositivo:"
echo "  pnpm expo start --clear --tunnel --log"
echo ""
