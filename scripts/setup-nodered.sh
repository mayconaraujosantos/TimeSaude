#!/bin/bash

# 🎯 Setup Rápido Node-RED para TimeSaúde
# Execute este script para configurar tudo automaticamente

set -e

echo "🏥 TimeSaúde - Configuração Automática Node-RED"
echo "================================================"
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Verificar se Node-RED está instalado
echo -e "${BLUE}📋 Verificando Node-RED...${NC}"
if ! command -v node-red &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node-RED não encontrado. Instalando...${NC}"
    npm install -g node-red
    echo -e "${GREEN}✅ Node-RED instalado!${NC}"
else
    echo -e "${GREEN}✅ Node-RED já instalado${NC}"
fi
echo ""

# 2. Verificar se Node-RED está rodando
echo -e "${BLUE}🔍 Verificando se Node-RED está rodando...${NC}"
if curl -s http://localhost:1880 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Node-RED já está rodando${NC}"
else
    echo -e "${YELLOW}⚠️  Node-RED não está rodando. Iniciando...${NC}"
    node-red > /tmp/nodered.log 2>&1 &
    echo "Aguardando Node-RED iniciar..."
    sleep 5
    
    if curl -s http://localhost:1880 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Node-RED iniciado com sucesso!${NC}"
    else
        echo -e "${RED}❌ Falha ao iniciar Node-RED${NC}"
        echo "Verifique os logs em: /tmp/nodered.log"
        exit 1
    fi
fi
echo ""

# 3. Instruções para importar o flow
echo -e "${BLUE}📥 PRÓXIMO PASSO: Importar o Flow${NC}"
echo ""
echo -e "${YELLOW}Siga estas instruções:${NC}"
echo ""
echo "1️⃣  Abra seu navegador em: ${GREEN}http://localhost:1880${NC}"
echo ""
echo "2️⃣  Clique no menu (☰) no canto superior direito"
echo ""
echo "3️⃣  Clique em: Import"
echo ""
echo "4️⃣  Abra o arquivo: ${GREEN}doc/node-red-flow.json${NC}"
echo "    Copie TODO o conteúdo e cole na janela de importação"
echo ""
echo "5️⃣  Clique em: ${GREEN}Import${NC}"
echo ""
echo "6️⃣  Clique no botão: ${GREEN}Deploy${NC} (vermelho no canto superior direito)"
echo ""
echo "7️⃣  Execute este comando para testar:"
echo -e "    ${GREEN}curl http://localhost:1880/api/medications${NC}"
echo ""
echo "================================================"
echo ""
echo -e "${BLUE}📱 Depois de importar o flow:${NC}"
echo ""
echo "Execute para reiniciar o app:"
echo -e "  ${GREEN}pnpm run android${NC}"
echo ""
echo "Você deve ver nos logs:"
echo -e "  ${GREEN}LOG  [ApiRepository] Fetched X medications${NC}"
echo ""
echo "================================================"
echo ""
echo -e "${YELLOW}Node-RED está rodando em background${NC}"
echo "Para ver logs: tail -f /tmp/nodered.log"
echo "Para parar: pkill -f node-red"
echo ""
