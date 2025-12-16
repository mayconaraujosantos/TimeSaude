#!/bin/bash

# Script para diagnosticar problemas de conectividade com Node-RED
# Útil para resolver "Network request failed"

echo "=== Diagnóstico de Conectividade TimeSaude ==="
echo ""

# 1. Verificar se Docker está rodando
echo "1. Verificando Docker..."
if ! docker ps &> /dev/null; then
    echo "   ✗ Docker não está rodando ou não acessível"
    exit 1
fi
echo "   ✓ Docker OK"

# 2. Verificar se Node-RED está rodando
echo ""
echo "2. Verificando container Node-RED..."
if docker ps | grep -q "timesaude-nodered"; then
    echo "   ✓ Node-RED está rodando"
else
    echo "   ✗ Node-RED não está rodando"
    echo "   Execute: docker-compose up -d"
    exit 1
fi

# 3. Verificar porta 1880
echo ""
echo "3. Verificando porta 1880..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:1880/api/medications | grep -q "200"; then
    echo "   ✓ API acessível em localhost:1880"
else
    echo "   ✗ API não responde em localhost:1880"
fi

# 4. Obter IPs disponíveis
echo ""
echo "4. IPs disponíveis:"
echo "   - localhost (iOS Simulator, Web)"
echo "   - 10.0.2.2 (Android Emulator padrão)"

IP=$(ip addr show | grep "inet " | grep -v "127.0.0.1" | head -1 | awk '{print $2}' | cut -d'/' -f1)
if [ ! -z "$IP" ]; then
    echo "   - $IP (dispositivo físico na mesma rede)"
fi

# 5. Testar conectividade
echo ""
echo "5. Testando endpoints..."

test_url() {
    local url=$1
    local name=$2
    
    if curl -s -m 2 -o /dev/null -w "%{http_code}" "$url/api/medications" | grep -q "200"; then
        echo "   ✓ $name: $url"
        return 0
    else
        echo "   ✗ $name: $url"
        return 1
    fi
}

test_url "http://localhost:1880" "localhost"
test_url "http://10.0.2.2:1880" "Android Emulator"

if [ ! -z "$IP" ]; then
    test_url "http://$IP:1880" "IP Local"
fi

# 6. Instruções
echo ""
echo "=== Instruções ==="
echo ""
echo "Se você está usando:"
echo "  • Android Emulator: Use http://10.0.2.2:1880/api"
echo "  • iOS Simulator: Use http://localhost:1880/api"
if [ ! -z "$IP" ]; then
    echo "  • Dispositivo físico: Use http://$IP:1880/api"
fi
echo ""
echo "Configure via variável de ambiente:"
echo "  export EXPO_PUBLIC_API_URL=http://10.0.2.2:1880/api"
echo ""
echo "Ou edite src/config/app.config.ts"
