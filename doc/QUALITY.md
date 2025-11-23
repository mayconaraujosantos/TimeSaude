# TimeSaude - Code Quality Guide

## 📋 Conventional Commits

Este projeto utiliza
[Conventional Commits](https://www.conventionalcommits.org/) para padronizar as
mensagens de commit.

### Formato:

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos permitidos:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de código)
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Adição/correção de testes
- `build`: Sistema de build
- `ci`: Integração contínua
- `chore`: Tarefas de manutenção
- `revert`: Reversão de commit

### Exemplos:

```bash
feat(auth): add Google login functionality
fix(medications): resolve reminder notification bug
docs(README): update installation instructions
style(components): format code with prettier
refactor(store): simplify medication slice logic
test(auth): add unit tests for login component
```

## 🔧 Scripts Disponíveis

### Desenvolvimento

```bash
pnpm start          # Inicia o servidor Expo
pnpm android       # Executa no Android
pnpm ios           # Executa no iOS
pnpm web           # Executa no navegador
```

### Qualidade de Código

```bash
pnpm lint          # Executa ESLint
pnpm lint:fix      # Executa ESLint e corrige automaticamente
pnpm format        # Formata código com Prettier
pnpm format:check  # Verifica formatação
pnpm type-check    # Verifica tipos TypeScript
pnpm quality       # Executa todos os checks de qualidade
```

### Testes

```bash
pnpm test          # Executa testes
pnpm test:watch    # Executa testes em modo watch
pnpm test:coverage # Executa testes com coverage
```

## 🪝 Git Hooks (Lefthook)

### Pre-commit

- Lint dos arquivos alterados
- Formatação automática
- Type checking
- Testes relacionados aos arquivos alterados

### Commit-msg

- Validação do formato do commit message

### Pre-push

- Execução da suíte completa de testes
- Verificação final de qualidade

## 📊 Coverage Thresholds

O projeto mantém os seguintes thresholds de coverage:

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## 🛠️ Ferramentas Configuradas

### ESLint

- Configuração para TypeScript + React Native
- Regras para React Hooks
- Import/export organization
- Integração com Prettier

### Prettier

- Formatação consistente
- Integração com ESLint
- Suporte a múltiplos tipos de arquivo

### Jest

- Configurado para React Native/Expo
- Mocks para módulos nativos
- Coverage reports
- Setup personalizado

### TypeScript

- Strict mode habilitado
- Path mapping configurado
- Verificações avançadas

### Lefthook

- Git hooks automatizados
- Validação pré-commit
- Execução paralela de comandos
