# ✅ 100 Medicamentos Carregados com Sucesso

## Status Atual

A API está rodando com **100 medicamentos** de teste no Node-RED.

```
Total: 100 medicamentos
├── Com data final: 27 medicamentos (tratamentos temporários)
└── Sem data final: 73 medicamentos (uso contínuo)
```

## Exemplos de Medicamentos

**Primeiros 3:**

1. Hidroclorotiazida - 50mg - 24/24h
2. Levotiroxina - 100mcg - 24/24h
3. Vitamina B12 - 1000mcg - 24/24h

**Últimos 3:** 98. Ibuprofeno - 600mg - 12/12h 99. Rosuvastatina - 20mg -
24/24h 100. Ibuprofeno - 600mg - 12/12h

## Variedade de Medicamentos

O dataset inclui:

- ✅ Analgesicos (Paracetamol, Ibuprofeno, Dipirona)
- ✅ Antibióticos (Amoxicilina, Azitromicina, Ciprofloxacino)
- ✅ Anti-hipertensivos (Losartana, Enalapril, Anlodipino)
- ✅ Diabetes (Metformina, Glibenclamida, Insulina)
- ✅ Vitaminas (B12, D3, C, Complexo B)
- ✅ Antidepressivos (Fluoxetina, Sertralina, Escitalopram)
- ✅ E muito mais...

## Próximos Passos

### 1. Recarregar App

No terminal do Metro, pressione **`r`** para recarregar o app React Native.

Ou execute:

```bash
pnpm run android
```

### 2. Verificar no App

Você deve ver a mensagem nos logs:

```
LOG [ApiRepository] Fetched 100 medications
```

### 3. Testar Funcionalidades

Com 100 medicamentos, agora você pode testar:

- ✅ Scroll na lista (performance)
- ✅ Busca/filtro com mais dados
- ✅ Edição de vários registros
- ✅ Exclusão em massa
- ✅ Performance geral do app

## Comandos Úteis

### Ver Status da API

```bash
curl http://localhost:1880/api/medications | python3 -c "import sys, json; print(f'Total: {len(json.load(sys.stdin))}')"
```

### Regenerar 100 Medicamentos

```bash
cd /home/maycon/Documents/timesaude
node scripts/generate-medications.js 2>/dev/null > nodered/medications-100.json
docker-compose restart nodered
```

### Logs do Node-RED

```bash
docker logs timesaude-nodered 2>&1 | tail -20
```

### Parar Node-RED

```bash
cd /home/maycon/Documents/timesaude
docker-compose down
```

### Iniciar Node-RED

```bash
cd /home/maycon/Documents/timesaude
docker-compose up -d
```

## Estrutura dos Dados

Cada medicamento possui:

```json
{
  "id": "1",
  "name": "Hidroclorotiazida",
  "dosage": "50mg",
  "frequency": "24/24h",
  "startDate": "2024-03-15T10:30:00.000Z",
  "endDate": null, // ou data ISO se tratamento temporário
  "notes": "Tomar em jejum"
}
```

## Observações

- ✅ Dados são resetados a cada reinício do Docker
- ✅ Alterações via API (POST/PUT/DELETE) funcionam normalmente
- ✅ Para persistência real, migrar para Javalin + PostgreSQL no futuro
- ✅ adb reverse tcp:1880 tcp:1880 deve estar ativo

## Troubleshooting

### App não carrega medicamentos

```bash
# Verificar se adb reverse está ativo
adb reverse tcp:1880 tcp:1880

# Verificar app.config.ts
# useApi: true
# useMockData: false
```

### Node-RED não responde

```bash
cd /home/maycon/Documents/timesaude
docker-compose restart nodered
sleep 10
curl http://localhost:1880/api/medications
```

---

**🎉 Tudo pronto! Agora você tem 100 medicamentos para testar o app de forma
realista!**
