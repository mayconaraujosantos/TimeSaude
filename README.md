# TimeSaúde

App de lembretes de medicamentos para controle e acompanhamento de tratamentos.

## 🚀 Quick Start

### Desenvolvimento com Node-RED (API temporária)

```bash
# 1. Iniciar Node-RED via Docker
docker-compose up -d

# 2. Configurar conectividade Android (recomendado)
pnpm adb:reverse
# Ou: ./scripts/setup-android-reverse.sh

# 3. Instalar dependências
pnpm install

# 4. Executar o app
pnpm run android
```

**Importante**: Se ver erro `Network request failed`, execute `pnpm adb:reverse` para configurar o port forwarding.

**Documentação completa**:

- [`doc/QUICK_START_NODERED.md`](doc/QUICK_START_NODERED.md)
- [`doc/CONNECTIVITY_GUIDE.md`](doc/CONNECTIVITY_GUIDE.md) - Resolver problemas de rede

## 📱 Funcionalidades

- ✅ Listagem de medicamentos
- ✅ Adicionar novo medicamento
- ✅ Editar medicamento (modal com teclado otimizado)
- ✅ Deletar medicamento
- ✅ Interface responsiva com NativeWind (Tailwind CSS)
- 🔄 Sincronização com API REST (Node-RED/Javalin)

## 🏗️ Arquitetura

### Clean Architecture

```text
src/
├── features/              # Módulos por feature
│   ├── medication/
│   │   ├── components/   # Componentes React
│   │   ├── screens/      # Telas
│   │   ├── hooks/        # Custom hooks
│   │   ├── repository/   # Camada de dados (abstração)
│   │   └── model/        # Tipos e interfaces
│   └── appointment/
├── shared/               # Componentes compartilhados
├── navigation_stack/     # Navegação
└── config/              # Configurações
```

### Repositórios (Strategy Pattern)

O app suporta 3 tipos de fontes de dados:

1. **Mock** - Dados em memória (desenvolvimento)
2. **LocalStorage** - AsyncStorage (offline-first)
3. **API** - REST API (Node-RED → Javalin)

Configuração em `src/config/app.config.ts`:

```typescript
features: {
    useMockData: false,
    useLocalStorage: false,
    useApi: true,  // ← Usando Node-RED
}
```

## 🔌 API

### Node-RED (Atual - Temporário)

API REST implementada em Node-RED para desenvolvimento rápido.

**Endpoints**:

- `GET /api/medications` - Lista todos
- `GET /api/medications/:id` - Busca por ID
- `POST /api/medications` - Cria novo
- `PUT /api/medications/:id` - Atualiza
- `DELETE /api/medications/:id` - Remove

**Configuração**: Ver [`doc/NODE_RED_SETUP.md`](doc/NODE_RED_SETUP.md)

### Javalin (Futuro)

API em desenvolvimento com Kotlin/Javalin. Quando estiver pronta, basta alterar a `baseUrl` em `.env`.

## 🧪 Testes

```bash
pnpm test
```

## 📚 Documentação

- [Quick Start Node-RED](doc/QUICK_START_NODERED.md)
- [Setup Node-RED Completo](doc/NODE_RED_SETUP.md)
- [Qualidade de Código](doc/QUALITY.md)

## 🛠️ Tecnologias

- React Native + Expo
- TypeScript
- NativeWind (Tailwind CSS)
- React Navigation
- Node-RED (API temporária)
- Javalin (API em desenvolvimento)

## 📝 Commits

Este projeto usa [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: adiciona funcionalidade X
fix: corrige bug Y
docs: atualiza documentação
```

## 📄 Licença

MIT
