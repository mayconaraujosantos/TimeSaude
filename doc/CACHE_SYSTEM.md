# 🚀 Sistema de Cache de Medicamentos

## Visão Geral

Sistema de cache em **duas camadas** implementado para melhorar drasticamente a
performance do carregamento da lista de medicamentos.

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                   useMedications Hook                    │
│                  (Interface Principal)                   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              ApiMedicationRepository                     │
│           (Gerencia API + Invalidação)                  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
         ┌─────────────────────────────┐
         │    MedicationCache           │
         │   (Sistema de Cache)         │
         └─────────────┬───────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌──────────────┐            ┌──────────────────┐
│ Memory Cache │            │  AsyncStorage    │
│  (Rápido)    │            │  (Persistente)   │
└──────────────┘            └──────────────────┘
```

## Camadas de Cache

### 1. Memory Cache (Memória RAM)

- ✅ **Mais rápido**: Acesso instantâneo
- ✅ **Volátil**: Limpo ao fechar app
- ✅ **Primeira verificação**: Sempre checado primeiro
- ⏱️ **Latência**: < 1ms

### 2. AsyncStorage (Armazenamento Persistente)

- ✅ **Persistente**: Sobrevive fechamento do app
- ✅ **Fallback**: Se memory cache falhar
- ✅ **Restauração**: Carrega de volta para memória
- ⏱️ **Latência**: ~10-50ms

## Fluxo de Operação

### Leitura (GET)

```
1. useMedications.loadMedications()
   ↓
2. ApiRepository.getAll()
   ↓
3. MedicationCache.get('medications:all')
   ↓
4a. ✅ Memory Cache HIT → Retorna imediatamente
4b. ❌ Memory Cache MISS → Tenta AsyncStorage
   ↓
5a. ✅ AsyncStorage HIT → Restaura para Memory + Retorna
5b. ❌ AsyncStorage MISS → Busca da API
   ↓
