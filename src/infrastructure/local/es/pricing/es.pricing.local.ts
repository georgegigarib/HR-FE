import { comparison } from './es.pricing.comparison.local'
import { cta } from './es.pricing.cta.local'
import { faq } from './es.pricing.faq.local'
import { enterprise } from './es.pricing.plans.enterprise.local'
import { professional } from './es.pricing.plans.professional.local'
import { starter } from './es.pricing.plans.starter.local'
import { trial } from './es.pricing.plans.trial.local'

export const pricing = {
  hero: {
    title: 'Planes y Precios',
    subtitle: 'Elige el plan perfecto para tus necesidades de análisis de CV'
  },
  billing: {
    monthly: 'Mensual',
    annual: 'Anual',
    save20: 'Ahorra 20%'
  },
  plans: {
    trial,
    starter,
    professional,
    enterprise
  },
  comparison,
  faq,
  cta,
  messages: {
    planSelected: 'Plan seleccionado con éxito'
  }
}
