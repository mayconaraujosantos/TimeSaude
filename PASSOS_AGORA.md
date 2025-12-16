# 🚀 Passos Rápidos - Configuração Node-RED

## ✅ Status Atual

- ✅ Node-RED instalado
- ✅ Node-RED rodando em: <http://localhost:1880>
- ⏳ **FALTA**: Importar o flow

---

## 📥 IMPORTAR O FLOW (FAÇA AGORA)

### Passo 1: Abrir Node-RED

O navegador já deve estar aberto em: **<http://localhost:1880>**

Se não estiver, abra manualmente.

### Passo 2: Importar

1. Clique no menu **☰** (três linhas, canto superior direito)
2. Clique em **"Import"**
3. Abra o arquivo `doc/node-red-flow.json` no VS Code
4. **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)
5. **Cole** na janela de Import
6. Clique em **"Import"**

### Passo 3: Deploy

1. Clique no botão **"Deploy"** (vermelho, canto superior direito)
2. Aguarde a mensagem "Successfully deployed"

---

## 🧪 TESTAR

Execute no terminal:

```bash
curl http://localhost:1880/api/medications
```

**Resultado esperado**: JSON com 5 medicamentos

---

## 📱 REINICIAR O APP

Depois de importar e fazer deploy:

```bash
# Mate o metro (Ctrl+C no terminal do pnpm run android)
# Depois execute:
pnpm run android
```

**Logs esperados**:

```
LOG  [Repository] Using API
LOG  [ApiRepository] Initialized with baseUrl: http://10.0.2.2:1880/api
LOG  [ApiRepository] Fetching all medications from: http://10.0.2.2:1880/api/medications
LOG  [ApiRepository] Fetched 5 medications
```

---

## ❌ Troubleshooting

### "Cannot GET /api/medications"

**Causa**: Flow não foi importado ou não foi feito Deploy

**Solução**: Volte ao Passo 2 e 3

### "Network request failed" no app

**Causa**: Node-RED não está rodando ou flow não foi deployed

**Solução**:

1. Verificar: `curl http://localhost:1880/api/medications`
2. Se não funcionar, importar o flow novamente

### Node-RED parou

**Reiniciar**:

```bash
node-red > /tmp/nodered.log 2>&1 &
```

---

## 📄 Conteúdo do Flow

O arquivo está em: `doc/node-red-flow.json`

Você pode abri-lo no VS Code para copiar facilmente.

---

## ✅ Checklist

- [ ] Node-RED aberto no navegador
- [ ] Flow importado
- [ ] Deploy feito (botão vermelho)
- [ ] Teste com curl funcionou
- [ ] App reiniciado
- [ ] App mostra "Fetched X medications"

---

**Está com o flow aberto no VS Code?**

Copie o conteúdo de `doc/node-red-flow.json` e cole no Node-RED!
