import { account } from './es/account/es.account.local'
import { auth } from './es/auth/es.auth.local'
import { dashboard } from './es/dashboard/es.dashboard.local'
import { employees } from './es/employees/es.employees.local'
import { common } from './es/es.common.local'
import { navigation } from './es/es.navigation.local'
import { roles } from './es/es.roles.local'
import { help } from './es/help/es.help.local'
import { landing } from './es/landing/es.landing.local'
import { pricing } from './es/pricing/es.pricing.local'
import { recruitment } from './es/recruitment/es.recruitment.local'
import { services } from './es/services/es.services.local'

export const es = {
  hello: 'hola mundo te habla george',
  app: {
    name: 'HR Platform'
  },
  roles,
  navigation,
  dashboard,
  landing,
  auth,
  services,
  pricing,
  help,
  recruitment,
  employees,
  account,
  common
}
