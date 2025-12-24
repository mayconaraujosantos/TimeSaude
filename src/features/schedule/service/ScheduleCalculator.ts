import type { MedicationSchedule, DoseTime } from '../model';

/**
 * Calcula próximas doses com base no schedule e dose times
 */
export class ScheduleCalculator {
  /**
   * Calcula as próximas N doses de um medicamento
   */
  static getNextDoses(
    schedule: MedicationSchedule,
    doseTimes: DoseTime[],
    count: number = 10
  ): Date[] {
    const now = new Date();
    const doses: Date[] = [];

    // Se passou da data final, não há mais doses
    if (schedule.endDate && now > schedule.endDate) {
      return [];
    }

    // Começar da data de início ou agora (o que for mais recente)
    let currentDate = new Date(Math.max(schedule.startDate.getTime(), now.getTime()));

    while (doses.length < count) {
      // Verificar se ainda está dentro do período
      if (schedule.endDate && currentDate > schedule.endDate) {
        break;
      }

      // Para cada dose time do dia
      for (const doseTime of doseTimes) {
        const timeParts = doseTime.time.split(':');
        const hours = parseInt(timeParts[0] || '0', 10);
        const minutes = parseInt(timeParts[1] || '0', 10);
        const doseDate = new Date(currentDate);
        doseDate.setHours(hours, minutes, 0, 0);

        // Só adicionar se for futuro
        if (doseDate > now) {
          // Verificar se o dia da semana é válido
          if (this.isDayValid(doseDate, schedule)) {
            doses.push(doseDate);

            if (doses.length >= count) {
              break;
            }
          }
        }
      }

      // Avançar para o próximo dia
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
    }

    return doses.sort((a, b) => a.getTime() - b.getTime());
  }

  /**
   * Verifica se um dia é válido para o schedule
   */
  private static isDayValid(date: Date, schedule: MedicationSchedule): boolean {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    switch (schedule.frequency) {
      case 'daily':
        return true;

      case 'weekly':
      case 'specific_days':
        return schedule.daysOfWeek?.includes(dayOfWeek) ?? true;

      case 'as_needed':
        return false; // SOS não tem horários fixos

      default:
        return true;
    }
  }

  /**
   * Calcula a próxima dose (apenas uma)
   */
  static getNextDose(schedule: MedicationSchedule, doseTimes: DoseTime[]): Date | null {
    const doses = this.getNextDoses(schedule, doseTimes, 1);
    return doses.length > 0 ? doses[0]! : null;
  }

  /**
   * Verifica se uma dose está atrasada
   */
  static isLate(scheduledTime: Date, takenTime: Date, toleranceMinutes: number = 30): boolean {
    const diffMinutes = (takenTime.getTime() - scheduledTime.getTime()) / (1000 * 60);
    return diffMinutes > toleranceMinutes;
  }

  /**
   * Calcula quantos minutos de atraso
   */
  static calculateLateMinutes(scheduledTime: Date, takenTime: Date): number {
    const diffMinutes = Math.floor((takenTime.getTime() - scheduledTime.getTime()) / (1000 * 60));
    return Math.max(0, diffMinutes);
  }
}
