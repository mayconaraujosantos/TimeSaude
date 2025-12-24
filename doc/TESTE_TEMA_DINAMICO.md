# Guia de Teste - Tema Dinâmico

## Como Testar o Tema Dinâmico

### 1. Executar o App

```bash
npm start
# ou
pnpm start
```

### 2. Acessar as Configurações de Tema

1. Abra o app
2. Navegue para **Configurações** (ícone de engrenagem)
3. Na seção **Aparência**, toque em **Tema**
4. Você verá 3 opções:
   - ✨ **Claro** - Tema claro sempre
   - 🌙 **Escuro** - Tema escuro sempre
   - 🔄 **Sistema** - Segue o tema do dispositivo

### 3. Teste a Mudança Dinâmica

#### Teste 1: Mudança Manual

1. Selecione **Tema Claro**
2. Observe todas as telas mudarem instantaneamente
3. Volte e selecione **Tema Escuro**
4. Todas as cores devem mudar imediatamente:
   - Backgrounds ficam escuros
   - Textos ficam claros
   - Bordas e superfícies se adaptam

#### Teste 2: Modo Sistema

1. Selecione **Sistema**
2. Vá para as configurações do seu dispositivo
3. Mude entre modo claro/escuro
4. Volte ao app - ele deve refletir a mudança

### 4. Telas Já Adaptadas

✅ **AddAppointmentScreen** - 100% dinâmica

- Background adapta ao tema
- Inputs mudam cores
- Bordas e textos responsivos
- Botões com cores do tema

✅ **SettingsScreen** - 100% dinâmica

- Todas as seções adaptadas
- Switches com cores do tema
- Cards e bordas dinâmicas

✅ **ThemeSettingsScreen** - 100% dinâmica

- Preview de cores ao vivo
- Ícones mudam com o tema
- Seleção visual clara

✅ **StatusBar** - Automática

- Ícones claros em tema escuro
- Ícones escuros em tema claro

### 5. O Que Observar

#### No Tema Claro

- Background: Cinza muito claro (`#F8F9FA`)
- Superfícies: Branco (`#FFFFFF`)
- Texto principal: Preto (`#1A1A1A`)
- Primary: Roxo (`#7B5FFF`)

#### No Tema Escuro

- Background: Preto profundo (`#0F0F0F`)
- Superfícies: Cinza escuro (`#1A1A1A`)
- Texto principal: Branco (`#FFFFFF`)
- Primary: Roxo claro (`#9B7FFF`)

### 6. Testando a Persistência

1. Selecione um tema (ex: Escuro)
2. Feche o app completamente
3. Reabra o app
4. O tema escuro deve continuar aplicado ✓

### 7. Navegação Entre Telas

Teste navegar entre as telas adaptadas:

- Home → Configurações → Tema → Altere → Volte
- Todas devem manter o tema consistente
- Sem atrasos ou "piscadas"

### 8. Vídeo de Demonstração

Grave um vídeo testando:

1. Abrindo o app
2. Indo para Configurações → Tema
3. Alternando entre Claro e Escuro
4. Navegando por diferentes telas
5. Voltando e mudando novamente

## Próximos Passos

### Telas que Ainda Precisam Ser Adaptadas

Para aplicar o tema nessas telas, siga o padrão:

```tsx
import { useTheme } from '@/shared/hooks/useTheme';

export function MinhaScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.textPrimary }}>Texto adaptado</Text>
    </View>
  );
}
```

### Lista de Telas para Atualizar

1. **HomeScreen** - Muitas cores hardcoded
2. **MedicationListScreen** - Verificar cores
3. **CalendarScreen** - Verificar cores
4. **ProfileScreen** - Verificar cores
5. **AppointmentListScreen** - Verificar cores

### Script de Migração

Para migrar uma tela:

1. Adicione `import { useTheme } from '@/shared/hooks/useTheme';`
2. No componente: `const { colors } = useTheme();`
3. Substitua:
   - `'#F8F9FA'` → `colors.background`
   - `'#FFFFFF'` → `colors.surface`
   - `'#1A1A1A'` → `colors.textPrimary`
   - `'#6B7280'` → `colors.textSecondary`
   - `'#9CA3AF'` → `colors.textLight`
   - `'#E5E7EB'` → `colors.border`
   - `'#7B5FFF'` → `colors.primary`

## Resolução de Problemas

### O tema não está mudando

✓ Verifique se está usando `colors` do hook ✓ Confirme que o ThemeProvider está
no App.tsx ✓ Reinicie o app completamente

### Cores ainda hardcoded

✓ Procure por valores hexadecimais (`#XXXXXX`) ✓ Substitua por propriedades de
`colors`

### Tema não persiste

✓ Verifique logs do AsyncStorage ✓ Confirme permissões do app

## Debug

Para debug, adicione ao componente:

```tsx
const { colors, theme, actualTheme } = useTheme();

console.log('Tema configurado:', theme);
console.log('Tema ativo:', actualTheme);
console.log('Cor background:', colors.background);
```

## Sucesso! 🎉

Se você consegue:

- ✅ Mudar entre temas nas configurações
- ✅ Ver todas as cores mudarem instantaneamente
- ✅ Navegar entre telas mantendo o tema
- ✅ Fechar e reabrir com o tema salvo

**O sistema de tema dinâmico está funcionando perfeitamente!**
