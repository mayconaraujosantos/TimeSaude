# Fix: React Native Reanimated Warnings

## Problema Identificado

```
WARN It looks like you might be using shared value's .value inside reanimated inline style
```

## Causa Raiz

O **NativeWind v4** depende do **react-native-reanimated** (via
`react-native-css-interop`), mas o plugin do Reanimated não estava configurado
no Babel, causando warnings sobre uso incorreto de shared values.

## Solução Implementada

### 1. Babel Configuration

Adicionado o plugin do Reanimated no `babel.config.js`:

```javascript
plugins: [
  // ... outros plugins
  'react-native-reanimated/plugin', // DEVE ser o último plugin
],
```

**⚠️ IMPORTANTE**: O plugin do Reanimated **DEVE** ser o último na lista de
plugins do Babel.

### 2. Jest Configuration

Configurado mock apropriado do Reanimated no `jest.setup.js`:

```javascript
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
```

## Dependências

```
NativeWind 4.2.1
└── react-native-css-interop 0.2.1
    └── react-native-reanimated 4.1.5 (peer)
```

## Após Aplicar o Fix

1. Limpar cache:

```bash
rm -rf node_modules/.cache .expo android/build android/app/build
```

2. Reiniciar Metro Bundler:

```bash
pnpm start --reset-cache
```

3. Rebuild do app Android:

```bash
pnpm android
```

## Referências

- [Reanimated Installation](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
- [NativeWind v4 Docs](https://www.nativewind.dev/)
- [Shared Values Documentation](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary/#shared-values)

## Tipo de Commit

```bash
git commit -m "fix(config): add Reanimated Babel plugin for NativeWind compatibility"
```

**Tipo**: `fix` - correção de configuração que resolve warnings em runtime.
