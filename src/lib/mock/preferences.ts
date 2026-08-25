import { UserPreference } from '../types'

const preferences: UserPreference[] = [
  {
    userId: 'user-001',
    cities: ['Rondonópolis', 'Cuiabá'],
    states: ['MT'],
    jobTitles: ['Auxiliar Administrativo', 'TI', 'Suporte Técnico', 'Vendedor'],
    salaryMin: 2500,
    workMode: ['PRESENCIAL', 'HIBRIDO'],
    experience: '2_ANOS',
    contractTypes: ['CLT', 'PJ'],
  },
  {
    userId: 'user-002',
    cities: ['Cuiabá', 'Várzea Grande'],
    states: ['MT'],
    jobTitles: ['Designer Gráfico', 'Marketing Digital', 'Social Media'],
    salaryMin: 3000,
    workMode: ['HIBRIDO', 'REMOTO'],
    experience: '3_MAIS',
    contractTypes: ['CLT', 'PJ', 'Freelancer'],
  },
  {
    userId: 'user-003',
    cities: ['Campo Grande'],
    states: ['MS'],
    jobTitles: ['Analista de Sistemas', 'Desenvolvedor', 'TI'],
    salaryMin: 4000,
    workMode: ['REMOTO', 'HIBRIDO'],
    experience: '3_MAIS',
    contractTypes: ['CLT', 'PJ'],
  },
  {
    userId: 'user-004',
    cities: ['São Paulo', 'Guarulhos', 'Osasco'],
    states: ['SP'],
    jobTitles: ['Engenheiro de Dados', 'Cientista de Dados', 'TI'],
    salaryMin: 8000,
    workMode: ['REMOTO'],
    experience: '3_MAIS',
    contractTypes: ['CLT', 'PJ'],
  },
  {
    userId: 'user-005',
    cities: ['Primavera do Leste', 'Rondonópolis'],
    states: ['MT'],
    jobTitles: ['Auxiliar Administrativo', 'Recepcionista', 'Vendedor'],
    salaryMin: 1800,
    workMode: ['PRESENCIAL'],
    experience: '6_MESES',
    contractTypes: ['CLT', 'ESTAGIO', 'TEMPORARIO'],
  },
  {
    userId: 'user-006',
    cities: ['Sorriso', 'Lucas do Rio Verde', 'Sinop'],
    states: ['MT'],
    jobTitles: ['Motorista', 'Logística', 'Auxiliar de Produção'],
    salaryMin: 2000,
    workMode: ['PRESENCIAL'],
    experience: '1_ANO',
    contractTypes: ['CLT', 'TEMPORARIO'],
  },
]

export function getUserPreference(userId: string): UserPreference | undefined {
  return preferences.find((p) => p.userId === userId)
}

export function setUserPreference(pref: UserPreference): void {
  const index = preferences.findIndex((p) => p.userId === pref.userId)
  if (index >= 0) {
    preferences[index] = pref
  } else {
    preferences.push(pref)
  }
}
