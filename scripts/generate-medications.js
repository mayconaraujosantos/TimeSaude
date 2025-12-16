#!/usr/bin/env node

// Script para gerar 100 medicamentos para popular o Node-RED

const medicamentos = [
  // Analgésicos e Anti-inflamatórios
  {
    nome: 'Paracetamol',
    dosagens: ['500mg', '750mg', '1000mg'],
    frequencias: ['6/6h', '8/8h'],
    notas: 'Tomar com água',
  },
  {
    nome: 'Ibuprofeno',
    dosagens: ['200mg', '400mg', '600mg'],
    frequencias: ['8/8h', '12/12h'],
    notas: 'Após as refeições',
  },
  {
    nome: 'Dipirona',
    dosagens: ['500mg', '1g'],
    frequencias: ['6/6h', '8/8h', 'SOS'],
    notas: 'Em caso de dor ou febre',
  },
  {
    nome: 'Naproxeno',
    dosagens: ['250mg', '500mg'],
    frequencias: ['12/12h'],
    notas: 'Com alimentos',
  },
  {
    nome: 'Diclofenaco',
    dosagens: ['50mg', '100mg'],
    frequencias: ['8/8h', '12/12h'],
    notas: 'Após as refeições',
  },

  // Antibióticos
  {
    nome: 'Amoxicilina',
    dosagens: ['250mg', '500mg', '875mg'],
    frequencias: ['8/8h', '12/12h'],
    notas: 'Completar o ciclo',
  },
  {
    nome: 'Azitromicina',
    dosagens: ['500mg'],
    frequencias: ['24/24h'],
    notas: 'Tomar por 3 a 5 dias',
  },
  {
    nome: 'Cefalexina',
    dosagens: ['500mg'],
    frequencias: ['6/6h', '8/8h'],
    notas: 'Não interromper o tratamento',
  },
  {
    nome: 'Ciprofloxacino',
    dosagens: ['500mg', '750mg'],
    frequencias: ['12/12h'],
    notas: 'Tomar longe de antiácidos',
  },
  {
    nome: 'Levofloxacino',
    dosagens: ['500mg', '750mg'],
    frequencias: ['24/24h'],
    notas: 'Evitar exposição solar',
  },

  // Anti-hipertensivos
  {
    nome: 'Losartana',
    dosagens: ['25mg', '50mg', '100mg'],
    frequencias: ['24/24h'],
    notas: 'Controle de pressão arterial',
  },
  {
    nome: 'Enalapril',
    dosagens: ['5mg', '10mg', '20mg'],
    frequencias: ['12/12h', '24/24h'],
    notas: 'Monitorar pressão',
  },
  {
    nome: 'Captopril',
    dosagens: ['25mg', '50mg'],
    frequencias: ['8/8h', '12/12h'],
    notas: 'Em jejum ou longe das refeições',
  },
  {
    nome: 'Atenolol',
    dosagens: ['25mg', '50mg', '100mg'],
    frequencias: ['12/12h', '24/24h'],
    notas: 'Controle de frequência cardíaca',
  },
  {
    nome: 'Metoprolol',
    dosagens: ['50mg', '100mg'],
    frequencias: ['12/12h'],
    notas: 'Não interromper subitamente',
  },
  {
    nome: 'Anlodipino',
    dosagens: ['5mg', '10mg'],
    frequencias: ['24/24h'],
    notas: 'Preferencialmente pela manhã',
  },
  {
    nome: 'Hidroclorotiazida',
    dosagens: ['25mg', '50mg'],
    frequencias: ['24/24h'],
    notas: 'Tomar pela manhã',
  },

  // Antidiabéticos
  {
    nome: 'Metformina',
    dosagens: ['500mg', '850mg', '1000mg'],
    frequencias: ['12/12h', '8/8h'],
    notas: 'Tomar durante as refeições',
  },
  {
    nome: 'Glibenclamida',
    dosagens: ['5mg'],
    frequencias: ['24/24h', '12/12h'],
    notas: 'Antes do café da manhã',
  },
  {
    nome: 'Gliclazida',
    dosagens: ['30mg', '60mg'],
    frequencias: ['24/24h'],
    notas: 'Com o café da manhã',
  },

  // Antiácidos e Gastroprotetores
  {
    nome: 'Omeprazol',
    dosagens: ['20mg', '40mg'],
    frequencias: ['24/24h'],
    notas: 'Em jejum, 30min antes do café',
  },
  {
    nome: 'Pantoprazol',
    dosagens: ['20mg', '40mg'],
    frequencias: ['24/24h'],
    notas: 'Pela manhã em jejum',
  },
  {
    nome: 'Ranitidina',
    dosagens: ['150mg'],
    frequencias: ['12/12h'],
    notas: 'Antes das refeições',
  },

  // Hipolipemiantes
  {
    nome: 'Sinvastatina',
    dosagens: ['10mg', '20mg', '40mg'],
    frequencias: ['24/24h'],
    notas: 'Tomar à noite',
  },
  {
    nome: 'Atorvastatina',
    dosagens: ['10mg', '20mg', '40mg'],
    frequencias: ['24/24h'],
    notas: 'Qualquer horário',
  },
  {
    nome: 'Rosuvastatina',
    dosagens: ['10mg', '20mg'],
    frequencias: ['24/24h'],
    notas: 'Controle de colesterol',
  },

  // Vitaminas e Suplementos
  {
    nome: 'Vitamina D3',
    dosagens: ['7000UI', '10000UI'],
    frequencias: ['168h'],
    notas: 'Uma vez por semana',
  },
  { nome: 'Vitamina B12', dosagens: ['1000mcg'], frequencias: ['24/24h'], notas: 'Com alimentos' },
  { nome: 'Ômega 3', dosagens: ['1000mg'], frequencias: ['24/24h'], notas: 'Durante o almoço' },
  {
    nome: 'Ácido Fólico',
    dosagens: ['5mg'],
    frequencias: ['24/24h'],
    notas: 'Preferencialmente pela manhã',
  },
  {
    nome: 'Sulfato Ferroso',
    dosagens: ['40mg'],
    frequencias: ['24/24h'],
    notas: 'Em jejum com vitamina C',
  },

  // Outros
  {
    nome: 'Levotiroxina',
    dosagens: ['25mcg', '50mcg', '75mcg', '100mcg'],
    frequencias: ['24/24h'],
    notas: 'Em jejum, 30-60min antes do café',
  },
  {
    nome: 'Ácido Acetilsalicílico',
    dosagens: ['100mg'],
    frequencias: ['24/24h'],
    notas: 'Após o jantar',
  },
  {
    nome: 'Clopidogrel',
    dosagens: ['75mg'],
    frequencias: ['24/24h'],
    notas: 'Antiagregante plaquetário',
  },
  {
    nome: 'Prednisona',
    dosagens: ['5mg', '20mg'],
    frequencias: ['24/24h', '12/12h'],
    notas: 'Com alimentos',
  },
  { nome: 'Fluoxetina', dosagens: ['20mg', '40mg'], frequencias: ['24/24h'], notas: 'Pela manhã' },
];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMedications(count) {
  const medications = [];
  const startDateRange = new Date('2023-01-01');

  for (let i = 1; i <= count; i++) {
    const med = randomElement(medicamentos);
    const startDate = randomDate(startDateRange, new Date());
    const hasEndDate = Math.random() > 0.7; // 30% chance de ter data final

    const medication = {
      id: String(i),
      name: med.nome,
      dosage: randomElement(med.dosagens),
      frequency: randomElement(med.frequencias),
      startDate: startDate.toISOString(),
      notes: med.notas,
    };

    // Adiciona endDate para alguns medicamentos (antibióticos geralmente)
    if (hasEndDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 7); // 7 a 37 dias depois
      medication.endDate = endDate.toISOString();
    }

    medications.push(medication);
  }

  return medications;
}

// Gera 100 medicamentos
const medications = generateMedications(100);

// Output como JSON
// eslint-disable-next-line no-console
console.log(JSON.stringify(medications, null, 2));

// Estatísticas
// eslint-disable-next-line no-console
console.error('\n📊 Estatísticas:');
// eslint-disable-next-line no-console
console.error(`Total de medicamentos: ${medications.length}`);
// eslint-disable-next-line no-console
console.error(`Com data final: ${medications.filter(m => m.endDate).length}`);
// eslint-disable-next-line no-console
console.error(`Sem data final: ${medications.filter(m => !m.endDate).length}`);
// eslint-disable-next-line no-console
console.error(`\n✅ JSON gerado com sucesso!`);
// eslint-disable-next-line no-console
console.error(`\n💡 Para importar no Node-RED:`);
// eslint-disable-next-line no-console
console.error(`   node scripts/generate-medications.js > nodered/medications-100.json`);
