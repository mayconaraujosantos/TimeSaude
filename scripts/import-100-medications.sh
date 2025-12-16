#!/bin/bash

echo "🚀 Importando 100 medicamentos no Node-RED"
echo ""

# Reimportar flow atualizado
echo "📤 Reimportando flow com suporte a 100 medicamentos..."
curl -s -X POST http://localhost:1880/admin/flows \
  -H "Content-Type: application/json" \
  -H "Node-RED-Deployment-Type: full" \
  -d @/home/maycon/Documents/timesaude/nodered/flows-updated.json \
  > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Flow atualizado importado!"
else
    echo "❌ Erro ao importar flow"
    exit 1
fi

sleep 3

# Testar API
echo ""
echo "🧪 Testando API..."
COUNT=$(curl -s http://localhost:1880/api/medications | python3 -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null)

if [ "$COUNT" = "100" ]; then
    echo "✅ API funcionando com $COUNT medicamentos!"
else
    echo "⚠️  API retornou $COUNT medicamentos (esperado: 100)"
fi

echo ""
echo "📊 Primeiros 5 medicamentos:"
curl -s http://localhost:1880/api/medications | python3 -c "
import sys, json
meds = json.load(sys.stdin)[:5]
for i, m in enumerate(meds, 1):
    print(f'{i}. {m[\"name\"]} - {m[\"dosage\"]} - {m[\"frequency\"]}')" 2>/dev/null

echo ""
echo "✅ Pronto! Reinicie o app para ver os 100 medicamentos"
echo "   Pressione 'r' no Metro ou execute: pnpm run android"
