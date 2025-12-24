# Guia: Conectar iPhone ao Expo no WSL2

## ✅ Status Atual

- ✓ Metro bundler rodando (porta 8081)
- ✓ Ngrok instalado (túnel ativo)
- ✓ Conexão com internet OK

## 🔍 Problema Identificado

O QR code não aparece no terminal ou o iPhone não consegue se conectar ao
escanear.

## 📱 Soluções (Tente na Ordem)

### Solução 1: Pressionar 'q' no Terminal

No terminal onde o Expo está rodando, pressione:

```
q
```

Isso deve exibir o QR code novamente.

### Solução 2: Acessar DevTools no Navegador

1. No WSL2, abra o navegador (ou no Windows)
2. Acesse: `http://localhost:19002`
3. O QR code aparecerá na interface web
4. Escaneie com o Expo Go no iPhone

### Solução 3: Usar o Túnel URL Direto

O túnel deve ter gerado uma URL. Procure no output do terminal por algo como:

```
Metro waiting on exp://xxx.xxx.xxx.xxx:8081
Tunnel ready: exp://abcd1234.tunnel.dev
```

Copie a URL do túnel e:

1. Abra o Expo Go no iPhone
2. Cole manualmente a URL no campo de endereço

### Solução 4: Reiniciar com Túnel Limpo

```bash
# Matar todos os processos
pkill -f expo && pkill -f metro && pkill -f ngrok

# Esperar 5 segundos
sleep 5

# Iniciar novamente
cd /home/maycon/Documents/mayconaraujosantos/timesaude
pnpm expo start --clear --tunnel
```

### Solução 5: Usar Modo LAN (Alternativa ao Túnel)

Se o túnel continuar com problemas, use LAN:

1. **Obtenha o IP do Windows (Host)**:

```bash
ip route | grep default | awk '{print $3}'
```

Exemplo de output: `172.24.240.1`

2. **Inicie o Expo com esse IP**:

```bash
export REACT_NATIVE_PACKAGER_HOSTNAME=172.24.240.1
pnpm expo start --clear --lan
```

3. **Configure o Firewall do Windows**:

- Abra "Windows Defender Firewall"
- Clique em "Configurações avançadas"
- Regras de entrada > Nova regra
- Porta TCP: 8081, 19000, 19001
- Permitir conexão
- Nome: "Expo WSL2"

4. **Conecte o iPhone na mesma rede Wi-Fi**

5. **Escaneie o QR code no Expo Go**

## 🛠️ Comandos Úteis

### Ver Output Detalhado

```bash
pnpm expo start --clear --tunnel --log
```

### Verificar Túnel Ngrok

```bash
ps aux | grep ngrok
```

### Verificar URLs do Expo

No terminal do Expo, pressione:

- `q` = Mostrar QR code
- `r` = Recarregar app
- `m` = Menu do desenvolvedor
- `shift+m` = Selecionar onde abrir o menu

## ❓ Perguntas Frequentes

### O QR code aparece mas o iPhone não conecta?

- Verifique se o iPhone tem internet
- Atualize o app Expo Go para a última versão
- Tente usar a URL manual (Solução 3)

### Aparece "Something went wrong" no iPhone?

- Reinicie o Expo (Solução 4)
- Verifique se a versão do SDK no app.json é compatível
- Tente: `pnpm expo install --fix`

### O túnel demora muito para conectar?

- É normal demorar 30-60 segundos
- Se demorar mais de 2 minutos, use a Solução 5 (LAN)

### Erro "Unable to resolve module"?

```bash
# Limpe tudo e reinstale
pnpm expo start --clear --tunnel
# Se persistir:
rm -rf node_modules
pnpm install
pnpm expo start --clear --tunnel
```

## 📋 Checklist de Problemas

- [ ] O Expo está rodando? (`ps aux | grep expo`)
- [ ] O túnel está conectado? ("Tunnel ready" no output)
- [ ] O QR code aparece no terminal?
- [ ] O Expo Go está atualizado no iPhone?
- [ ] O iPhone tem conexão com internet?
- [ ] Já tentou pressionar 'q' no terminal?
- [ ] Já tentou acessar http://localhost:19002?
- [ ] Já tentou reiniciar o Expo?

## 🎯 Solução Rápida (Copy/Paste)

```bash
# Mate tudo e reinicie
pkill -f expo && pkill -f metro && pkill -f ngrok
sleep 5

# Volte ao diretório do projeto
cd /home/maycon/Documents/mayconaraujosantos/timesaude

# Inicie com túnel
pnpm expo start --clear --tunnel

# Aguarde aparecer "Tunnel ready"
# Pressione 'q' para mostrar o QR code
# Escaneie com o Expo Go no iPhone
```

## 📞 Última Alternativa

Se nada funcionar, use o modo de desenvolvimento via USB (não requer rede):

Para iPhone, isso requer:

1. Xcode instalado
2. Compilar o app: `pnpm ios`
3. Rodar direto no dispositivo via cabo

Mas isso é mais complexo. As soluções acima devem funcionar!
