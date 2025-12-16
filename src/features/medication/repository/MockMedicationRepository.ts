import type { Medication } from '../model';
import type { IMedicationRepository } from './MedicationRepository';

/**
 * Implementação Mock - útil para desenvolvimento e testes
 * ATUALIZADO com novos campos do schema SQL
 */
export class MockMedicationRepository implements IMedicationRepository {
    private medications: Medication[] = [
        {
            id: '1',
            userId: '1', // Mock user
            name: 'Paracetamol',
            dosage: '500',
            dosageUnit: 'mg',
            form: 'tablet',
            purpose: 'Alívio de dor e febre',
            frequency: '8/8h',
            startDate: new Date('2024-12-01'),
            notes: 'Tomar com água',
            colorCode: '#3B82F6',
            icon: 'pill',
            isActive: true,
            createdAt: new Date('2024-12-01'),
            updatedAt: new Date(),
        },
        {
            id: '2',
            userId: '1',
            name: 'Ibuprofeno',
            dosage: '400',
            dosageUnit: 'mg',
            form: 'tablet',
            purpose: 'Anti-inflamatório',
            frequency: '12/12h',
            startDate: new Date('2024-12-05'),
            endDate: new Date('2024-12-15'),
            notes: 'Após as refeições',
            colorCode: '#10B981',
            icon: 'pill',
            isActive: true,
            createdAt: new Date('2024-12-05'),
            updatedAt: new Date(),
        },
        {
            id: '3',
            userId: '1',
            name: 'Amoxicilina',
            dosage: '250',
            dosageUnit: 'mg',
            form: 'capsule',
            purpose: 'Antibiótico',
            frequency: '8/8h',
            startDate: new Date('2024-11-20'),
            endDate: new Date('2024-11-30'),
            notes: 'Completar o ciclo',
            colorCode: '#F59E0B',
            icon: 'pill',
            isActive: false,
            createdAt: new Date('2024-11-20'),
            updatedAt: new Date(),
        },
        {
            id: '4',
            userId: '1',
            name: 'Losartana',
            dosage: '50',
            dosageUnit: 'mg',
            form: 'tablet',
            purpose: 'Controle de pressão arterial',
            frequency: '24/24h',
            startDate: new Date('2024-01-01'),
            notes: 'Uso contínuo',
            colorCode: '#EF4444',
            icon: 'pill',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date(),
        },
        {
            id: '5',
            userId: '1',
            name: 'Metformina',
            dosage: '850',
            dosageUnit: 'mg',
            form: 'tablet',
            purpose: 'Controle glicêmico',
            frequency: '12/12h',
            startDate: new Date('2024-01-01'),
            notes: 'Tomar durante as refeições',
            colorCode: '#8B5CF6',
            icon: 'pill',
            isActive: true,
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date(),
        },
        {
            id: '6',
            name: 'Omeprazol',
            dosage: '20mg',
            frequency: '24/24h',
            startDate: new Date('2024-06-01'),
            notes: 'Em jejum, 30min antes do café',
        },
        {
            id: '7',
            name: 'Sinvastatina',
            dosage: '40mg',
            frequency: '24/24h',
            startDate: new Date('2024-03-01'),
            notes: 'Tomar à noite',
        },
        {
            id: '8',
            name: 'Levotiroxina',
            dosage: '50mcg',
            frequency: '24/24h',
            startDate: new Date('2024-01-01'),
            notes: 'Em jejum, 30-60min antes do café',
        },
        {
            id: '9',
            name: 'Ácido Acetilsalicílico',
            dosage: '100mg',
            frequency: '24/24h',
            startDate: new Date('2024-02-01'),
            notes: 'Após o jantar',
        },
        {
            id: '10',
            name: 'Atenolol',
            dosage: '25mg',
            frequency: '12/12h',
            startDate: new Date('2024-04-01'),
            notes: 'Controle de frequência cardíaca',
        },
        {
            id: '11',
            name: 'Captopril',
            dosage: '25mg',
            frequency: '8/8h',
            startDate: new Date('2024-05-01'),
            notes: 'Tomar em caso de pressão alta',
        },
        {
            id: '12',
            name: 'Dipirona',
            dosage: '500mg',
            frequency: 'SOS',
            startDate: new Date('2024-12-01'),
            notes: 'Apenas em caso de dor ou febre',
        },
        {
            id: '13',
            name: 'Vitamina D3',
            dosage: '7000UI',
            frequency: '168/168h',
            startDate: new Date('2024-01-01'),
            notes: 'Uma vez por semana',
        },
        {
            id: '14',
            name: 'Ômega 3',
            dosage: '1000mg',
            frequency: '24/24h',
            startDate: new Date('2024-01-01'),
            notes: 'Durante o almoço',
        },
        {
            id: '15',
            name: 'Metoprolol',
            dosage: '100mg',
            frequency: '12/12h',
            startDate: new Date('2024-07-01'),
            notes: 'Controle de arritmia',
        },
        {
            id: '16',
            name: 'Enalapril',
            dosage: '10mg',
            frequency: '12/12h',
            startDate: new Date('2024-08-01'),
            notes: 'Anti-hipertensivo',
        },
        {
            id: '17',
            name: 'Hidroclorotiazida',
            dosage: '25mg',
            frequency: '24/24h',
            startDate: new Date('2024-09-01'),
            notes: 'Tomar pela manhã',
        },
        {
            id: '18',
            name: 'Prednisona',
            dosage: '20mg',
            frequency: '24/24h',
            startDate: new Date('2024-11-15'),
            endDate: new Date('2024-12-15'),
            notes: 'Desmame gradual',
        },
        {
            id: '19',
            name: 'Azitromicina',
            dosage: '500mg',
            frequency: '24/24h',
            startDate: new Date('2024-12-01'),
            endDate: new Date('2024-12-05'),
            notes: 'Antibiótico - 5 dias',
        },
        {
            id: '20',
            name: 'Clonazepam',
            dosage: '2mg',
            frequency: '24/24h',
            startDate: new Date('2024-06-01'),
            notes: 'Tomar antes de dormir',
        },
        {
            id: '21',
            name: 'Fluoxetina',
            dosage: '20mg',
            frequency: '24/24h',
            startDate: new Date('2024-05-01'),
            notes: 'Pela manhã, com ou sem alimento',
        },
        {
            id: '22',
            name: 'Sertralina',
            dosage: '50mg',
            frequency: '24/24h',
            startDate: new Date('2024-10-01'),
            notes: 'Antidepressivo',
        },
        {
            id: '23',
            name: 'Bromazepam',
            dosage: '3mg',
            frequency: '12/12h',
            startDate: new Date('2024-11-01'),
            notes: 'Ansiolítico',
        },
        {
            id: '24',
            name: 'Ranitidina',
            dosage: '150mg',
            frequency: '12/12h',
            startDate: new Date('2024-08-15'),
            notes: 'Protetor gástrico',
        },
        {
            id: '25',
            name: 'Dexametasona',
            dosage: '4mg',
            frequency: '12/12h',
            startDate: new Date('2024-11-20'),
            endDate: new Date('2024-12-10'),
            notes: 'Anti-inflamatório corticoide',
        },
        {
            id: '26',
            name: 'Cetirizina',
            dosage: '10mg',
            frequency: '24/24h',
            startDate: new Date('2024-09-01'),
            notes: 'Antialérgico',
        },
        {
            id: '27',
            name: 'Gliclazida',
            dosage: '30mg',
            frequency: '24/24h',
            startDate: new Date('2024-07-01'),
            notes: 'Controle glicêmico - antes do café',
        },
        {
            id: '28',
            name: 'Cálcio + Vitamina D',
            dosage: '600mg',
            frequency: '24/24h',
            startDate: new Date('2024-01-01'),
            notes: 'Saúde óssea',
        },
        {
            id: '29',
            name: 'Ácido Fólico',
            dosage: '5mg',
            frequency: '24/24h',
            startDate: new Date('2024-04-01'),
            notes: 'Suplementação',
        },
        {
            id: '30',
            name: 'Complexo B',
            dosage: '1 comprimido',
            frequency: '24/24h',
            startDate: new Date('2024-02-01'),
            notes: 'Vitaminas do complexo B',
        },
    ];

    async getAll(): Promise<Medication[]> {
        // Simular delay de rede
        await new Promise((resolve) => setTimeout(resolve, 300));
        return [...this.medications];
    }

    async getById(id: string): Promise<Medication | null> {
        await new Promise((resolve) => setTimeout(resolve, 200));
        return this.medications.find((med) => med.id === id) ?? null;
    }

    async save(medication: Medication): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 300));
        this.medications.push(medication);
    }

    async update(id: string, updates: Partial<Medication>): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const index = this.medications.findIndex((med) => med.id === id);

        if (index === -1) {
            throw new Error(`Medication with id ${id} not found`);
        }

        this.medications[index] = {
            ...this.medications[index],
            ...updates,
            id
        } as Medication;
    }

    async delete(id: string): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 300));
        this.medications = this.medications.filter((med) => med.id !== id);
    }
}
