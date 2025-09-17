import { useI18n } from 'vue-i18n'

export interface FAQ {
  id: string
  question: string
  answer: string
}

export interface FAQSections {
  gettingStarted: FAQ[]
  account: FAQ[]
  billing: FAQ[]
  technical: FAQ[]
}

export const useFAQSections = () => {
  const { t } = useI18n()

  const faqSections: FAQSections = {
    gettingStarted: [
      {
        id: 'gs-1',
        question: t('help.faq.gettingStarted.q1.question'),
        answer: t('help.faq.gettingStarted.q1.answer')
      },
      {
        id: 'gs-2',
        question: t('help.faq.gettingStarted.q2.question'),
        answer: t('help.faq.gettingStarted.q2.answer')
      },
      {
        id: 'gs-3',
        question: t('help.faq.gettingStarted.q3.question'),
        answer: t('help.faq.gettingStarted.q3.answer')
      },
      {
        id: 'gs-4',
        question: t('help.faq.gettingStarted.q4.question'),
        answer: t('help.faq.gettingStarted.q4.answer')
      }
    ],
    account: [
      {
        id: 'acc-1',
        question: t('help.faq.account.q1.question'),
        answer: t('help.faq.account.q1.answer')
      },
      {
        id: 'acc-2',
        question: t('help.faq.account.q2.question'),
        answer: t('help.faq.account.q2.answer')
      },
      {
        id: 'acc-3',
        question: t('help.faq.account.q3.question'),
        answer: t('help.faq.account.q3.answer')
      },
      {
        id: 'acc-4',
        question: t('help.faq.account.q4.question'),
        answer: t('help.faq.account.q4.answer')
      }
    ],
    billing: [
      {
        id: 'bill-1',
        question: t('help.faq.billing.q1.question'),
        answer: t('help.faq.billing.q1.answer')
      },
      {
        id: 'bill-2',
        question: t('help.faq.billing.q2.question'),
        answer: t('help.faq.billing.q2.answer')
      },
      {
        id: 'bill-3',
        question: t('help.faq.billing.q3.question'),
        answer: t('help.faq.billing.q3.answer')
      },
      {
        id: 'bill-4',
        question: t('help.faq.billing.q4.question'),
        answer: t('help.faq.billing.q4.answer')
      }
    ],
    technical: [
      {
        id: 'tech-1',
        question: t('help.faq.technical.q1.question'),
        answer: t('help.faq.technical.q1.answer')
      },
      {
        id: 'tech-2',
        question: t('help.faq.technical.q2.question'),
        answer: t('help.faq.technical.q2.answer')
      },
      {
        id: 'tech-3',
        question: t('help.faq.technical.q3.question'),
        answer: t('help.faq.technical.q3.answer')
      },
      {
        id: 'tech-4',
        question: t('help.faq.technical.q4.question'),
        answer: t('help.faq.technical.q4.answer')
      }
    ]
  }

  return {
    faqSections
  }
}