# Sistema de Temas - TimeSaúde

## Visão Geral

O TimeSaúde agora possui um sistema completo de temas com suporte a modo claro e
escuro. Os usuários podem escolher entre:

- **Tema Claro**: Interface clara e vibrante
- **Tema Escuro**: Interface escura para melhor visualização em ambientes com
  pouca luz
- **Tema Sistema**: Segue automaticamente as configurações do dispositivo

## Arquitetura

### Componentes Principais

1. **ThemeContext** (`src/shared/contexts/ThemeContext.tsx`)
   - Gerencia o estado do tema globalmente
   - Persiste a preferência do usuário usando AsyncStorage
   - Fornece as cores do tema atual

2. **ThemeSettingsScreen**
   (`src/features/settings/screens/ThemeSettingsScreen.tsx`)
   - Interface para o usuário selecionar o tema
   - Preview das cores do tema
   - Informações sobre o modo sistema

3. **Definições de Cores**
   - `lightColors`: Paleta de cores para o tema claro
   - `darkColors`: Paleta de cores para o tema escuro

## Como Usar

### 1. Acessar o Tema em um Componente

```tsx
import { useTheme } from '@/shared/hooks/useTheme';

function MeuComponente() {
  const { colors, actualTheme, theme, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.textPrimary }}>Olá, Mundo!</Text>
    </View>
  );
}
```

### 2. Propriedades Disponíveis

#### Cores Principais

- `primary`: Cor primária (#7B5FFF claro, #9B7FFF escuro)
- `primaryDark`: Variação escura da cor primária
- `secondary`: Cor secundária (#FF6B9D claro, #FF8BB5 escuro)
- `accent`: Cor de destaque (#FFB800 claro, #FFD233 escuro)

#### Backgrounds

- `background`: Cor de fundo principal
- `surface`: Cor de superfície para cards e containers
- `surfaceVariant`: Variação da cor de superfície

#### Textos

- `textPrimary`: Texto principal
- `textSecondary`: Texto secundário
- `textLight`: Texto claro/desabilitado
- `textOnPrimary`: Texto sobre cor primária (sempre branco)

#### Bordas

- `border`: Cor de borda padrão
- `borderLight`: Cor de borda clara

#### Estados

- `success`: Cor de sucesso (#10B981 claro, #34D399 escuro)
- `warning`: Cor de aviso (#F59E0B claro, #FBBF24 escuro)
- `error`: Cor de erro (#EF4444 claro, #F87171 escuro)
- `info`: Cor informativa (#3B82F6 claro, #60A5FA escuro)

#### Outros

- `overlay`: Cor de overlay/modal
- `shadow`: Cor de sombra

### 3. Mudando o Tema Programaticamente

```tsx
const { setTheme } = useTheme();

// Definir tema específico
await setTheme('dark');
await setTheme('light');
await setTheme('system');
```

### 4. Verificando o Tema Atual

```tsx
const { actualTheme, theme } = useTheme();

// actualTheme: 'light' ou 'dark' (tema efetivamente aplicado)
// theme: 'light', 'dark' ou 'system' (preferência do usuário)

if (actualTheme === 'dark') {
  // Lógica específica para tema escuro
}
```

## Navegação

Para acessar as configurações de tema:

1. Vá para **Configurações**
2. Na seção **Aparência**, toque em **Tema**
3. Selecione sua preferência de tema

## Exemplo Completo

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@/shared/hooks/useTheme';

export function ExemploTema() {
  const { colors } = useTheme();

  return (
    <View className='flex-1' style={{ backgroundColor: colors.background }}>
      <View
        className='rounded-3xl p-6 m-4'
        style={{
          backgroundColor: colors.surface,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <Text
          className='text-2xl font-bold mb-2'
          style={{ color: colors.textPrimary }}
        >
          Título do Card
        </Text>

        <Text
          className='text-base mb-4'
          style={{ color: colors.textSecondary }}
        >
          Descrição do conteúdo com cores que se adaptam ao tema.
        </Text>

        <TouchableOpacity
          className='rounded-full py-3'
          style={{ backgroundColor: colors.primary }}
        >
          <Text
            className='text-center font-semibold'
            style={{ color: colors.textOnPrimary }}
          >
            Botão de Ação
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

## Boas Práticas

1. **Sempre use `colors` do contexto**: Nunca use cores hardcoded como
   `'#FFFFFF'` ou `'#000000'`

2. **Use cores semânticas**: Prefira `colors.textPrimary` em vez de escolher uma
   cor específica

3. **Teste em ambos os temas**: Verifique se seus componentes ficam bons tanto
   no tema claro quanto no escuro

4. **Sombras e elevação**: Use `colors.shadow` para sombras e ajuste a opacidade
   conforme necessário

5. **Transparência**: Você pode adicionar transparência às cores usando template
   strings:
   ```tsx
   backgroundColor: `${colors.primary}15`; // 15% de opacidade
   ```

## Migrando Componentes Existentes

Para migrar um componente que usa cores hardcoded:

1. Adicione o import: `import { useTheme } from '@/shared/hooks/useTheme';`
2. Obtenha as cores: `const { colors } = useTheme();`
3. Substitua todas as cores hardcoded pelas propriedades de `colors`

Exemplo:

```tsx
// Antes
style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}

// Depois
style={{ backgroundColor: colors.surface, color: colors.textPrimary }}
```

## Troubleshooting

### O tema não está mudando

- Verifique se o `ThemeProvider` está envolvendo sua aplicação no `App.tsx`
- Certifique-se de que está usando `useTheme()` dentro de um componente filho do
  `ThemeProvider`

### Cores não estão sendo aplicadas

- Confirme que está usando `colors` do hook `useTheme()` e não valores hardcoded
- Verifique se não há estilos inline sobrescrevendo as cores do tema

### Preferência não está sendo salva

- Verifique se o AsyncStorage está configurado corretamente
- Veja o console para erros ao salvar/carregar a preferência
