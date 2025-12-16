import type { Medication } from '../model';
import type { IMedicationRepository } from './MedicationRepository';
import { medicationCache } from '../cache/MedicationCache';
import { getFallbackMedications } from './fallbackData';

/**
 * Implementação com API REST (Node-RED) + Cache
 * Conecta com endpoints do Node-RED para gerenciar medications
 * Usa cache em duas camadas (memória + AsyncStorage) para performance
 */
export class ApiMedicationRepository implements IMedicationRepository {
    private baseUrl: string;
    private static CACHE_KEY_ALL = 'medications:all';
    private static CACHE_TTL = 5 * 60 * 1000; // 5 minutos
    private _isOfflineMode = false;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        console.log('[ApiRepository] Initialized with baseUrl:', baseUrl);
    }

    /**
     * Verifica se está em modo offline (usando dados de fallback)
     */
    public get isOfflineMode(): boolean {
        return this._isOfflineMode;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error');
            console.error('[ApiRepository] Error:', response.status, errorText);
            throw new Error(`API Error ${response.status}: ${errorText}`);
        }
        return response.json();
    }

    async getAll(): Promise<Medication[]> {
        try {
            // 1. Tenta buscar do cache primeiro
            const cached = await medicationCache.get<Medication[]>(
                ApiMedicationRepository.CACHE_KEY_ALL
            );

            if (cached) {
                console.log('[ApiRepository] Using cached medications:', cached.length);
                this._isOfflineMode = false;
                return cached;
            }

            // 2. Se não tem cache, busca da API
            console.log('[ApiRepository] Fetching all medications from:', `${this.baseUrl}/medications`);

            const response = await fetch(`${this.baseUrl}/medications`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }).catch((err) => {
                console.error('[ApiRepository] Network error:', err.message);
                return null; // Retorna null para tratar como offline
            });

            // Se não conseguiu fazer a requisição ou houve erro
            if (!response || !response.ok) {
                console.warn('[ApiRepository] API unavailable, using fallback data');
                this._isOfflineMode = true;
                const fallbackData = getFallbackMedications();

                // Salva fallback no cache para uso posterior
                await medicationCache.set(
                    ApiMedicationRepository.CACHE_KEY_ALL,
                    fallbackData,
                    ApiMedicationRepository.CACHE_TTL
                );

                return fallbackData;
            }

            const data = await this.handleResponse<Medication[]>(response);
            console.log('[ApiRepository] ✓ Fetched', data.length, 'medications from API');
            this._isOfflineMode = false;

            // 3. Armazena no cache
            await medicationCache.set(
                ApiMedicationRepository.CACHE_KEY_ALL,
                data,
                ApiMedicationRepository.CACHE_TTL
            );

            return data;
        } catch (error) {
            console.error('[ApiRepository] Failed to fetch medications:', error);
            console.warn('[ApiRepository] Using fallback data due to error');
            this._isOfflineMode = true;
            return getFallbackMedications();
        }
    }

    async getById(id: string): Promise<Medication | null> {
        try {
            console.log('[ApiRepository] Fetching medication:', id);
            const response = await fetch(`${this.baseUrl}/medications/${id}`);
            if (response.status === 404) {
                console.log('[ApiRepository] Medication not found:', id);
                return null;
            }
            return await this.handleResponse<Medication>(response);
        } catch (error) {
            console.error('[ApiRepository] Failed to fetch medication:', error);
            throw error;
        }
    }

    async save(medication: Medication): Promise<void> {
        try {
            console.log('[ApiRepository] Saving medication:', medication.name);
            const response = await fetch(`${this.baseUrl}/medications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medication),
            });
            await this.handleResponse<void>(response);

            // Invalida cache após criar
            await medicationCache.invalidate(ApiMedicationRepository.CACHE_KEY_ALL);
            console.log('[ApiRepository] Medication saved successfully (cache invalidated)');
        } catch (error) {
            console.error('[ApiRepository] Failed to save medication:', error);
            throw error;
        }
    }

    async update(id: string, updates: Partial<Medication>): Promise<void> {
        try {
            console.log('[ApiRepository] Updating medication:', id, updates);
            const response = await fetch(`${this.baseUrl}/medications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            await this.handleResponse<void>(response);

            // Invalida cache após atualizar
            await medicationCache.invalidate(ApiMedicationRepository.CACHE_KEY_ALL);
            console.log('[ApiRepository] Medication updated successfully (cache invalidated)');
        } catch (error) {
            console.error('[ApiRepository] Failed to update medication:', error);
            throw error;
        }
    }

    async delete(id: string): Promise<void> {
        try {
            console.log('[ApiRepository] Deleting medication:', id);
            const response = await fetch(`${this.baseUrl}/medications/${id}`, {
                method: 'DELETE',
            });
            await this.handleResponse<void>(response);

            // Invalida cache após deletar
            await medicationCache.invalidate(ApiMedicationRepository.CACHE_KEY_ALL);
            console.log('[ApiRepository] Medication deleted successfully (cache invalidated)');
        } catch (error) {
            console.error('[ApiRepository] Failed to delete medication:', error);
            throw error;
        }
    }
}
