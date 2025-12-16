# Estratégia de Dados - TimeSaúde

## Arquitetura Implementada

### 1. Repository Pattern

Abstração completa da fonte de dados através de interfaces.

```typescript
// Interface comum para todas as implementações
interface IMedicationRepository {
  getAll(): Promise<Medication[]>;
  save(medication: Medication): Promise<void>;
  // ...
}
```

### 2. Múltiplas Implementações

#### MockMedicationRepository

- **Quando usar**: Desenvolvimento e testes
- **Vantagens**: Não depende de rede/storage, dados previsíveis
- **Dados**: Hardcoded no código

#### LocalMedicationRepository

- **Quando usar**: App offline-first
- **Vantagens**: Dados persistem entre sessões
- **Storage**: AsyncStorage (local do dispositivo)

#### ApiMedicationRepository

- **Quando usar**: Quando tiver backend
- **Vantagens**: Dados sincronizados entre dispositivos
- **Storage**: Servidor remoto

### 3. Feature Flags (`app.config.ts`)

```typescript
features: {
  useMockData: __DEV__,      // Dev: mock, Prod: real data
  useLocalStorage: true,     // Usar AsyncStorage
  useApi: false,             // Usar API (quando disponível)
}
```

### 4. Como Trocar de Fonte

#### Opção 1: Feature Flags (Recomendado)

Edite `src/config/app.config.ts`:

```typescript
// Para usar dados reais locais
features: {
  useMockData: false,
  useLocalStorage: true,
  useApi: false,
}

// Para usar API
features: {
  useMockData: false,
  useLocalStorage: false,
  useApi: true,
}
```

#### Opção 2: Variáveis de Ambiente

```bash
# .env
EXPO_PUBLIC_USE_MOCK=false
EXPO_PUBLIC_API_URL=https://api.timesaude.com
```

### 5. Uso nos Componentes

```typescript
import { useMedications } from '@/features/medication/hooks/useMedications';

function MedicationList() {
  const { medications, loading, addMedication } = useMedications();

  // O componente não sabe de onde vem os dados!
  // Pode ser mock, local storage ou API - transparente
}
```

## Benefícios

✅ **Separation of Concerns** - Lógica de dados separada da UI ✅
**Testabilidade** - Fácil mockar em testes ✅ **Flexibilidade** - Troca de fonte
sem reescrever código ✅ **Escalabilidade** - Adicionar novas fontes é simples
✅ **Type-Safe** - TypeScript garante contratos ✅ **Offline-First** - Funciona
sem conexão

## Próximos Passos

1. **Sync Strategy**: Implementar sincronização Local ↔ API
2. **Cache Layer**: Adicionar cache com React Query
3. **Optimistic Updates**: Melhorar UX com updates otimistas
4. **Error Handling**: Retry logic e fallbacks
