# Code Quality Guide - TimeSaude

Este guia descreve todas as ferramentas e práticas de qualidade de código
implementadas no projeto TimeSaude.

## 📋 Índice

1. [Ferramentas Configuradas](#ferramentas-configuradas)
2. [Scripts Disponíveis](#scripts-disponíveis)
3. [Git Hooks Automáticos](#git-hooks-automáticos)
4. [CI/CD Pipeline](#cicd-pipeline)
5. [Boas Práticas](#boas-práticas)

## 🛠️ Ferramentas Configuradas

### 1. TypeScript

**Objetivo**: Type safety e melhor DX (Developer Experience)

**Configuração**: `tsconfig.json`

- Strict mode habilitado
- No unused locals/parameters
- No implicit returns
- Path aliases configurados

```bash
pnpm type-check
```

### 2. ESLint

**Objetivo**: Análise estática de código e enforcing de padrões

**Configuração**: `eslint.config.mjs`

- TypeScript ESLint
- React & React Native plugins
- React Hooks rules
- Stylistic rules
- Prettier integration

```bash
pnpm lint           # Check
pnpm lint:fix       # Fix automaticamente
```

### 3. Prettier

**Objetivo**: Formatação consistente de código

**Configuração**: `.prettierrc.js`

```bash
pnpm format         # Format all files
pnpm format:check   # Check only
```

### 4. Jest

**Objetivo**: Testes unitários e de integração

**Configuração**: `jest.setup.js` + package.json

- React Native Testing Library
- Coverage reports

```bash
pnpm test                # Run tests
pnpm test:watch          # Watch mode
pnpm test:coverage       # With coverage
```

### 5. Commitlint

**Objetivo**: Padronizar mensagens de commit

**Configuração**: `commitlint.config.js`

- Conventional Commits
- Automático via git hook

Formato:

```
type(scope?): subject

feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
```

### 6. Lefthook

**Objetivo**: Git hooks eficientes

**Configuração**: `lefthook.yml`

**Pre-commit**:

- Lint staged files
- Format staged files
- Type check
- Test related files

**Commit-msg**:

- Validate commit message

**Pre-push**:

- Run full test suite
- Run quality check

## 📜 Scripts Disponíveis

### Quality Checks

```bash
# Check completo (type + lint + format + test)
pnpm quality

# Check completo com coverage e audit
pnpm quality:full

# Apenas type checking
pnpm type-check

# Apenas linting
pnpm lint
pnpm lint:fix

# Apenas formatação
pnpm format
pnpm format:check
```

### Security & Dependencies

```bash
# Audit de segurança
pnpm security:audit

# Check de segurança com output JSON
pnpm security:check

# Verificar dependências desatualizadas
pnpm deps:outdated

# Atualizar dependências (interativo)
pnpm deps:update
```

### Testing

```bash
# Rodar testes
pnpm test

# Watch mode
pnpm test:watch

# Com coverage
pnpm test:coverage
```

### Script Completo de Quality Check

```bash
# Rodar o script bash completo
./scripts/quality-check.sh
```

Este script executa:

1. ✅ Security audit
2. ✅ Type checking
3. ✅ Linting
4. ✅ Format check
5. ✅ Tests with coverage
6. ✅ Check outdated dependencies

## 🎣 Git Hooks Automáticos

### Pre-commit

Executado automaticamente antes de cada commit:

1. **Lint** - Fix automático de arquivos staged
2. **Format** - Format automático de arquivos staged
3. **Type Check** - Verifica tipos
4. **Test** - Testa arquivos relacionados

### Commit-msg

Valida formato da mensagem de commit.

### Pre-push

Executado antes de push:

1. **Tests** - Test suite completo
2. **Quality Check** - Verificação completa

## 🚀 CI/CD Pipeline

### GitHub Actions

**Arquivo**: `.github/workflows/quality-check.yml`

**Triggers**:

- Push em `main` e `develop`
- Pull requests para `main` e `develop`

**Jobs**:

1. ✅ Setup environment (Node + pnpm)
2. ✅ Install dependencies
3. ✅ Type check
4. ✅ Lint
5. ✅ Format check
6. ✅ Run tests with coverage
7. ✅ Upload coverage to Codecov

## 📊 SonarQube Integration

**Arquivo**: `sonar-project.properties`

Para rodar análise local:

```bash
# Instalar SonarQube scanner
npm install -g sonarqube-scanner

# Rodar análise
sonar-scanner
```

## ✅ Boas Práticas

### Antes de Commitar

1. Rode os testes:

   ```bash
   pnpm test
   ```

2. Verifique a qualidade:

   ```bash
   pnpm quality
   ```

3. Os git hooks vão rodar automaticamente!

### Antes de Push

1. Rode a verificação completa:
   ```bash
   pnpm quality:full
   ```
   ou
   ```bash
   ./scripts/quality-check.sh
   ```

### Durante Desenvolvimento

1. Use TypeScript rigorosamente - não use `any`
2. Escreva testes para novas features
3. Mantenha coverage acima de 80%
4. Siga o padrão de commits (Conventional Commits)
5. Rode `pnpm lint:fix` e `pnpm format` regularmente

### Pull Requests

1. ✅ Todos os checks do CI devem passar
2. ✅ Coverage não deve diminuir
3. ✅ Code review obrigatório
4. ✅ Commits devem seguir padrão

## 🔧 Troubleshooting

### ESLint não está funcionando

```bash
# Limpar cache
rm -rf node_modules/.cache

# Reinstalar
pnpm install
```

### Prettier conflitando com ESLint

A configuração já está integrada. Se houver conflito:

```bash
# Verificar configuração
pnpm lint:fix && pnpm format
```

### Git hooks não executam

```bash
# Reinstalar lefthook
pnpm lefthook install

# Verificar instalação
lefthook run pre-commit
```

### Tests failing

```bash
# Limpar cache do Jest
pnpm test --clearCache

# Rodar com mais detalhes
pnpm test --verbose
```

## 📈 Métricas de Qualidade

### Code Coverage

- **Target**: > 80%
- **Atual**: Verifique com `pnpm test:coverage`
- **Report**: `coverage/lcov-report/index.html`

### Type Safety

- **Strict mode**: ✅ Enabled
- **No any**: Evitar ao máximo

### Linting

- **Zero warnings**: Objetivo
- **Zero errors**: Obrigatório

### Security

- **Vulnerabilidades**: 0 critical/high
- **Audit regular**: Mensal

## 🎯 Checklist para PRs

- [ ] Todos os testes passam
- [ ] Coverage mantém/aumenta
- [ ] Sem erros de lint
- [ ] Code formatado
- [ ] Type check passa
- [ ] Commit messages seguem padrão
- [ ] CI pipeline verde
- [ ] Code review aprovado

## 📚 Recursos Adicionais

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

---

**Última atualização**: 23 de Dezembro de 2025
