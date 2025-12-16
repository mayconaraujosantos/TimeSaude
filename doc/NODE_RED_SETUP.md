# Configuração Node-RED para TimeSaúde

Este guia explica como configurar o Node-RED como API temporária para o app
TimeSaúde enquanto a API Javalin está sendo desenvolvida.

## 1. Instalação do Node-RED

```bash
# Instalar Node-RED globalmente
npm install -g node-red

# Ou usar Docker
docker run -it -p 1880:1880 --name nodered nodered/node-red
```

## 2. Iniciar Node-RED

```bash
node-red

# Acesse: http://localhost:1880
```

## 3. Configurar CORS

No Node-RED, instale o pacote `node-red-contrib-cors`:

1. Menu → Manage palette → Install
2. Buscar: `node-red-contrib-cors`
3. Instalar

Ou configure manualmente em `settings.js`:

```javascript
httpNodeCors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE"
}
```

## 4. Flow de Medications

Importe o flow abaixo no Node-RED (Menu → Import → Clipboard):

```json
[
  {
    "id": "medication-flow",
    "type": "tab",
    "label": "TimeSaúde - Medications API",
    "disabled": false,
    "info": "API REST para gerenciamento de medicamentos"
  },
  {
    "id": "get-all-medications",
    "type": "http in",
    "z": "medication-flow",
    "name": "GET /api/medications",
    "url": "/api/medications",
    "method": "get",
    "upload": false,
    "swaggerDoc": "",
    "x": 150,
    "y": 100,
    "wires": [["return-all-medications"]]
  },
  {
    "id": "return-all-medications",
    "type": "function",
    "z": "medication-flow",
    "name": "Return All Medications",
    "func": "// Inicializa array de medications se não existir\ncontext.global.medications = context.global.medications || [\n    {\n        id: '1',\n        name: 'Paracetamol',\n        dosage: '500mg',\n        frequency: '8/8h',\n        startDate: '2024-12-01T00:00:00.000Z',\n        notes: 'Tomar com água'\n    },\n    {\n        id: '2',\n        name: 'Ibuprofeno',\n        dosage: '400mg',\n        frequency: '12/12h',\n        startDate: '2024-12-05T00:00:00.000Z',\n        endDate: '2024-12-15T00:00:00.000Z',\n        notes: 'Após as refeições'\n    },\n    {\n        id: '3',\n        name: 'Amoxicilina',\n        dosage: '250mg',\n        frequency: '8/8h',\n        startDate: '2024-11-20T00:00:00.000Z',\n        endDate: '2024-11-30T00:00:00.000Z',\n        notes: 'Completar o ciclo'\n    }\n];\n\nmsg.payload = context.global.medications;\nmsg.statusCode = 200;\nreturn msg;",
    "outputs": 1,
    "x": 400,
    "y": 100,
    "wires": [["http-response"]]
  },
  {
    "id": "get-medication-by-id",
    "type": "http in",
    "z": "medication-flow",
    "name": "GET /api/medications/:id",
    "url": "/api/medications/:id",
    "method": "get",
    "upload": false,
    "swaggerDoc": "",
    "x": 170,
    "y": 160,
    "wires": [["find-medication"]]
  },
  {
    "id": "find-medication",
    "type": "function",
    "z": "medication-flow",
    "name": "Find Medication",
    "func": "const medications = context.global.medications || [];\nconst id = msg.req.params.id;\nconst medication = medications.find(m => m.id === id);\n\nif (medication) {\n    msg.payload = medication;\n    msg.statusCode = 200;\n} else {\n    msg.payload = { error: 'Medication not found' };\n    msg.statusCode = 404;\n}\n\nreturn msg;",
    "outputs": 1,
    "x": 400,
    "y": 160,
    "wires": [["http-response"]]
  },
  {
    "id": "create-medication",
    "type": "http in",
    "z": "medication-flow",
    "name": "POST /api/medications",
    "url": "/api/medications",
    "method": "post",
    "upload": false,
    "swaggerDoc": "",
    "x": 160,
    "y": 220,
    "wires": [["save-medication"]]
  },
  {
    "id": "save-medication",
    "type": "function",
    "z": "medication-flow",
    "name": "Save Medication",
    "func": "const medications = context.global.medications || [];\nconst newMedication = msg.payload;\n\n// Gera ID único se não fornecido\nif (!newMedication.id) {\n    newMedication.id = String(Date.now());\n}\n\nmedications.push(newMedication);\ncontext.global.medications = medications;\n\nmsg.payload = newMedication;\nmsg.statusCode = 201;\nreturn msg;",
    "outputs": 1,
    "x": 400,
    "y": 220,
    "wires": [["http-response"]]
  },
  {
    "id": "update-medication",
    "type": "http in",
    "z": "medication-flow",
    "name": "PUT /api/medications/:id",
    "url": "/api/medications/:id",
    "method": "put",
    "upload": false,
    "swaggerDoc": "",
    "x": 170,
    "y": 280,
    "wires": [["modify-medication"]]
  },
  {
    "id": "modify-medication",
    "type": "function",
    "z": "medication-flow",
    "name": "Update Medication",
    "func": "const medications = context.global.medications || [];\nconst id = msg.req.params.id;\nconst updates = msg.payload;\nconst index = medications.findIndex(m => m.id === id);\n\nif (index !== -1) {\n    // Atualiza o medication mantendo o ID\n    medications[index] = { ...medications[index], ...updates, id };\n    context.global.medications = medications;\n    \n    msg.payload = medications[index];\n    msg.statusCode = 200;\n} else {\n    msg.payload = { error: 'Medication not found' };\n    msg.statusCode = 404;\n}\n\nreturn msg;",
    "outputs": 1,
    "x": 410,
    "y": 280,
    "wires": [["http-response"]]
  },
  {
    "id": "delete-medication",
    "type": "http in",
    "z": "medication-flow",
    "name": "DELETE /api/medications/:id",
    "url": "/api/medications/:id",
    "method": "delete",
    "upload": false,
    "swaggerDoc": "",
    "x": 180,
    "y": 340,
    "wires": [["remove-medication"]]
  },
  {
    "id": "remove-medication",
    "type": "function",
    "z": "medication-flow",
    "name": "Delete Medication",
    "func": "const medications = context.global.medications || [];\nconst id = msg.req.params.id;\nconst index = medications.findIndex(m => m.id === id);\n\nif (index !== -1) {\n    medications.splice(index, 1);\n    context.global.medications = medications;\n    \n    msg.payload = { message: 'Medication deleted' };\n    msg.statusCode = 200;\n} else {\n    msg.payload = { error: 'Medication not found' };\n    msg.statusCode = 404;\n}\n\nreturn msg;",
    "outputs": 1,
    "x": 410,
    "y": 340,
    "wires": [["http-response"]]
  },
  {
    "id": "http-response",
    "type": "http response",
    "z": "medication-flow",
    "name": "HTTP Response",
    "statusCode": "",
    "headers": {
      "content-type": "application/json"
    },
    "x": 650,
    "y": 220,
    "wires": []
  }
]
```

