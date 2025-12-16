#!/bin/bash

echo "🔧 Testando conectividade Docker Node-RED"
echo ""

WSL_IP=$(ip addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -1)

echo "📍 IP do WSL2: $WSL_IP"
echo ""

echo "✅ Teste 1: localhost"
curl -s http://localhost:1880/api/medications > /dev/null && echo "   ✅ localhost:1880 acessível" || echo "   ❌ localhost:1880 FALHOU"

echo ""
echo "✅ Teste 2: IP do WSL2"
curl -s http://$WSL_IP:1880/api/medications > /dev/null && echo "   ✅ $WSL_IP:1880 acessível" || echo "   ❌ $WSL_IP:1880 FALHOU"

echo ""
echo "✅ Teste 3: Contagem de medicamentos"
COUNT=$(curl -s http://$WSL_IP:1880/api/medications | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null)
echo "   📊 $COUNT medicamentos encontrados"

echo ""
echo "🔥 Configurando firewall WSL2..."
sudo iptables -I INPUT -p tcp --dport 1880 -j ACCEPT 2>/dev/null || echo "   ⚠️  Não foi possível configurar iptables (normal no WSL2)"

echo ""
echo "📱 URL para o .env:"
echo "   EXPO_PUBLIC_API_URL=http://$WSL_IP:1880/api"
echo ""
echo "✅ Agora reinicie o app Android!"
