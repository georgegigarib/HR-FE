import { account } from './en/en.account.local'
import { auth } from './en/en.auth.local'
import { dashboard } from './en/en.dashboard.local'
import { help } from './en/en.help.local'
import { landing } from './en/en.landing.local'
import { navigation } from './en/en.navigation.local'
import { pricing } from './en/en.pricing.local'
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
  pricing,
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
