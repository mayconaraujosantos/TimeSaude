#!/bin/bash

# Script para popular dados iniciais no Node-RED

echo "🏥 Populando dados no Node-RED..."
echo ""

# Medicamento 1
echo "➕ Adicionando Paracetamol..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1",
    "name": "Paracetamol",
    "dosage": "500mg",
    "frequency": "8/8h",
    "startDate": "2024-12-01T00:00:00.000Z",
    "notes": "Tomar com água"
  }' > /dev/null && echo "✅ Paracetamol adicionado"

# Medicamento 2
echo "➕ Adicionando Ibuprofeno..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "2",
    "name": "Ibuprofeno",
    "dosage": "400mg",
    "frequency": "12/12h",
    "startDate": "2024-12-05T00:00:00.000Z",
    "endDate": "2024-12-15T00:00:00.000Z",
    "notes": "Após as refeições"
  }' > /dev/null && echo "✅ Ibuprofeno adicionado"

# Medicamento 3
echo "➕ Adicionando Amoxicilina..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "3",
    "name": "Amoxicilina",
    "dosage": "250mg",
    "frequency": "8/8h",
    "startDate": "2024-11-20T00:00:00.000Z",
    "endDate": "2024-11-30T00:00:00.000Z",
    "notes": "Completar o ciclo"
  }' > /dev/null && echo "✅ Amoxicilina adicionado"

# Medicamento 4
echo "➕ Adicionando Losartana..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "4",
    "name": "Losartana",
    "dosage": "50mg",
    "frequency": "24/24h",
    "startDate": "2024-01-01T00:00:00.000Z",
    "notes": "Controle de pressão arterial"
  }' > /dev/null && echo "✅ Losartana adicionado"

# Medicamento 5
echo "➕ Adicionando Metformina..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "5",
    "name": "Metformina",
    "dosage": "850mg",
    "frequency": "12/12h",
    "startDate": "2024-01-01T00:00:00.000Z",
    "notes": "Tomar durante as refeições"
  }' > /dev/null && echo "✅ Metformina adicionado"

# Medicamento 6
echo "➕ Adicionando Omeprazol..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "6",
    "name": "Omeprazol",
    "dosage": "20mg",
    "frequency": "24/24h",
    "startDate": "2024-06-01T00:00:00.000Z",
    "notes": "Em jejum, 30min antes do café"
  }' > /dev/null && echo "✅ Omeprazol adicionado"

# Medicamento 7
echo "➕ Adicionando Sinvastatina..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "7",
    "name": "Sinvastatina",
    "dosage": "40mg",
    "frequency": "24/24h",
    "startDate": "2024-03-01T00:00:00.000Z",
    "notes": "Tomar à noite"
  }' > /dev/null && echo "✅ Sinvastatina adicionado"

# Medicamento 8
echo "➕ Adicionando Dipirona..."
curl -s -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "id": "8",
    "name": "Dipirona",
    "dosage": "500mg",
    "frequency": "SOS",
    "startDate": "2024-12-01T00:00:00.000Z",
    "notes": "Apenas em caso de dor ou febre"
  }' > /dev/null && echo "✅ Dipirona adicionado"

echo ""
echo "🎉 Dados populados com sucesso!"
echo ""
echo "📊 Verificando..."
curl -s http://localhost:1880/api/medications | jq -r 'length' 2>/dev/null | xargs -I {} echo "Total de medicamentos: {}"

echo ""
echo "✅ Pronto! Agora reinicie o app:"
echo "   pnpm run android"
