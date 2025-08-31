import { filters } from './es.employees.filters.local'
import { form } from './es.employees.form.local'
import { messages } from './es.employees.messages.local'
import { stats } from './es.employees.stats.local'
import { status } from './es.employees.status.local'
import { table } from './es.employees.table.local'

export const employees = {
  title: 'Gestión de empleados',
  search: 'Buscar empleados...',
  filters,
  stats,
  addEmployee: 'Agregar empleado',
  editEmployee: 'Editar empleado',
  deleteConfirm: 'Confirmar eliminación',
  deleteConfirmDesc: '¿Estás seguro de que deseas eliminar a este empleado?',
  delete: 'Eliminar',
  noEmployees: 'No hay empleados',
  noEmployeesDesc: 'No hay empleados para mostrar',
  table,
  form,
  messages,
  status
}
