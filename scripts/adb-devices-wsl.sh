#!/usr/bin/env bash

echo "🔍 Procurando dispositivo Android no Windows..."

BUSID=$(usbipd.exe list | grep -i "Android" | awk '{print $1}')

if [ -z "$BUSID" ]; then
    echo "❌ Nenhum dispositivo Android encontrado no usbipd."
    exit 1
fi

echo "📌 Android encontrado no BUSID: $BUSID"

echo "🔧 Executando bind no Windows..."
usbipd.exe bind --busid $BUSID 2>/dev/null

echo "🔗 Anexando dispositivo ao WSL2..."
usbipd.exe attach --wsl --busid $BUSID

echo "🚀 Iniciando ADB..."
sudo adb kill-server
sudo adb start-server

echo "🔁 Verificando dispositivos..."
adb devices

echo "🔄 Configurando reverse para Metro bundler..."
adb reverse tcp:8081 tcp:8081

echo "🚀 Iniciando Expo..."
