#!/bin/bash

# Script para importar o flow automaticamente no Node-RED

echo "🏥 Importando flow automaticamente no Node-RED..."
echo ""

# Ler o flow do arquivo
FLOW_FILE="/home/maycon/Documents/timesaude/doc/node-red-flow.json"

if [ ! -f "$FLOW_FILE" ]; then
    echo "❌ Arquivo de flow não encontrado: $FLOW_FILE"
    exit 1
fi

echo "📄 Lendo flow de: $FLOW_FILE"

# Importar o flow via API do Node-RED
echo "📤 Enviando flow para o Node-RED..."

# Get current flows
CURRENT_FLOWS=$(curl -s http://localhost:1880/flows)

# Read new flow
NEW_FLOW=$(cat "$FLOW_FILE")

# Deploy the flow
curl -s -X POST http://localhost:1880/flows \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d "$NEW_FLOW" > /dev/null

if [ $? -eq 0 ]; then
    echo "✅ Flow importado com sucesso!"
    echo ""
    echo "🧪 Testando API..."
    sleep 2
    
    RESPONSE=$(curl -s http://localhost:1880/api/medications)
    
    if echo "$RESPONSE" | grep -q "<!DOCTYPE html>"; then
        echo "⚠️  API ainda não está respondendo corretamente"
        echo "   Você pode precisar fazer Deploy manual no Node-RED"
    else
        echo "✅ API está funcionando!"
        echo ""
        echo "📊 Resposta:"
        echo "$RESPONSE" | jq -C '.' 2>/dev/null || echo "$RESPONSE"
    fi
else
    echo "❌ Falha ao importar flow"
    exit 1
fi

echo ""
echo "✅ Pronto! Agora execute:"
echo "   pnpm run android"