## 5. Estrutura de Dados

Os medicamentos seguem este formato:

```typescript
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format (opcional)
  notes?: string;
}
```

## 6. Endpoints Disponíveis

| Método | Endpoint               | Descrição                   |
| ------ | ---------------------- | --------------------------- |
| GET    | `/api/medications`     | Lista todos os medicamentos |
| GET    | `/api/medications/:id` | Busca um medicamento por ID |
| POST   | `/api/medications`     | Cria um novo medicamento    |
| PUT    | `/api/medications/:id` | Atualiza um medicamento     |
| DELETE | `/api/medications/:id` | Remove um medicamento       |

## 7. Testar a API

```bash
# Listar todos
curl http://localhost:1880/api/medications

# Buscar por ID
curl http://localhost:1880/api/medications/1

# Criar novo
curl -X POST http://localhost:1880/api/medications \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dipirona",
    "dosage": "500mg",
    "frequency": "6/6h",
    "startDate": "2024-12-07T00:00:00.000Z",
    "notes": "Em caso de dor"
  }'

# Atualizar
curl -X PUT http://localhost:1880/api/medications/1 \
  -H "Content-Type: application/json" \
  -d '{
    "dosage": "750mg"
  }'

# Deletar
curl -X DELETE http://localhost:1880/api/medications/1
```

## 8. Configurar o App React Native

### Para desenvolvimento local (Android/iOS Emulator)

```typescript
// src/config/app.config.ts
api: {
    baseUrl: 'http://localhost:1880/api',
}
```

### Para desenvolvimento no dispositivo físico

Descubra o IP da sua máquina:

```bash
# Linux/Mac
ifconfig | grep "inet "
# ou
ip addr show

# Windows
ipconfig
```

Configure:

```typescript
api: {
    baseUrl: 'http://192.168.X.X:1880/api', // Substitua pelo seu IP
}
```

### Para Android Emulator

```typescript
api: {
    baseUrl: 'http://10.0.2.2:1880/api', // IP especial do emulador Android
}
```

## 9. Persistência de Dados

⚠️ **Importante**: Os dados no Node-RED são armazenados em memória
(`context.global`).

Para persistência real, você pode:

1. **Usar Context Storage** (arquivo):
   - Editar `settings.js`:

   ```javascript
   contextStorage: {
       default: {
           module: "localfilesystem"
       }
   }
   ```

2. **Adicionar banco de dados**:
   - Instalar `node-red-node-sqlite` ou `node-red-node-mongodb`
   - Conectar aos flows

3. **Usar arquivo JSON**:
   - Adicionar nodes de leitura/escrita de arquivo
   - Salvar em `medications.json`

## 10. Logs e Debug

- Use `Debug` nodes no Node-RED para monitorar requisições
- No app React Native, os logs aparecem com `[ApiRepository]`
- Console do Metro Bundler mostrará todas as chamadas HTTP

## 11. Próximos Passos

Quando a API Javalin estiver pronta:

1. Atualizar apenas o `baseUrl` em `app.config.ts`
2. Garantir que os endpoints seguem o mesmo contrato
3. Testar a migração gradualmente

## 12. Troubleshooting

### Erro de conexão

```
Error: Network request failed
```

**Soluções**:

- Verificar se Node-RED está rodando
- Confirmar URL correta (IP/porta)
- Verificar firewall
- Android físico: usar IP da rede, não localhost

### CORS Error

```
Access to fetch has been blocked by CORS policy
```

**Solução**: Configurar CORS no Node-RED (ver seção 3)

### Dados não persistem

**Causa**: Reiniciar Node-RED limpa `context.global`

**Solução**: Implementar persistência (ver seção 9)
