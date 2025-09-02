import { notifications } from './es.account.notifications.local'
import { profile } from './es.account.profile.local'
import { security } from './es.account.security.local'

export const account = {
  title: 'Configuración de Cuenta',
  tabs: {
    profile: 'Perfil',
    security: 'Seguridad',
    notifications: 'Notificaciones'
  },
  profile,
  security,
  notifications,
  messages: {
    avatarChangeComingSoon: 'Cambio de avatar próximamente disponible'
  }
}
