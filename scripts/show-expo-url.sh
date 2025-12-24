#!/bin/bash

# Script para mostrar a URL do Expo e gerar QR code alternativo
# Útil quando o QR code não aparece no terminal WSL2

echo "🔍 Procurando informações do Expo..."
echo ""

# Tenta encontrar o processo do Expo
EXPO_PID=$(pgrep -f "expo start" | head -n 1)

if [ -z "$EXPO_PID" ]; then
    echo "❌ Expo não está rodando!"
    echo "Execute: npx expo start --clear --tunnel"
    exit 1
fi

echo "✅ Expo está rodando (PID: $EXPO_PID)"
echo ""

# Procura pela URL do tunnel nos logs recentes
echo "📱 Instruções para conectar no iPhone:"
echo ""
echo "OPÇÃO 1 - Escanear QR Code:"
echo "  1. Abra o Expo Go no iPhone"
echo "  2. Toque em 'Scan QR Code'"
echo "  3. Aponte para o QR code no terminal WSL2"
echo ""
echo "OPÇÃO 2 - Digitar URL manualmente:"
echo "  1. Abra o Expo Go no iPhone"
echo "  2. Toque em 'Enter URL manually'"
echo "  3. Digite a URL que aparece no terminal após 'Metro waiting on...'"
echo "     (deve começar com exp://...)"
echo ""
echo "OPÇÃO 3 - Usar DevTools:"
echo "  1. Abra no navegador: http://localhost:8081"
echo "  2. Clique no botão 'Open on iOS device'"
echo "  3. Escaneie o QR code que aparece"
echo ""

# Tenta acessar as informações do DevTools
if command -v curl &> /dev/null; then
    echo "🌐 Tentando obter URL do tunnel..."
    
    # Verifica se o DevTools está acessível
    if curl -s http://localhost:8081 > /dev/null 2>&1; then
        echo "✅ DevTools acessível em: http://localhost:8081"
        echo ""
        echo "💡 Dica: Abra http://localhost:8081 no navegador do Windows"
        echo "   para ver o QR code e a URL do tunnel!"
    else
        echo "⚠️  DevTools não acessível em localhost:8081"
    fi
fi

echo ""
echo "📋 Verificando portas em uso:"
netstat -tuln 2>/dev/null | grep -E ":(8081|19000|19001|19002)" || \
    ss -tuln 2>/dev/null | grep -E ":(8081|19000|19001|19002)" || \
    echo "   (comando netstat/ss não disponível)"

echo ""
echo "🔧 Se ainda não funcionar:"
echo "   1. Pare o Expo (Ctrl+C)"
echo "   2. Execute: npx expo start --clear --tunnel --host tunnel"
echo "   3. Aguarde aparecer 'Tunnel ready'"
echo "   4. Procure por uma linha com 'exp://' no terminal"
echo "   5. Digite essa URL manualmente no Expo Go"