6. Fetch da API (http://localhost:1880/api/medications)
   ↓
7. Armazena em Cache (Memory + AsyncStorage)
   ↓
8. Retorna dados
```

### Escrita (POST/PUT/DELETE)

```
1. ApiRepository.save/update/delete()
   ↓
2. Executa operação na API
   ↓
3. ✅ Sucesso → Invalida cache
   ↓
4. medicationCache.invalidate('medications:all')
   ↓
5. Remove de Memory Cache
   ↓
6. Remove de AsyncStorage
   ↓
7. Próxima leitura → Cache MISS → Busca API atualizada
```

## Configuração

### TTL (Time To Live)

```typescript
// Em ApiMedicationRepository.ts
private static CACHE_TTL = 5 * 60 * 1000; // 5 minutos
```

**Ajustar conforme necessidade:**

- Dados que mudam raramente: `15 * 60 * 1000` (15 min)
- Dados que mudam frequentemente: `2 * 60 * 1000` (2 min)
- Desenvolvimento/debug: `30 * 1000` (30 seg)

### Chave do Cache

```typescript
private static CACHE_KEY_ALL = 'medications:all';
```

## Uso

### Carregamento Automático (com cache)

```typescript
const { medications, loading } = useMedications();

// Primeira vez: API + salva cache
// Próximas vezes: Retorna do cache (instantâneo)
```

### Force Refresh (ignora cache)

```typescript
const { refresh } = useMedications();

// Ao fazer pull-to-refresh
<ScrollView
  refreshControl={
    <RefreshControl refreshing={loading} onRefresh={refresh} />
  }
>
```

### Invalidação Automática

```typescript
// Ao adicionar medicamento
await addMedication(newMed);
// Cache automaticamente invalidado
// Próxima leitura busca dados atualizados

// Ao editar
await updateMedication(id, updates);
// Cache invalidado

// Ao deletar
await deleteMedication(id);
// Cache invalidado
```

## Debug

### Visualizar Status do Cache

```typescript
import { CacheDebugger } from '@/features/medication/components/CacheDebugger';

// Em desenvolvimento, adicione ao seu componente:
<CacheDebugger />
```

### Logs no Console

```
[Cache] MISS: medications:all
[ApiRepository] Fetching all medications from: http://localhost:1880/api/medications
[ApiRepository] Fetched 100 medications
[Cache] SET: medications:all (TTL: 300s)

// Próxima requisição:
[Cache] HIT (memory): medications:all
[ApiRepository] Using cached medications: 100
```

### Limpar Cache Manualmente

```typescript
import { medicationCache } from '@/features/medication/cache';

// Limpar tudo
await medicationCache.clear();

// Limpar apenas medications
await medicationCache.invalidate('medications:all');
```

## Performance

### Antes do Cache

```
┌──────────────────────────────────────┐
│ Cada carregamento:                   │
│ • API Request: ~200-500ms            │
│ • Network Latency: ~50-100ms        │
│ • Parse JSON: ~10-20ms               │
│ • Total: ~260-620ms                  │
└──────────────────────────────────────┘
```

### Depois do Cache (Memory Hit)

```
┌──────────────────────────────────────┐
│ Carregamento subsequente:            │
│ • Memory Cache: < 1ms                │
│ • Total: ~1-5ms                      │
│ • Melhoria: ~99% mais rápido 🚀      │
└──────────────────────────────────────┘
```

### Depois do Cache (AsyncStorage Hit)

```
┌──────────────────────────────────────┐
│ Após reiniciar app:                  │
│ • AsyncStorage Read: ~10-50ms        │
│ • Parse JSON: ~5-10ms                │
│ • Total: ~15-60ms                    │
│ • Melhoria: ~90% mais rápido 🎯      │
└──────────────────────────────────────┘
```

## Benefícios

### 1. UX Melhorada

- ✅ Carregamento instantâneo em navegações subsequentes
- ✅ Menos spinners/loading states
- ✅ App mais responsivo

### 2. Economia de Recursos

- ✅ Menos requisições à API
- ✅ Menos consumo de dados móveis
- ✅ Menos carga no servidor

### 3. Offline First

- ✅ Dados disponíveis mesmo offline (se cache válido)
- ✅ Melhor experiência em conexões ruins

### 4. Escalabilidade

- ✅ Com 100 medicamentos: ~20KB JSON
- ✅ Com 1000 medicamentos: ~200KB JSON
- ✅ Cache suporta tranquilamente

## Limitações

### Tamanho do AsyncStorage

- Limite teórico: ~6MB (iOS) / ~10MB (Android)
- Tamanho atual: ~20KB (100 medicamentos)
- Headroom: 99.7% disponível

### Sincronização

- Cache pode ficar desatualizado se API mudar fora do app
- Solução: TTL automático (5 min) + pull-to-refresh

### Memória

- Memory cache consome RAM
- Com 100 medicamentos: ~50-100KB RAM
- Insignificante para apps modernos

## Monitoramento

### Métricas Importantes

```typescript
const stats = medicationCache.getStats();

console.log({
  memorySize: stats.memorySize, // Quantos itens em memória
  memoryKeys: stats.memoryKeys, // Quais chaves
  timestamp: stats.timestamp, // Quando consultado
});
```

### Hit Rate Esperado

- Primeira navegação: 0% (cache miss)
- Navegações seguintes: ~95-99% (cache hit)
- Após 5 minutos: 0% (TTL expirado)
- Após invalidação: 0% (update/delete)

## Próximos Passos

### Possíveis Melhorias

1. **Cache Individual**: Cache por ID do medicamento
2. **Background Sync**: Atualizar cache em background
3. **Prefetch**: Carregar dados antecipadamente
4. **Compression**: Comprimir JSON no AsyncStorage
5. **Estratégia LRU**: Limitar tamanho do cache

### Migração para Produção

1. Remover `CacheDebugger` das telas
2. Ajustar TTL conforme uso real
3. Adicionar telemetria de hit rate
4. Implementar invalidação por server-sent events (SSE)

## Troubleshooting

### Cache não está funcionando

```bash
# Verificar logs
adb logcat | grep -E "Cache|ApiRepository"

# Limpar cache e testar
await medicationCache.clear();
```

### Dados desatualizados

```typescript
// Force refresh para ignorar cache
const { refresh } = useMedications();
await refresh();
```

### AsyncStorage cheio

```bash
# Limpar todos os dados do app (desenvolvimento)
adb shell pm clear com.timesaude.medicationreminder
```

---

**📊 Com cache implementado, o app carrega 100 medicamentos em ~1-5ms ao invés
de ~300-500ms!**
