import { roles } from '../en.roles.local'
import { fields } from './en.auth.fields.local'
import { forgotPassword } from './en.auth.forgot.local'
import { login } from './en.auth.login.local'
import { placeholders } from './en.auth.placeholders.local'
import { register } from './en.auth.register.local'
import { validation } from './en.auth.validation.local'

export const auth = {
  or: 'or',
  logout: {
    success: 'Successfully logged out'
  },
  login,
  register,
  forgotPassword,
  fields,
  placeholders,
  hints: {
    companyId: 'Unique company ID',
    password: 'Password must be at least 8 characters long'
  },
  validation,
  roles
}
