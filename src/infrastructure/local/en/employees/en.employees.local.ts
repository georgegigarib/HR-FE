import { filters } from './en.employees.filters.local'
import { form } from './en.employees.form.local'
import { messages } from './en.employees.messages.local'
import { stats } from './en.employees.stats.local'
import { status } from './en.employees.status.local'
import { table } from './en.employees.table.local'

export const employees = {
  title: 'Employee Management',
  search: 'Search employees...',
  filters,
  stats,
  addEmployee: 'Add Employee',
  editEmployee: 'Edit Employee',
  deleteConfirm: 'Confirm delete',
  deleteConfirmDesc: 'Are you sure you want to delete this employee?',
  delete: 'Delete',
  noEmployees: 'No employees',
  noEmployeesDesc: 'No employees to show',
  table,
  form,
  messages,
  status
}
