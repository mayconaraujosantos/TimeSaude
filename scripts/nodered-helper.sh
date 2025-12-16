#!/bin/bash

# Script para facilitar o desenvolvimento com Node-RED

echo "🏥 TimeSaúde - Node-RED Helper"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar se Node-RED está instalado
check_nodered() {
    if ! command -v node-red &> /dev/null; then
        echo -e "${YELLOW}⚠️  Node-RED não está instalado${NC}"
        echo "Instale com: npm install -g node-red"
        return 1
    fi
    return 0
}

# Função para verificar se Node-RED está rodando
check_nodered_running() {
    if curl -s http://localhost:1880 > /dev/null 2>&1; then
        return 0
    fi
    return 1
}

# Menu principal
echo "Escolha uma opção:"
echo "1) Instalar Node-RED"
echo "2) Iniciar Node-RED"
echo "3) Testar API (GET /api/medications)"
echo "4) Ver IP da máquina (para dispositivo físico)"
echo "5) Reiniciar app com API"
echo "6) Sair"
echo ""
read -p "Opção: " option

case $option in
    1)
        echo -e "${GREEN}📦 Instalando Node-RED...${NC}"
        npm install -g node-red
        echo -e "${GREEN}✅ Node-RED instalado!${NC}"
        echo "Execute: ./scripts/nodered-helper.sh e escolha opção 2 para iniciar"
        ;;
    2)
        if check_nodered; then
            echo -e "${GREEN}🚀 Iniciando Node-RED...${NC}"
            echo "Acesse: http://localhost:1880"
            echo "Importe o flow de: doc/node-red-flow.json"
            echo ""
            node-red
        fi
        ;;
    3)
        if check_nodered_running; then
            echo -e "${GREEN}🧪 Testando API...${NC}"
            echo ""
            curl -s http://localhost:1880/api/medications | python3 -m json.tool || \
            curl -s http://localhost:1880/api/medications | jq || \
            curl -s http://localhost:1880/api/medications
            echo ""
            echo ""
            echo -e "${GREEN}✅ API respondendo!${NC}"
        else
            echo -e "${YELLOW}⚠️  Node-RED não está rodando${NC}"
            echo "Execute a opção 2 primeiro"
        fi
        ;;
    4)
        echo -e "${GREEN}🌐 IPs da máquina:${NC}"
        echo ""
        if command -v ip &> /dev/null; then
            ip addr show | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}' | cut -d'/' -f1
        elif command -v ifconfig &> /dev/null; then
            ifconfig | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}'
        else
            hostname -I
        fi
        echo ""
        echo "Use um desses IPs no arquivo .env:"
        echo "EXPO_PUBLIC_API_URL=http://SEU_IP:1880/api"
        ;;
    5)
        echo -e "${GREEN}🔄 Reiniciando app...${NC}"
        echo "Matando processos antigos..."
        pkill -f "react-native" || true
        pkill -f "metro" || true
        sleep 2
        echo "Iniciando..."
        pnpm run android
        ;;
    6)
        echo "👋 Até logo!"
        exit 0
        ;;
    *)
        echo -e "${YELLOW}⚠️  Opção inválida${NC}"
        exit 1
        ;;
esac
