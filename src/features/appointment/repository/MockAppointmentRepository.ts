import type { Appointment, CreateAppointmentInput, UpdateAppointmentInput } from '../model';
import type { AppointmentRepository } from './AppointmentRepository';

export class MockAppointmentRepository implements AppointmentRepository {
    private appointments: Appointment[] = [
        {
            id: '1',
            userId: '1', // Mock user
            title: 'Mammogram',
            description: 'Schedule the test',
            date: '2025-12-15',
            time: '10:00',
            location: 'Women\'s Health Clinic',
            type: 'exam',
            status: 'scheduled',
            notes: 'Annual screening mammogram',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '2',
            userId: '1',
            title: 'Cardiology Consultation',
            description: 'Follow-up appointment',
            date: '2025-12-20',
            time: '14:30',
            location: 'Heart Center',
            type: 'consultation',
            status: 'scheduled',
            notes: 'Bring previous exam results',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '3',
            userId: '1',
            title: 'Blood Test',
            description: 'Routine blood work',
            date: '2025-12-10',
            time: '08:00',
            location: 'Lab Services',
            type: 'exam',
            status: 'scheduled',
            notes: 'Fasting required',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    async getAll(): Promise<Appointment[]> {
        return [...this.appointments];
    }

    async getById(id: string): Promise<Appointment | null> {
        return this.appointments.find(appt => appt.id === id) || null;
    }

    async getUpcoming(): Promise<Appointment[]> {
        const now = new Date();
        return this.appointments
            .filter(appt => {
                const apptDate = new Date(appt.date);
                return apptDate >= now && appt.status === 'scheduled';
            })
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateA.getTime() - dateB.getTime();
            });
    }

    async create(input: CreateAppointmentInput): Promise<Appointment> {
        const newAppointment: Appointment = {
            id: Date.now().toString(),
            ...input,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.appointments.push(newAppointment);
        return newAppointment;
    }

    async update(id: string, updates: UpdateAppointmentInput): Promise<Appointment> {
        const index = this.appointments.findIndex(appt => appt.id === id);
        if (index === -1) {
            throw new Error('Appointment not found');
        }

        this.appointments[index] = {
            ...this.appointments[index],
            ...updates,
            id,
            updatedAt: new Date().toISOString(),
        } as Appointment;

        return this.appointments[index];
    }

    async delete(id: string): Promise<void> {
        const index = this.appointments.findIndex(appt => appt.id === id);
        if (index === -1) {
            throw new Error('Appointment not found');
        }
        this.appointments.splice(index, 1);
    }
}
