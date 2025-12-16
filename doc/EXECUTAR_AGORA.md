# 🚀 EXECUTAR AGORA - Configurar API Node-RED

## ✅ Status Atual

- ✅ Node-RED rodando no WSL2 (172.17.81.36:1880)
- ✅ API com 5 medicamentos funcionando
- ✅ App configurado para usar API
- ⏳ **FALTA**: Port forwarding Windows → WSL2

---

## 📋 PASSO A PASSO

### 1️⃣ Abrir PowerShell como Administrador (WINDOWS)

**No Windows:**

1. Pressione `Win + X`
2. Clique em **"Windows PowerShell (Admin)"** ou **"Terminal (Admin)"**
3. Se aparecer UAC, clique em **"Sim"**

### 2️⃣ Executar o Script de Port Forwarding

**No PowerShell (como Admin):**

```powershell
# Navegue até a pasta do projeto
cd \\wsl$\Arch\home\maycon\Documents\timesaude\scripts

# Execute o script
.\wsl2-port-forward.ps1
```

**OU copie e cole este comando direto:**

```powershell
netsh interface portproxy delete v4tov4 listenport=1880 listenaddress=0.0.0.0
netsh interface portproxy add v4tov4 listenport=1880 listenaddress=0.0.0.0 connectport=1880 connectaddress=172.17.81.36
New-NetFirewallRule -DisplayName "Node-RED WSL2" -Direction Inbound -LocalPort 1880 -Protocol TCP -Action Allow -Force
```

### 3️⃣ Testar no Windows

**No PowerShell:**

```powershell
curl http://localhost:1880/api/medications
```

**Resultado esperado:**

```json
[{"id":"1","name":"Paracetamol",...}, ...]
```

### 4️⃣ Reiniciar o App React Native

**No terminal WSL (onde está rodando pnpm):**

Pressione `r` para reload, ou mate e execute:

```bash
pnpm run android
```

---

## ✅ Logs Esperados

Após reiniciar o app, você deve ver:

```
LOG  [Repository] Using API
LOG  [ApiRepository] Initialized with baseUrl: http://10.0.2.2:1880/api
LOG  [ApiRepository] Fetching all medications from: http://10.0.2.2:1880/api/medications
LOG  [ApiRepository] Fetched 5 medications
LOG  [MEDICATION_LIST] Medications count: 5
```

---

## 🔄 Fluxo de Dados

```
Android Emulator (10.0.2.2:1880)
        ↓
Windows Host (localhost:1880) ← Port Forwarding
        ↓
WSL2 (172.17.81.36:1880)
        ↓
Node-RED
        ↓
context.global.medications (5 itens)
```

---

## ❌ Troubleshooting

### "Acesso negado" ao executar script

**Solução**: PowerShell precisa estar como **Administrador**

### curl não funciona no Windows

**Solução**: Use o navegador: <http://localhost:1880/api/medications>

### App ainda mostra "Network request failed"

**Soluções**:

1. Verificar port forwarding: `netsh interface portproxy show all`
2. Verificar Node-RED rodando: `curl http://localhost:1880` (no Windows)
3. Reiniciar app completamente (fechar e abrir de novo)

### IP do WSL2 mudou

**Descobrir novo IP (no WSL):**

```bash
hostname -I | awk '{print $1}'
```

Atualizar no script PowerShell e executar novamente.

---

## 📝 Resumo

**O que você precisa fazer AGORA:**

1. ✅ Abrir PowerShell como Admin (Windows)
2. ✅ Executar comando de port forwarding
3. ✅ Testar com curl
4. ✅ Reiniciar app React Native
5. ✅ Verificar logs mostrando "Fetched 5 medications"

**Tempo estimado**: 2 minutos

🎯 **Após isso, o app estará consumindo dados da API Node-RED!**
