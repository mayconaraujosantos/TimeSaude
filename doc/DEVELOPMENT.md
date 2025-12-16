# Guia de Desenvolvimento - TimeSaúde

## Ambiente de Desenvolvimento

Este projeto usa **NativeWind v4** que requer **Expo Development Build**.

⚠️ **NativeWind v4 NÃO é compatível com Expo Go** - use apenas development
builds.

## Comandos para Desenvolvimento

### Iniciar o projeto (Development Build)

```bash
pnpm expo start --dev-client
# ou
pnpm run android
pnpm run ios
```

### Build do Development Client

```bash
# Android
pnpm expo run:android

# iOS
pnpm expo run:ios
```

### Limpar cache (quando houver mudanças no babel.config.js ou metro.config.js)

```bash
pnpm expo start --clear
```

## Configuração do NativeWind v4

### babel.config.js

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // path aliases...
    ],
  };
};
```

### metro.config.js

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

## Problemas Conhecidos e Soluções

### SafeAreaView Deprecated Warning

```
WARN SafeAreaView has been deprecated
```

**Solução**: Já estamos usando `react-native-safe-area-context`. O warning vem
do `@react-navigation/native-stack` internamente. Não afeta o funcionamento.

### Boolean Type Error (apenas no Expo Go)

```
ERROR TypeError: expected dynamic type 'boolean', but had type 'string'
```

**Causa**: NativeWind v4 + Expo Go incompatibilidade  
**Solução**: Use development build (já configurado)

## Stack Tecnológica

- **React Native**: 0.76.5
- **Expo SDK**: 54
- **NativeWind**: 4.2.1
- **React Navigation**: Native Stack 7.8.5
- **State Management**: Custom hooks + Repository Pattern
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Storage**: AsyncStorage
- **Package Manager**: pnpm 10.23.0

## Arquitetura do Projeto

```
src/
├── app/              # Configuração do app e navegação
├── features/         # Features por domínio
│   ├── medication/   # Feature de medicamentos
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── repository/
│   │   └── model/
│   ├── calendar/
│   └── home/
├── shared/           # Componentes compartilhados
│   ├── components/
│   │   ├── atoms/    # Componentes básicos
│   │   └── molecules/
│   └── utils/
├── lib/              # Bibliotecas e adaptadores
├── config/           # Configurações da aplicação
└── types/            # Tipos TypeScript globais
```

## Boas Práticas

1. **Sempre use development build** para desenvolvimento
2. **Limpe o cache** após mudanças no babel.config.js
3. **Reinicie o Metro** após mudanças significativas
4. **Use path aliases** (@/features, @/shared, etc.)
5. **Siga o Repository Pattern** para acesso a dados

## Comandos Úteis

```bash
# Testes
pnpm test
pnpm test:watch
pnpm test:coverage

# Linting
pnpm lint
pnpm lint:fix

# Formatação
pnpm format
pnpm format:check

# Type checking
pnpm type-check

# Quality check completo
pnpm quality
```
