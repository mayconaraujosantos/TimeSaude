// Medication domain types and entities

export type MedicationForm =
  | 'tablet'
  | 'capsule'
  | 'syrup'
  | 'injection'
  | 'drops'
  | 'cream'
  | 'spray'
  | 'patch'
  | 'other';
export type DosageUnit =
  | 'mg'
  | 'ml'
  | 'g'
  | 'mcg'
  | 'unit'
  | 'drop'
  | 'puff'
  | 'tablet'
  | 'capsule';

export interface Medication {
  id: string;
  userId: string; // Multi-tenancy support
  name: string;
  dosage: string;
  dosageUnit: DosageUnit;
  form: MedicationForm;
  purpose?: string; // Para que serve o medicamento
  frequency: string; // Legacy field - será migrado para MedicationSchedule
  startDate: Date;
  endDate?: Date;
  notes?: string;
  imageUri?: string; // URI da imagem do medicamento
  colorCode: string; // Cor para UI (ex: "#3B82F6")
  icon: string; // Ícone (ex: "pill", "syringe", "drops")
  isActive: boolean; // Medicamento ativo/arquivado
  createdAt: Date;
  updatedAt: Date;
}

export type CreateMedicationInput = Omit<Medication, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMedicationInput = Partial<
  Omit<Medication, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
>;

export interface MedicationSchedule {
  id: string;
  medicationId: string;
  time: string;
  days: number[]; // 0-6 (Sunday-Saturday)
}
