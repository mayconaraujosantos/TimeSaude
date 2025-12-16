import { useState, useEffect } from 'react';
import { getMedicationRepository } from '../repository';
import { medicationCache } from '../cache';
import type { Medication } from '../model';

/**
 * Hook customizado para gerenciar medications
 * Abstrai a lógica de acesso aos dados com cache automático
 */
export function useMedications() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    const repository = getMedicationRepository();

    const loadMedications = async (forceRefresh = false) => {
        try {
            setLoading(true);
            setError(null);

            // Se forceRefresh, invalida cache primeiro
            if (forceRefresh) {
                console.log('[useMedications] Force refresh - invalidating cache');
                await medicationCache.invalidate('medications:all');
            }

            const data = await repository.getAll();
            setMedications(data);

            // Verifica se está em modo offline
            if ('isOfflineMode' in repository) {
                setIsOfflineMode((repository as any).isOfflineMode);
            }
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const addMedication = async (medication: Medication) => {
        try {
            await repository.save(medication);
            await loadMedications(); // Recarrega a lista
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to add medication'));
            throw err;
        }
    };

    const updateMedication = async (id: string, updates: Partial<Medication>) => {
        try {
            console.log('[useMedications] Updating medication:', id, updates);
            await repository.update(id, updates);
            console.log('[useMedications] Update successful, reloading list...');
            await loadMedications();
            console.log('[useMedications] List reloaded, total medications:', medications.length);
        } catch (err) {
            console.error('[useMedications] Update failed:', err);
            setError(err instanceof Error ? err : new Error('Failed to update medication'));
            throw err;
        }
    };

    const deleteMedication = async (id: string) => {
        try {
            await repository.delete(id);
            await loadMedications();
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete medication'));
            throw err;
        }
    };

    useEffect(() => {
        loadMedications();
    }, []);

    return {
        medications,
        loading,
        error,
        isOfflineMode,
        refresh: () => loadMedications(true), // Force refresh invalida cache
        addMedication,
        updateMedication,
        deleteMedication,
    };
}
