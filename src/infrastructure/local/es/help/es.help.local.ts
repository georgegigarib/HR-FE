import { categories } from './es.help.categories.local'
import { contact } from './es.help.contact.local'
import { account } from './es.help.faq.account.local'
import { billing } from './es.help.faq.billing.local'
import { gettingStarted } from './es.help.faq.gettingStarted'
import { technical } from './es.help.faq.technical.local'
import { quickLinks } from './es.help.quickLink.local'

export const help = {
  hero: {
    title: 'Centro de Ayuda',
    subtitle:
      'Encuentra respuestas a tus preguntas y aprende a sacar el máximo provecho de nuestra plataforma de análisis de CVs.'
  },
  search: {
    placeholder: 'Buscar en las preguntas frecuentes...'
  },
  quickLinks,
  categories,
  faq: {
    title: 'Preguntas frecuentes',
    subtitle: 'Encuentra respuestas rápidas a las preguntas más comunes',
    gettingStarted,
    account,
    billing,
    technical
  },
  contact
}
