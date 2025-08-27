import { comparison } from './en.pricing.comparison.local';
import { cta } from './en.pricing.cta.local';
import { faq } from './en.pricing.faq.local';
import { enterprise } from './en.pricing.plans.enterprise.local';
import { professional } from './en.pricing.plans.professional.local';
import { starter } from './en.pricing.plans.starter.local';
import { trial } from './en.pricing.plans.trial.local';

export const pricing = {
  hero: {
    title: 'Plans & Pricing',
    subtitle: 'Choose the perfect plan for your CV analysis needs'
  },
  billing: {
    monthly: 'Monthly',
    annual: 'Annual',
    save20: 'Save 20%'
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
    planSelected: 'Plan selected successfully'
  }
}
