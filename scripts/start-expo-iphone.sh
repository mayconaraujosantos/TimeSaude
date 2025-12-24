#!/bin/bash

# Script para iniciar Expo com túnel otimizado para WSL2 + iPhone

set -e

echo "🚀 Iniciando Expo para iPhone (WSL2)"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para limpar processos
cleanup_processes() {
	echo -e "${YELLOW}🧹 Limpando processos anteriores...${NC}"
	pkill -f expo 2>/dev/null || true
	pkill -f metro 2>/dev/null || true
	pkill -f ngrok 2>/dev/null || true
	sleep 3
	echo -e "${GREEN}✓ Processos limpos${NC}"
	echo ""
}

# Função para verificar internet
check_internet() {
	echo -e "${YELLOW}🌐 Verificando conexão com internet...${NC}"
	if ping -c 1 8.8.8.8 &>/dev/null; then
		echo -e "${GREEN}✓ Internet OK${NC}"
		return 0
	else
		echo -e "${RED}✗ Sem conexão com internet${NC}"
		echo "O modo túnel requer internet. Tente o modo LAN."
		return 1
	fi
	echo ""
}

# Função para mostrar QR code
show_qr_instructions() {
	echo ""
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	echo -e "${GREEN}📱 COMO CONECTAR O IPHONE:${NC}"
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	echo ""
	echo "1. Abra o app 'Expo Go' no iPhone"
	echo "2. Toque em 'Scan QR Code'"
	echo "3. Aponte a câmera para o QR code abaixo"
	echo ""
	echo "⌨️  COMANDOS ÚTEIS:"
	echo "   q - Mostrar QR code novamente"
	echo "   r - Recarregar app"
	echo "   m - Abrir menu de desenvolvedor"
	echo ""
	echo "🌐 ALTERNATIVA:"
	echo "   Acesse http://localhost:19002 no navegador"
	echo "   para ver o QR code em interface web"
	echo ""
	echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
	echo ""
}

# Menu principal
echo "Escolha o modo de conexão:"
echo ""
echo "1) Túnel (Recomendado - funciona com qualquer rede)"
echo "2) LAN (Mais rápido - iPhone e PC na mesma rede)"
echo "3) Limpar cache e usar túnel"
echo ""
read -p "Digite sua escolha (1/2/3): " choice

case $choice in
1)
	echo ""
	cleanup_processes
	if check_internet; then
		echo -e "${YELLOW}🔥 Iniciando Expo com túnel...${NC}"
		show_qr_instructions
		echo "⏳ Aguarde 30-60 segundos para o túnel conectar..."
		echo ""
		npx expo start --tunnel
	fi
	;;
2)
	echo ""
	cleanup_processes

	# Obter IP do Windows (host)
	WINDOWS_IP=$(ip route | grep default | awk '{print $3}')

	echo -e "${GREEN}📍 IP do Windows detectado: $WINDOWS_IP${NC}"
	echo ""
	echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
	echo "1. Certifique-se de que o iPhone está na mesma rede Wi-Fi"
	echo "2. Configure o firewall do Windows para permitir as portas:"
	echo "   - 8081, 19000, 19001"
	echo ""
	echo "Deseja continuar? (y/n)"
	read -p "> " confirm

	if [[ $confirm == "y" || $confirm == "Y" ]]; then
		export REACT_NATIVE_PACKAGER_HOSTNAME=$WINDOWS_IP
		echo ""
		echo -e "${YELLOW}🔥 Iniciando Expo em modo LAN...${NC}"
		show_qr_instructions
		echo "📡 Usando IP: $WINDOWS_IP"
		echo ""
		npx expo start --lan
	fi
	;;
3)
	echo ""
	cleanup_processes
	if check_internet; then
		echo -e "${YELLOW}🧹 Limpando cache...${NC}"
		echo ""
		echo -e "${YELLOW}🔥 Iniciando Expo com túnel (cache limpo)...${NC}"
		show_qr_instructions
		echo "⏳ Aguarde 30-60 segundos para o túnel conectar..."
		echo ""
		npx expo start --clear --tunnel
	fi
	;;
*)
	echo -e "${RED}Opção inválida${NC}"
	exit 1
	;;
esac
