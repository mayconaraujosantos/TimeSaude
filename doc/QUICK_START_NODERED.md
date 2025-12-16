# Quick Start - Node-RED API

## 1. Instalar e iniciar Node-RED

```bash
npm install -g node-red
node-red
```

Acesse: <http://localhost:1880>

## 2. Importar o Flow

1. No Node-RED, clique no menu (≡) → Import
2. Cole o conteúdo do arquivo `node-red-flow.json` (abaixo)
3. Clique em "Import"
4. Clique em "Deploy" (botão vermelho no canto superior direito)

## 3. Configurar o App

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite `.env` com a URL correta:

- Emulador Android: `http://10.0.2.2:1880/api`
- Dispositivo físico: `http://SEU_IP:1880/api` (descubra com `ip addr show`)
- Localhost (iOS): `http://localhost:1880/api`

## 4. Reiniciar o app

```bash
# Mate o Metro Bundler (Ctrl+C) e execute novamente:
pnpm run android
```

## 5. Testar

A API estará disponível em:

- GET `/api/medications` - Lista todos
- POST `/api/medications` - Cria novo
- PUT `/api/medications/:id` - Atualiza
- DELETE `/api/medications/:id` - Deleta

---

**Documentação completa**: Ver `doc/NODE_RED_SETUP.md`
