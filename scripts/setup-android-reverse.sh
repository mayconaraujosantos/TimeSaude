#!/bin/bash

# Script para configurar adb reverse
# Permite que o Android acesse localhost do host diretamente

echo "=== Configurando ADB Reverse para TimeSaude ==="
echo ""

# 1. Verificar se adb está disponível
if ! command -v adb &> /dev/null; then
    echo "✗ ADB não encontrado!"
    echo "  Instale o Android SDK Platform Tools"
    exit 1
fi
echo "✓ ADB encontrado"

# 2. Verificar dispositivos conectados
echo ""
echo "Dispositivos conectados:"
adb devices -l

DEVICE_COUNT=$(adb devices | grep -v "List of devices" | grep -c "device$")
if [ "$DEVICE_COUNT" -eq 0 ]; then
    echo ""
    echo "✗ Nenhum dispositivo/emulador conectado"
    echo "  Inicie o emulador ou conecte um dispositivo"
    exit 1
fi

echo ""
echo "✓ $DEVICE_COUNT dispositivo(s) encontrado(s)"

# 3. Configurar reverse para porta 1880 (Node-RED)
echo ""
echo "Configurando port forwarding..."
adb reverse tcp:1880 tcp:1880

if [ $? -eq 0 ]; then
    echo "✓ Port reverse configurado: localhost:1880 (device) -> localhost:1880 (host)"
else
    echo "✗ Falha ao configurar port reverse"
    exit 1
fi

# 4. Verificar configuração
echo ""
echo "Verificando configuração..."
adb reverse --list

# 5. Testar conectividade do host
echo ""
echo "Testando conectividade do host..."
if curl -s -m 2 -o /dev/null -w "%{http_code}" http://localhost:1880/api/medications | grep -q "200"; then
    echo "✓ API acessível em localhost:1880"
else
    echo "⚠ API não responde - verifique se Node-RED está rodando"
    echo "  Execute: docker-compose up -d"
fi

echo ""
echo "=== Configuração Completa ==="
echo ""
echo "Agora você pode usar http://localhost:1880/api no seu app!"
echo ""
echo "Notas:"
echo "  • Execute este script sempre que reiniciar o emulador"
echo "  • Funciona com emulador e dispositivos físicos via USB"
echo "  • Para remover: adb reverse --remove tcp:1880"
echo ""
