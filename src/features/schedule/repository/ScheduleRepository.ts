import type {
  MedicationSchedule,
  DoseTime,
  CreateScheduleInput,
  CreateDoseTimeInput,
  UpdateScheduleInput,
  UpdateDoseTimeInput,
  CreateScheduleWithTimesInput,
} from '../model';

export interface IScheduleRepository {
  // Schedule CRUD
  getAllSchedules(medicationId: string): Promise<MedicationSchedule[]>;
  getScheduleById(id: string): Promise<MedicationSchedule | null>;
  createSchedule(input: CreateScheduleInput): Promise<MedicationSchedule>;
  updateSchedule(id: string, input: UpdateScheduleInput): Promise<MedicationSchedule>;
  deleteSchedule(id: string): Promise<void>;

  // DoseTime CRUD
  getDoseTimes(scheduleId: string): Promise<DoseTime[]>;
  createDoseTime(input: CreateDoseTimeInput): Promise<DoseTime>;
  updateDoseTime(id: string, input: UpdateDoseTimeInput): Promise<DoseTime>;
  deleteDoseTime(id: string): Promise<void>;

  // Helper: Create schedule + dose times together
  createScheduleWithTimes(input: CreateScheduleWithTimesInput): Promise<{
    schedule: MedicationSchedule;
    doseTimes: DoseTime[];
  }>;
}
