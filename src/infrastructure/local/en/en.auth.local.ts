export const auth = {
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
}
