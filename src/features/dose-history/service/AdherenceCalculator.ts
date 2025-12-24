import type { DoseHistory, AdherenceStats } from '../model';

/**
 * Calcula estatísticas de aderência ao tratamento
 */
export class AdherenceCalculator {
  /**
   * Calcula estatísticas de aderência completas
   */
  static calculateStats(doseHistory: DoseHistory[]): AdherenceStats {
    const totalDoses = doseHistory.length;

    if (totalDoses === 0) {
      return {
        totalDoses: 0,
        takenDoses: 0,
        missedDoses: 0,
        skippedDoses: 0,
        lateDoses: 0,
        adherencePercentage: 0,
        averageLateMinutes: 0,
      };
    }

    const takenDoses = doseHistory.filter(d => d.status === 'taken').length;
    const missedDoses = doseHistory.filter(d => d.status === 'missed').length;
    const skippedDoses = doseHistory.filter(d => d.status === 'skipped').length;
    const lateDoses = doseHistory.filter(d => d.status === 'late').length;

    // Calcular média de atraso
    const lateHistory = doseHistory.filter(
      d => (d.status === 'late' || d.status === 'taken') && d.lateMinutes && d.lateMinutes > 0
    );

    const averageLateMinutes =
      lateHistory.length > 0
        ? lateHistory.reduce((sum, d) => sum + (d.lateMinutes || 0), 0) / lateHistory.length
        : 0;

    // Aderência = (tomadas + atrasadas) / total
    // Consideramos doses atrasadas como "aderidas" pois foram tomadas
    const adherencePercentage = ((takenDoses + lateDoses) / totalDoses) * 100;

    return {
      totalDoses,
      takenDoses,
      missedDoses,
      skippedDoses,
      lateDoses,
      adherencePercentage: Math.round(adherencePercentage * 100) / 100, // 2 casas decimais
      averageLateMinutes: Math.round(averageLateMinutes * 100) / 100,
    };
  }

  /**
   * Calcula aderência por período (útil para gráficos)
   */
  static calculateByPeriod(
    doseHistory: DoseHistory[],
    periodDays: number = 7
  ): { period: string; adherence: number }[] {
    const now = new Date();
    const periods: { period: string; adherence: number }[] = [];

    for (let i = 0; i < 4; i++) {
      // Últimas 4 semanas
      const periodStart = new Date(now);
      periodStart.setDate(periodStart.getDate() - periodDays * (i + 1));

      const periodEnd = new Date(now);
      periodEnd.setDate(periodEnd.getDate() - periodDays * i);

      const periodHistory = doseHistory.filter(d => {
        const doseDate = new Date(d.scheduledTime);
        return doseDate >= periodStart && doseDate < periodEnd;
      });

      const stats = this.calculateStats(periodHistory);

      periods.unshift({
        period: `${periodStart.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} - ${periodEnd.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}`,
        adherence: stats.adherencePercentage,
      });
    }

    return periods;
  }

  /**
   * Verifica se a aderência está boa (> 80%)
   */
  static isGoodAdherence(adherencePercentage: number): boolean {
    return adherencePercentage >= 80;
  }

  /**
   * Classifica o nível de aderência
   */
  static getAdherenceLevel(
    adherencePercentage: number
  ): 'excellent' | 'good' | 'moderate' | 'poor' {
    if (adherencePercentage >= 95) return 'excellent';
    if (adherencePercentage >= 80) return 'good';
    if (adherencePercentage >= 60) return 'moderate';
    return 'poor';
  }

  /**
   * Calcula streak (dias consecutivos com 100% aderência)
   */
  static calculateStreak(doseHistory: DoseHistory[]): number {
    // Agrupar por dia
    const dayMap = new Map<string, DoseHistory[]>();

    doseHistory.forEach(dose => {
      const day = new Date(dose.scheduledTime).toDateString();
      if (!dayMap.has(day)) {
        dayMap.set(day, []);
      }
      dayMap.get(day)!.push(dose);
    });

    // Ordenar dias (mais recente primeiro)
    const sortedDays = Array.from(dayMap.entries()).sort(
      ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
    );

    let streak = 0;

    for (const [, doses] of sortedDays) {
      const allTaken = doses.every(d => d.status === 'taken' || d.status === 'late');

      if (allTaken) {
        streak++;
      } else {
        break; // Streak quebrado
      }
    }

    return streak;
  }
}
