// Schedule domain models - Advanced scheduling system

export type FrequencyType = 'daily' | 'weekly' | 'as_needed' | 'specific_days';
export type MealRelation = 'before' | 'after' | 'with' | 'anytime';

/**
 * Representa o agendamento completo de um medicamento
 * Substitui o antigo campo "frequency: string" por uma estrutura detalhada
 */
export interface MedicationSchedule {
  id: string;
  medicationId: string;
  userId: string;
  frequency: FrequencyType;
  timesPerDay: number; // Quantas vezes por dia
  daysOfWeek?: number[]; // Para frequency='weekly' ou 'specific_days' (0=Dom, 6=Sáb)
  startDate: Date;
  endDate?: Date; // null = tratamento contínuo
  isRecurring: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Horários específicos de cada dose do dia
 * Exemplo: Tomar 2x/dia → 2 registros DoseTime (08:00 e 20:00)
 */
export interface DoseTime {
  id: string;
  scheduleId: string;
  time: string; // Formato "HH:mm" (ex: "08:00")
  mealRelation?: MealRelation; // Relação com refeição
  reminderOffsetMinutes: number; // Lembrete X minutos antes (padrão: 15)
  createdAt: Date;
}

export type CreateScheduleInput = Omit<MedicationSchedule, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateScheduleInput = Partial<
  Omit<MedicationSchedule, 'id' | 'medicationId' | 'userId' | 'createdAt' | 'updatedAt'>
>;

export type CreateDoseTimeInput = Omit<DoseTime, 'id' | 'createdAt'>;
export type UpdateDoseTimeInput = Partial<Omit<DoseTime, 'id' | 'scheduleId' | 'createdAt'>>;

/**
 * Helper type para criar schedule + dose times juntos
 */
export interface CreateScheduleWithTimesInput {
  schedule: CreateScheduleInput;
  doseTimes: Omit<CreateDoseTimeInput, 'scheduleId'>[];
}
