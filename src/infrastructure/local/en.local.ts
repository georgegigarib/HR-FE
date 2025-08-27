import { account } from './en/en.account.local'
import { auth } from './en/en.auth.local'
import { dashboard } from './en/en.dashboard.local'
import { help } from './en/en.help.local'
import { landing } from './en/en.landing.local'
import { navigation } from './en/en.navigation.local'
import { recruitment } from './en/en.recruitment.local'
import { roles } from './en/en.roles.local'
import { services } from './en/en.services.local'

export const en = {
  hello: 'hello world george speaking',
  app: {
    name: 'HR Platform'
  },
  roles,
  navigation,
  dashboard,
  landing,
  auth,
  services,
  pricing: {
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
      trial: {
        name: 'Free Trial',
        period: '7 days free',
        description: 'Perfect for trying out our platform',
        cta: 'Start Free Trial',
        features: {
          cvs: '5 CV analyses',
          users: '1 user',
          ai: 'Basic AI analysis',
          support: 'Email support'
        }
      },
      starter: {
        name: 'Starter',
        period: '/month',
        description: 'Ideal for small businesses and independent recruiters',
        cta: 'Get Started',
        features: {
          cvs: '50 CV analyses per month',
          users: '3 users',
          ai: 'Advanced AI analysis',
          export: 'Export contacts',
          support: 'Email support'
        }
      },
      professional: {
        badge: 'Most Popular',
        name: 'Professional',
        period: '/month',
        description: 'For HR teams that need advanced analysis',
        cta: 'Go Professional',
        features: {
          cvs: '200 CV analyses per month',
          users: '10 users',
          ai: 'Complete AI analysis',
          export: 'Unlimited contact export',
          analytics: 'Advanced analytics & metrics',
          support: 'Priority support'
        }
      },
      enterprise: {
        name: 'Enterprise',
        period: '/month',
        description: 'Complete solution for large organizations',
        cta: 'Contact Sales',
        features: {
          cvs: 'Unlimited analyses',
          users: 'Unlimited users',
          ai: 'Custom & advanced AI',
          export: 'Unlimited contact export',
          analytics: 'Enterprise analytics',
          api: 'Full API access',
          support: 'Dedicated 24/7 support'
        }
      }
    },
    comparison: {
      title: 'Compare Our Plans',
      subtitle: 'Find the plan that best fits your needs',
      features: 'Features',
      table: {
        cvAnalysis: 'CV Analysis',
        users: 'Users',
        aiImprovement: 'AI Improvements',
        exportContacts: 'Export Contacts',
        analytics: 'Analytics',
        apiAccess: 'API Access',
        support: 'Support',
        unlimited: 'Unlimited',
        emailSupport: 'Email Support',
        prioritySupport: 'Priority Support',
        dedicatedSupport: 'Dedicated Support'
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions about our plans',
      q1: {
        question: 'Can I change plans at any time?',
        answer:
          'Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately and billing will be prorated.'
      },
      q2: {
        question: 'What happens if I exceed my analysis limit?',
        answer:
          'If you exceed your monthly limit, you can purchase additional analyses or upgrade to a higher plan. We\'ll notify you when you\'re approaching the limit.'
      },
      q3: {
        question: 'Do you offer discounts for non-profit organizations?',
        answer:
          'Yes, we offer special discounts for non-profit and educational organizations. Contact our sales team for more information.'
      },
      q4: {
        question: 'Can I cancel my subscription at any time?',
        answer:
          'Absolutely. You can cancel your subscription at any time without penalties. You\'ll maintain access until the end of your current billing period.'
      },
      q5: {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express) and bank transfers for Enterprise plans.'
      }
    },
    cta: {
      title: 'Ready to get started?',
      subtitle: 'Join thousands of companies that already trust our platform',
      startTrial: 'Start Free Trial',
      contactSales: 'Contact Sales'
    },
    messages: {
      planSelected: 'Plan selected successfully'
    }
  },
  help,
  recruitment,
  employees: {
    title: 'Employee Management',
    search: 'Search employees...',
    filters: {
      all: 'All',
      active: 'Active',
      pending: 'Pending',
      inactive: 'Inactive'
    },
    stats: {
      total: 'Total employees',
      active: 'Active employees',
      pending: 'Pending employees',
      limit: 'Employee limit'
    },
    addEmployee: 'Add Employee',
    editEmployee: 'Edit Employee',
    deleteConfirm: 'Confirm delete',
    deleteConfirmDesc: 'Are you sure you want to delete this employee?',
    delete: 'Delete',
    noEmployees: 'No employees',
    noEmployeesDesc: 'No employees to show',
    table: {
      employee: 'Employee',
      position: 'Position',
      status: 'Status',
      joinDate: 'Join Date',
      lastActive: 'Last Active',
      actions: 'Actions'
    },
    form: {
      fullName: 'Full Name',
      email: 'Email',
      position: 'Position',
      phone: 'Phone',
      status: 'Status',
      update: 'Update',
      add: 'Add'
    },
    messages: {
      employeeAdded: 'Employee added successfully',
      employeeUpdated: 'Employee updated successfully',
      employeeDeleted: 'Employee deleted successfully'
    },
    status: {
      active: 'Active',
      pending: 'Pending',
      inactive: 'Inactive'
    }
  },
  account,
  common: {
    confirm: 'Confirm',
    delete: 'Delete',
    cancel: 'Cancel',
    back: 'Back',
    ok: 'OK'
  }
}
