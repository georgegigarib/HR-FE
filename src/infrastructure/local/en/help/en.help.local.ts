import { categories } from './en.help.categories.local';
import { contact } from './en.help.contact.local';
import { account } from './en.help.faq.account.local';
import { billing } from './en.help.faq.billing.local';
import { gettingStarted } from './en.help.faq.gettingStarted';
import { technical } from './en.help.faq.technical.local';
import { quickLinks } from './en.help.quickLink.local';

export const help = {
  hero: {
    title: 'Help Center',
    subtitle: 'Find answers to your questions and learn how to use our platform'
  },
  search: {
    placeholder: 'Search help...'
  },
  quickLinks,
  categories,
  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find quick answers to the most common questions',
    gettingStarted,
    account,
    billing,
    technical
  },
  contact
}
