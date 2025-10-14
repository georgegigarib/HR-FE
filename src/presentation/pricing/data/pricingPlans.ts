export interface PricingPlan {
  id: string
  name: string
  period: string
  description: string
  cta: string
  badge?: string
  highlight?: boolean
  price: { monthly: number; annual: number }
  features: string[]
}

export const plans: PricingPlan[] = [
  {
    id: 'trial',
    name: 'pricing.plans.trial.name',
    period: 'pricing.plans.trial.period',
    description: 'pricing.plans.trial.description',
    cta: 'pricing.plans.trial.cta',
    price: { monthly: 0, annual: 0 },
    features: [
      'pricing.plans.trial.features.cvs',
      'pricing.plans.trial.features.users',
      'pricing.plans.trial.features.ai',
      'pricing.plans.trial.features.support'
    ]
  },
  {
    id: 'starter',
    name: 'pricing.plans.starter.name',
    period: 'pricing.plans.starter.period',
    description: 'pricing.plans.starter.description',
    cta: 'pricing.plans.starter.cta',
    price: { monthly: 49, annual: 39 },
    features: [
      'pricing.plans.starter.features.cvs',
      'pricing.plans.starter.features.users',
      'pricing.plans.starter.features.ai',
      'pricing.plans.starter.features.export',
      'pricing.plans.starter.features.support'
    ]
  },
  {
    id: 'professional',
    name: 'pricing.plans.professional.name',
    period: 'pricing.plans.professional.period',
    description: 'pricing.plans.professional.description',
    cta: 'pricing.plans.professional.cta',
    badge: 'pricing.plans.professional.badge',
    highlight: true,
    price: { monthly: 99, annual: 79 },
    features: [
      'pricing.plans.professional.features.cvs',
      'pricing.plans.professional.features.users',
      'pricing.plans.professional.features.ai',
      'pricing.plans.professional.features.export',
      'pricing.plans.professional.features.analytics',
      'pricing.plans.professional.features.support'
    ]
  },
  {
    id: 'enterprise',
    name: 'pricing.plans.enterprise.name',
    period: 'pricing.plans.enterprise.period',
    description: 'pricing.plans.enterprise.description',
    cta: 'pricing.plans.enterprise.cta',
    price: { monthly: 199, annual: 159 },
    features: [
      'pricing.plans.enterprise.features.cvs',
      'pricing.plans.enterprise.features.users',
      'pricing.plans.enterprise.features.ai',
      'pricing.plans.enterprise.features.export',
      'pricing.plans.enterprise.features.analytics',
      'pricing.plans.enterprise.features.api',
      'pricing.plans.enterprise.features.support'
    ]
  }
]
