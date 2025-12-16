import type { Appointment, CreateAppointmentInput, UpdateAppointmentInput } from '../model';

export interface AppointmentRepository {
    getAll(): Promise<Appointment[]>;
    getById(id: string): Promise<Appointment | null>;
    getUpcoming(): Promise<Appointment[]>;
    create(appointment: CreateAppointmentInput): Promise<Appointment>;
    update(id: string, appointment: UpdateAppointmentInput): Promise<Appointment>;
    delete(id: string): Promise<void>;
}
