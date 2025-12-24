export interface Appointment {
  id: string;
  userId: string; // Multi-tenancy support
  title: string;
  description?: string;
  date: string; // ISO date string
  time: string; // HH:mm format
  location?: string;
  type: 'consultation' | 'exam' | 'procedure' | 'followup' | 'other';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateAppointmentInput = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAppointmentInput = Partial<
  Omit<Appointment, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
>;
