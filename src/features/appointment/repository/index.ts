import type { AppointmentRepository } from './AppointmentRepository';
import { MockAppointmentRepository } from './MockAppointmentRepository';

let repositoryInstance: AppointmentRepository | null = null;

export function getAppointmentRepository(): AppointmentRepository {
    if (!repositoryInstance) {
        repositoryInstance = new MockAppointmentRepository();
    }
    return repositoryInstance;
}
