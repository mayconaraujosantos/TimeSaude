# Guia de Conectividade - TimeSaude

## Problema: Network request failed

Se você está vendo o erro `Network request failed`, significa que o app não
consegue se conectar à API Node-RED.

## ✅ Solução Recomendada: ADB Reverse

A melhor solução é usar `adb reverse` para mapear a porta do host para o
dispositivo:

### Setup Rápido

```bash
# 1. Execute o script de configuração
./scripts/setup-android-reverse.sh
```

Isso configura automaticamente o port forwarding e permite que você use
`localhost:1880` no dispositivo Android.

### Manual

```bash
# Verificar dispositivos conectados
adb devices

# Configurar reverse
adb reverse tcp:1880 tcp:1880

# Verificar
adb reverse --list

# Remover (se necessário)
adb reverse --remove tcp:1880
```

## Alternativas

### 1. Android Emulator (sem reverse)

Se não puder usar `adb reverse`, use:

```
http://10.0.2.2:1880/api
```

Configure via ambiente:

```bash
export EXPO_PUBLIC_API_URL=http://10.0.2.2:1880/api
```

### 2. iOS Simulator

Use `localhost` diretamente:

```
http://localhost:1880/api
```

### 3. Dispositivo Físico (mesma rede)

Use o IP da máquina host:

```bash
# Descobrir IP
ip addr show | grep "inet " | grep -v "127.0.0.1"

# Exemplo
export EXPO_PUBLIC_API_URL=http://192.168.1.100:1880/api
```

## Diagnóstico

Execute o script de diagnóstico:

```bash
./scripts/check-connectivity.sh
```

## Verificar Node-RED

```bash
# Verificar se está rodando
docker ps | grep nodered

# Testar endpoint
curl http://localhost:1880/api/medications

# Reiniciar se necessário
docker-compose restart nodered
```

## URLs Testadas Automaticamente

O app testa automaticamente estas URLs em ordem:

1. `$EXPO_PUBLIC_API_URL` (variável de ambiente)
2. `http://localhost:1880/api` (com adb reverse)
3. `http://10.0.2.2:1880/api` (fallback Android)
4. IP local configurado

## Notas Importantes

- ✅ **Recomendado**: Use `adb reverse` + `localhost`
- 🔄 Execute `setup-android-reverse.sh` sempre que reiniciar o emulador
- 📱 Funciona com emuladores e dispositivos físicos via USB
- 🌐 Certifique-se que o Node-RED está acessível na porta 1880
