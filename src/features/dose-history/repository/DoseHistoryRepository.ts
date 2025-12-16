import type {
    DoseHistory,
    CreateDoseHistoryInput,
    UpdateDoseHistoryInput,
    AdherenceStats,
    DoseHistoryFilter
} from '../model';

export interface IDoseHistoryRepository {
    // CRUD operations
    getAll(filter: DoseHistoryFilter): Promise<DoseHistory[]>;
    getById(id: string): Promise<DoseHistory | null>;
    create(input: CreateDoseHistoryInput): Promise<DoseHistory>;
    update(id: string, input: UpdateDoseHistoryInput): Promise<DoseHistory>;
    delete(id: string): Promise<void>;

    // Specific queries
    getByMedication(medicationId: string, userId: string): Promise<DoseHistory[]>;
    getByDateRange(userId: string, startDate: Date, endDate: Date): Promise<DoseHistory[]>;
    getPendingDoses(userId: string): Promise<DoseHistory[]>;

    // Analytics
    getAdherenceStats(filter: DoseHistoryFilter): Promise<AdherenceStats>;
}
