import { account } from './en/en.account.local'
import { dashboard } from './en/en.dashboard.local'
import { help } from './en/en.help.local'
import { landing } from './en/en.landing.local'
import { navigation } from './en/en.navigation.local'
import { recruitment } from './en/en.recruitment.local'
import { roles } from './en/en.roles.local'

export const en = {
  hello: 'hello world george speaking',
  app: {
    name: 'HR Platform'
  },
  roles,
  navigation,
  dashboard,
  landing,
  auth: {
    or: 'or',
    logout: {
      success: 'Successfully logged out'
    },
    login: {
      title: 'Sign in',
      subtitle: 'Access your account to continue',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      submit: 'Sign in',
      loggingIn: 'Signing in...',
      noAccount: 'Don\'t have an account?',
      signUp: 'Sign up',
      success: 'Successfully signed in',
      error: 'Error signing in'
    },
    register: {
      title: 'Create account',
      subtitle: 'Join our platform',
      step1Subtitle: 'Company information',
      step1: 'Step 1: Company Details',
      step2: 'Step 2: Personal Information',
      step1Title: 'Company information',
      step2Title: 'Personal information',
      step2Subtitle: 'Enter your personal information',
      submit: 'Create account',
      creating: 'Creating account...',
      validating: 'Validating...',
      hasAccount: 'Already have an account?',
      alreadyHaveAccount: 'Already have an account?',
      continue: 'Continue',
      signIn: 'Sign in',
      success: 'Account created successfully',
      error: 'Error creating account',
      nextStep: 'Next',
      previousStep: 'Previous',
      back: 'Back',
      acceptTerms: 'I accept the',
      and: 'and',
      termsLink: 'Terms of Service',
      privacyLink: 'Privacy Policy',
      createAccount: 'Create Account'
    },
    forgotPassword: {
      title: 'Forgot Password',
      subtitle: 'Enter your email to reset your password',
      sending: 'Sending...',
      submit: 'Send Reset Link',
      emailSent: 'Email Sent!',
      checkEmail: 'We sent a password reset link to {email}',
      sendAnother: 'Send Another Email',
      backToLogin: 'Back to Login',
      success: 'Password reset email sent successfully',
      error: 'Error sending password reset email'
    },
    fields: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      firstName: 'First name',
      lastName: 'Last name',
      fullName: 'Full name',
      companyId: 'Company ID',
      companyName: 'Company name',
      role: 'Role'
    },
    placeholders: {
      email: 'your@email.com',
      password: 'Your password',
      confirmPassword: 'Confirm your password',
      firstName: 'Your first name',
      lastName: 'Your last name',
      fullName: 'Your full name',
      companyId: 'Unique company ID',
      companyName: 'Your company name'
    },
    hints: {
      companyId: 'Unique company ID',
      password: 'Password must be at least 8 characters long'
    },
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Email is not valid',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      confirmPasswordRequired: 'Confirm password is required',
      passwordsNotMatch: 'Passwords do not match',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      companyIdRequired: 'Company ID is required',
      companyNameRequired: 'Company name is required'
    },
    roles: {
      admin: 'Administrator',
      adminDescription: 'Full access to all platform features',
      employee: 'Employee',
      employeeDescription: 'Limited access to specific employee functions'
    }
  },
  services: {
    main: {
      title: 'Our Services',
      subtitle: 'Comprehensive CV analysis and recruitment solutions'
    },
    hero: {
      title: 'Our Services',
      subtitle: 'Comprehensive CV analysis and recruitment solutions',
      cta: 'Get Started'
    },
    cvAnalysis: {
      title: 'CV Analysis',
      subtitle: 'Advanced AI-powered CV analysis',
      description:
        'Our AI analyzes CVs in depth, extracting key information and providing detailed compatibility scores.',
      features: {
        ai: 'AI-powered analysis',
        compatibility: 'Compatibility scoring',
        extraction: 'Data extraction',
        reports: 'Detailed reports',
        parsing: 'Content parsing',
        matching: 'Profile matching',
        scoring: 'Automatic scoring',
        insights: 'Smart insights'
      }
    },
    aiImprovement: {
      title: 'AI Job Description Improvement',
      subtitle: 'Optimize your job descriptions',
      description:
        'Improve your job descriptions with AI suggestions to attract better candidates.',
      features: {
        optimization: 'Content optimization',
        suggestions: 'AI suggestions',
        templates: 'Professional templates',
        analytics: 'Performance analytics',
        keywords: 'Keyword optimization',
        clarity: 'Clarity improvement'
      },
      demo: {
        title: 'AI Improvement Demo',
        before: 'Before',
        after: 'After'
      }
    },
    candidateManagement: {
      title: 'Candidate Management',
      subtitle: 'Complete candidate management system',
      description: 'Manage your candidates efficiently with our comprehensive tools.',
      features: {
        ranking: 'Candidate ranking',
        tracking: 'Application tracking',
        communication: 'Communication tools',
        collaboration: 'Team collaboration',
        reports: 'Detailed reports',
        export: 'Data export'
      },
      demo: {
        title: 'Advanced Candidate Management',
        export: 'Export Results'
      }
    },
    additional: {
      title: 'Additional Features',
      subtitle: 'Advanced features to optimize your recruitment process',
      security: {
        title: 'Enterprise Security',
        description:
          'Bank-level security with SSL encryption and GDPR compliance to protect your data.'
      },
      speed: {
        title: 'Lightning Fast',
        description: 'Process hundreds of CVs in minutes with our optimized AI algorithms.'
      },
      integration: {
        title: 'Easy Integration',
        description: 'Seamlessly integrate with your existing HR tools and workflows via our API.'
      },
      support: {
        title: '24/7 Support',
        description: 'Get help whenever you need it with our dedicated support team.'
      }
    },
    cta: {
      title: 'Ready to Transform Your Recruitment?',
      subtitle: 'Join hundreds of companies already using our platform to find the perfect talent.',
      primary: 'Start Free Trial',
      secondary: 'Schedule Demo'
    }
  },
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
