# 🎯 Configuração Node-RED - Resumo

## ✅ O que foi feito

### 1. Configurações da Aplicação

- ✅ `src/config/app.config.ts` - Configurado para usar API (`useApi: true`)
- ✅ `src/features/medication/repository/ApiMedicationRepository.ts` - Melhorado
  com logs e tratamento de erros
- ✅ `.env` - Configurado com URL do Node-RED (`http://10.0.2.2:1880/api`)

### 2. Documentação Criada

- ✅ `doc/NODE_RED_SETUP.md` - Guia completo de configuração
- ✅ `doc/QUICK_START_NODERED.md` - Quick start simplificado
- ✅ `doc/node-red-flow.json` - Flow pronto para importar
- ✅ `README.md` - Atualizado com informações do Node-RED
- ✅ `.env.example` - Template de variáveis de ambiente

### 3. Scripts Helper

- ✅ `scripts/nodered-helper.sh` - Script para facilitar tarefas comuns

## 🚀 Próximos Passos

### 1️⃣ Instalar e configurar Node-RED

```bash
# Opção A: Manual
npm install -g node-red
node-red
# Acesse http://localhost:1880

# Opção B: Usando o helper
./scripts/nodered-helper.sh
# Escolha opção 1, depois opção 2
```

### 2️⃣ Importar o Flow no Node-RED

1. Abra <http://localhost:1880>
2. Clique no menu (≡) → Import
3. Cole o conteúdo de `doc/node-red-flow.json`
4. Clique em "Import"
5. Clique em "Deploy" (botão vermelho)

### 3️⃣ Testar a API

```bash
# Opção A: Manual
curl http://localhost:1880/api/medications

# Opção B: Usando o helper
./scripts/nodered-helper.sh
# Escolha opção 3
```

### 4️⃣ Configurar o App para seu dispositivo

**Android Emulator** (já configurado):

```bash
# .env já está com:
EXPO_PUBLIC_API_URL=http://10.0.2.2:1880/api
```

**Dispositivo Físico**:

```bash
# 1. Descubra seu IP
./scripts/nodered-helper.sh  # Opção 4
# ou
ip addr show | grep "inet "

# 2. Edite .env
EXPO_PUBLIC_API_URL=http://SEU_IP:1880/api
```

### 5️⃣ Reiniciar o App

```bash
# Opção A: Manual
# Mate o Metro (Ctrl+C) e execute:
pnpm run android

# Opção B: Usando o helper
./scripts/nodered-helper.sh  # Opção 5
```

## 🧪 Verificação

Após reiniciar o app, você deve ver nos logs:

```text
LOG  [Repository] Using API
LOG  [ApiRepository] Initialized with baseUrl: http://10.0.2.2:1880/api
LOG  [ApiRepository] Fetching all medications from: http://10.0.2.2:1880/api/medications
LOG  [ApiRepository] Fetched 5 medications
```

## 📊 Estrutura da API

### Endpoints Disponíveis

| Método | Endpoint               | Descrição                   |
| ------ | ---------------------- | --------------------------- |
| GET    | `/api/medications`     | Lista todos os medicamentos |
| GET    | `/api/medications/:id` | Busca medicamento por ID    |
| POST   | `/api/medications`     | Cria novo medicamento       |
| PUT    | `/api/medications/:id` | Atualiza medicamento        |
| DELETE | `/api/medications/:id` | Remove medicamento          |

### Dados Iniciais

O Node-RED inicia com 5 medicamentos de exemplo:

1. Paracetamol - 500mg - 8/8h
2. Ibuprofeno - 400mg - 12/12h
3. Amoxicilina - 250mg - 8/8h
4. Losartana - 50mg - 24/24h
5. Metformina - 850mg - 12/12h

## 🔄 Fluxo de Dados

```text
App React Native
    ↓
ApiMedicationRepository
    ↓ HTTP Request
Node-RED (localhost:1880)
    ↓
context.global.medications (em memória)
```

## ⚠️ Observações Importantes

1. **Persistência**: Dados ficam em memória. Reiniciar Node-RED = dados perdidos
   - Solução temporária: Aceitar (é só desenvolvimento)
   - Solução permanente: Ver seção 9 de `NODE_RED_SETUP.md`

2. **CORS**: Já configurado no flow (`access-control-allow-origin: *`)

3. **Rede**:
   - Emulador Android usa `10.0.2.2` para acessar localhost do host
   - Dispositivo físico precisa estar na mesma rede WiFi

4. **Migração para Javalin**: Quando pronta, só mudar `EXPO_PUBLIC_API_URL` no
   `.env`

## 🐛 Troubleshooting

### Erro: Network request failed

**Causa**: App não consegue conectar ao Node-RED

**Soluções**:

1. Verificar se Node-RED está rodando: `curl http://localhost:1880`
2. Verificar URL no `.env` (usar `10.0.2.2` para emulador)
3. Verificar firewall

### Erro: Medications count: 0

**Causa**: API retornou array vazio ou erro

**Soluções**:

1. Verificar se flow foi importado e deployed
2. Testar API manualmente: `curl http://localhost:1880/api/medications`
3. Ver logs do Node-RED (aba Debug)

### App não atualiza após mudar .env

**Causa**: Metro bundler precisa ser reiniciado

**Solução**: Matar e reiniciar com `pnpm run android`

## 📚 Documentação Completa

- **Quick Start**: `doc/QUICK_START_NODERED.md`
- **Setup Completo**: `doc/NODE_RED_SETUP.md`
- **Flow JSON**: `doc/node-red-flow.json`

## 🎉 Pronto

Agora você tem:

- ✅ API REST funcional com Node-RED
- ✅ App configurado para consumir a API
- ✅ CRUD completo de medicamentos
- ✅ Dados persistem durante a sessão do Node-RED
- ✅ Fácil migração para API Javalin quando estiver pronta
