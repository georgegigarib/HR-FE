import { additional } from './es.services.additional.local'
import { candidateManagement } from './es.services.candidateManagement.local'
import { cta } from './es.services.cta.local'
import { cvAnalysis } from './es.services.cvAnalysis.local'
import { aiImprovement } from './es.services.improvement.local'

export const services = {
  main: {
    title: 'Nuestros Servicios',
    subtitle: 'Análisis integral de CV y soluciones de reclutamiento'
  },
  hero: {
    title: 'Nuestros Servicios',
    subtitle: 'Análisis integral de CV y soluciones de reclutamiento',
    cta: 'Comenzar'
  },
  cvAnalysis,
  aiImprovement,
  candidateManagement,
  additional,
  cta
}
