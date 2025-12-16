import { useState, useEffect, useCallback } from 'react';
import type { Appointment, CreateAppointmentInput, UpdateAppointmentInput } from '../model';
import { getAppointmentRepository } from '../repository';

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const repository = getAppointmentRepository();

    const loadAppointments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await repository.getAll();
            setAppointments(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [repository]);

    const getUpcomingAppointments = useCallback(async () => {
        try {
            return await repository.getUpcoming();
        } catch (err) {
            setError(err as Error);
            return [];
        }
    }, [repository]);

    const addAppointment = useCallback(async (input: CreateAppointmentInput) => {
        try {
            const newAppointment = await repository.create(input);
            setAppointments(prev => [...prev, newAppointment]);
            return newAppointment;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, [repository]);

    const updateAppointment = useCallback(async (id: string, updates: UpdateAppointmentInput) => {
        try {
            const updated = await repository.update(id, updates);
            setAppointments(prev => prev.map(appt => appt.id === id ? updated : appt));
            return updated;
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, [repository]);

    const deleteAppointment = useCallback(async (id: string) => {
        try {
            await repository.delete(id);
            setAppointments(prev => prev.filter(appt => appt.id !== id));
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    }, [repository]);

    const refresh = useCallback(() => {
        loadAppointments();
    }, [loadAppointments]);

    useEffect(() => {
        loadAppointments();
    }, [loadAppointments]);

    return {
        appointments,
        loading,
        error,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getUpcomingAppointments,
        refresh,
    };
}
