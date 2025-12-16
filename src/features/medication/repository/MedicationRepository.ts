import type { Medication } from '../model';

/**
 * Interface de repositório - abstração da fonte de dados
 * Permite trocar implementação sem afetar o código que usa
 */
export interface IMedicationRepository {
    getAll(): Promise<Medication[]>;
    getById(id: string): Promise<Medication | null>;
    save(medication: Medication): Promise<void>;
    update(id: string, medication: Partial<Medication>): Promise<void>;
    delete(id: string): Promise<void>;
}
