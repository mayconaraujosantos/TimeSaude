import { AsyncStorageAdapter } from '@/lib/storage/AsyncStorageAdapter';
import type { Medication } from '../model';
import type { IMedicationRepository } from './MedicationRepository';

const STORAGE_KEY = '@timesaude:medications';

/**
 * Implementação com AsyncStorage (dados locais)
 */
export class LocalMedicationRepository implements IMedicationRepository {
    async getAll(): Promise<Medication[]> {
        const medications = await AsyncStorageAdapter.getItem<Medication[]>(STORAGE_KEY);
        return medications ?? [];
    }

    async getById(id: string): Promise<Medication | null> {
        const medications = await this.getAll();
        return medications.find((med) => med.id === id) ?? null;
    }

    async save(medication: Medication): Promise<void> {
        const medications = await this.getAll();
        medications.push(medication);
        await AsyncStorageAdapter.setItem(STORAGE_KEY, medications);
    }

    async update(id: string, updates: Partial<Medication>): Promise<void> {
        const medications = await this.getAll();
        const index = medications.findIndex((med) => med.id === id);

        if (index === -1) {
            throw new Error(`Medication with id ${id} not found`);
        }

        medications[index] = { ...medications[index], ...updates };
        await AsyncStorageAdapter.setItem(STORAGE_KEY, medications);
    }

    async delete(id: string): Promise<void> {
        const medications = await this.getAll();
        const filtered = medications.filter((med) => med.id !== id);
        await AsyncStorageAdapter.setItem(STORAGE_KEY, filtered);
    }
}
