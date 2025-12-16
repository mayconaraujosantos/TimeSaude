// Dose History domain models - Track medication adherence

export type DoseStatus = 'scheduled' | 'taken' | 'missed' | 'skipped' | 'late';

/**
 * Histórico completo de cada dose (tomada, perdida, atrasada)
 * Permite gerar relatórios de aderência e análises médicas
 */
export interface DoseHistory {
    id: string;
    userId: string;
    medicationId: string;
    scheduleId: string;
    scheduledTime: Date; // Quando deveria tomar
    takenTime?: Date; // Quando realmente tomou (null se missed/skipped)
    status: DoseStatus;
    notes?: string; // Observações do paciente
    lateMinutes?: number; // Calculado automaticamente: takenTime - scheduledTime
    createdAt: Date;
}

export type CreateDoseHistoryInput = Omit<DoseHistory, 'id' | 'lateMinutes' | 'createdAt'>;
export type UpdateDoseHistoryInput = Partial<Omit<DoseHistory, 'id' | 'userId' | 'medicationId' | 'scheduleId' | 'scheduledTime' | 'createdAt'>>;

/**
 * Estatísticas de aderência
 */
export interface AdherenceStats {
    totalDoses: number;
    takenDoses: number;
    missedDoses: number;
    skippedDoses: number;
    lateDoses: number;
    adherencePercentage: number; // (takenDoses / totalDoses) * 100
    averageLateMinutes: number;
}

/**
 * Filtros para buscar histórico
 */
export interface DoseHistoryFilter {
    userId: string;
    medicationId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: DoseStatus[];
}
