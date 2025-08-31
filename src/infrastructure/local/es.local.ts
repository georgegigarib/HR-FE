import { account } from './es/account/es.account.local'
import { auth } from './es/auth/es.auth.local'
import { dashboard } from './es/dashboard/es.dashboard.local'
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
  employees: {
    title: 'Gestión de Empleados',
    search: 'Buscar empleados...',
    filters: {
      all: 'Todos',
      active: 'Activos',
      pending: 'Pendientes',
      inactive: 'Inactivos'
    },
    stats: {
      total: 'Total de empleados',
      active: 'Empleados activos',
      pending: 'Empleados pendientes',
      limit: 'Límite de empleados'
    },
    addEmployee: 'Agregar Empleado',
    editEmployee: 'Editar Empleado',
    table: {
      employee: 'Empleado',
      position: 'Posición',
      status: 'Estado',
      joinDate: 'Fecha de ingreso',
      lastActive: 'Última actividad',
      actions: 'Acciones'
    },
    deleteConfirm: 'Confirmar eliminación',
    deleteConfirmDesc: '¿Estás seguro de que deseas eliminar este empleado?',
    delete: 'Eliminar',
    noEmployees: 'No hay empleados',
    noEmployeesDesc: 'No hay empleados para mostrar',
    form: {
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      position: 'Posición',
      phone: 'Teléfono',
      status: 'Estado',
      update: 'Actualizar',
      add: 'Agregar'
    },
    messages: {
      employeeAdded: 'Empleado agregado exitosamente'
    },
    status: {
      active: 'Activo',
      pending: 'Pendiente',
      inactive: 'Inactivo'
    }
  },
  account,
  common
}
