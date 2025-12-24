import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

/**
 * Sistema de cache em duas camadas (memória + AsyncStorage)
 * para melhorar performance do carregamento de medicamentos
 */
export class MedicationCache {
  private static CACHE_KEY = '@timesaude:medications_cache';
  private static DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos

  // Cache em memória (mais rápido)
  private memoryCache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Busca dados do cache (memória primeiro, depois AsyncStorage)
   */
  async get<T>(key: string): Promise<T | null> {
    // 1. Tenta memória primeiro (mais rápido)
    const memEntry = this.memoryCache.get(key);
    if (memEntry && Date.now() < memEntry.expiresAt) {
      console.log('[Cache] HIT (memory):', key);
      return memEntry.data as T;
    }

    // 2. Remove entrada expirada da memória
    if (memEntry) {
      this.memoryCache.delete(key);
    }

    // 3. Tenta AsyncStorage
    try {
      const stored = await AsyncStorage.getItem(`${MedicationCache.CACHE_KEY}:${key}`);
      if (stored) {
        const entry: CacheEntry<T> = JSON.parse(stored);

        // Verifica expiração
        if (Date.now() < entry.expiresAt) {
          console.log('[Cache] HIT (storage):', key);
          // Restaura para memória
          this.memoryCache.set(key, entry);
          return entry.data;
        } else {
          // Expirado, remove
          console.log('[Cache] EXPIRED:', key);
          await AsyncStorage.removeItem(`${MedicationCache.CACHE_KEY}:${key}`);
        }
      }
    } catch (error) {
      console.error('[Cache] Error reading from storage:', error);
    }

    console.log('[Cache] MISS:', key);
    return null;
  }

  /**
   * Armazena dados no cache (memória + AsyncStorage)
   */
  async set<T>(key: string, data: T, ttl: number = MedicationCache.DEFAULT_TTL): Promise<void> {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    };

    // Salva em memória (síncrono)
    this.memoryCache.set(key, entry);

    // Salva em AsyncStorage (assíncrono, não bloqueia)
    try {
      await AsyncStorage.setItem(`${MedicationCache.CACHE_KEY}:${key}`, JSON.stringify(entry));
      console.log('[Cache] SET:', key, `(TTL: ${ttl / 1000}s)`);
    } catch (error) {
      console.error('[Cache] Error writing to storage:', error);
    }
  }

  /**
   * Invalida cache específico
   */
  async invalidate(key: string): Promise<void> {
    this.memoryCache.delete(key);
    try {
      await AsyncStorage.removeItem(`${MedicationCache.CACHE_KEY}:${key}`);
      console.log('[Cache] INVALIDATED:', key);
    } catch (error) {
      console.error('[Cache] Error invalidating:', error);
    }
  }

  /**
   * Limpa todo o cache
   */
  async clear(): Promise<void> {
    this.memoryCache.clear();
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(k => k.startsWith(MedicationCache.CACHE_KEY));
      await AsyncStorage.multiRemove(cacheKeys);
      console.log('[Cache] CLEARED:', cacheKeys.length, 'entries');
    } catch (error) {
      console.error('[Cache] Error clearing:', error);
    }
  }

  /**
   * Retorna estatísticas do cache
   */
  getStats() {
    const memorySize = this.memoryCache.size;
    const memoryKeys = Array.from(this.memoryCache.keys());

    return {
      memorySize,
      memoryKeys,
      timestamp: Date.now(),
    };
  }
}

// Singleton global
export const medicationCache = new MedicationCache();
