import { roles } from './es.auth.roles.local'
import { fields } from './es.auth.fields.local'
import { forgotPassword } from './es.auth.forgot.local'
import { login } from './es.auth.login.local'
import { placeholders } from './es.auth.placeholders.local'
import { register } from './es.auth.register.local'
import { validation } from './es.auth.validation.local'

export const auth = {
  or: 'o',
  logout: {
    success: 'Sesión cerrada con éxito'
  },
  login,
  register,
  forgotPassword,
  fields,
  placeholders,
  hints: {
    companyId: 'ID único de la empresa',
    password: 'La contraseña debe tener al menos 8 caracteres'
  },
  validation,
  roles
}
