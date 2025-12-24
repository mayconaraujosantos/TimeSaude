import { AppConfig } from '@/config/app.config';
import { LocalMedicationRepository } from './LocalMedicationRepository';
import { MockMedicationRepository } from './MockMedicationRepository';
import { ApiMedicationRepository } from './ApiMedicationRepository';
import type { IMedicationRepository } from './MedicationRepository';

/**
 * Factory pattern - Cria a instância correta do repositório
 * baseado nas configurações da aplicação
 */
export function createMedicationRepository(): IMedicationRepository {
  // Ordem de prioridade: Mock → Local → API
  if (AppConfig.features.useMockData) {
    console.log('[Repository] Using Mock Data');
    return new MockMedicationRepository();
  }

  if (AppConfig.features.useLocalStorage) {
    console.log('[Repository] Using Local Storage');
    return new LocalMedicationRepository();
  }

  if (AppConfig.features.useApi) {
    console.log('[Repository] Using API');
    return new ApiMedicationRepository(AppConfig.api.baseUrl);
  }

  // Fallback para mock
  console.warn('[Repository] No data source configured, falling back to Mock');
  return new MockMedicationRepository();
}

// Singleton - uma única instância do repositório
let medicationRepositoryInstance: IMedicationRepository | null = null;

export function getMedicationRepository(): IMedicationRepository {
  if (!medicationRepositoryInstance) {
    medicationRepositoryInstance = createMedicationRepository();
  }
  return medicationRepositoryInstance;
}

// Útil para testes - permite resetar o singleton
export function resetMedicationRepository(): void {
  medicationRepositoryInstance = null;
}

// Exports
export type { IMedicationRepository };
export { LocalMedicationRepository, MockMedicationRepository, ApiMedicationRepository };
