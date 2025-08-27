<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/dashboard" class="flex items-center space-x-2">
              <ArrowLeftIcon class="w-5 h-5 text-gray-600" />
              <span class="text-gray-600 hover:text-gray-900">{{ $t('common.back') }}</span>
            </router-link>
          </div>
          
          <h1 class="text-xl font-semibold text-gray-900">
            {{ $t('employees.title') }}
          </h1>
          
          <div class="flex items-center space-x-4">
            <!-- User Menu -->
            <div class="relative" ref="userMenuRef">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm font-medium">{{ userInitials }}</span>
                </div>
                <ChevronDownIcon class="w-4 h-4" />
              </button>
              
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
              >
                <router-link
                  to="/dashboard/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ $t('common.settings') }}
                </router-link>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ $t('auth.logout') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <UsersIcon class="w-8 h-8 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('employees.stats.total') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalEmployees }}</p>
            </div>
          </div>
        </BaseCard>
        
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="w-8 h-8 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('employees.stats.active') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeEmployees }}</p>
            </div>
          </div>
        </BaseCard>
        
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ClockIcon class="w-8 h-8 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('employees.stats.pending') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingEmployees }}</p>
            </div>
          </div>
        </BaseCard>
        
        <BaseCard class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ChartBarIcon class="w-8 h-8 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">{{ $t('employees.stats.limit') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalEmployees }}/{{ stats.employeeLimit }}</p>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Actions Bar -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('employees.search')"
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-64 text-black"
            />
          </div>
          
          <!-- Filter -->
          <select
            v-model="statusFilter"
            class="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value="all">{{ $t('employees.filters.all') }}</option>
            <option value="active">{{ $t('employees.filters.active') }}</option>
            <option value="pending">{{ $t('employees.filters.pending') }}</option>
            <option value="inactive">{{ $t('employees.filters.inactive') }}</option>
          </select>
        </div>
        
        <BaseButton
          variant="primary"
          @click="showAddModal = true"
          :disabled="stats.totalEmployees >= stats.employeeLimit"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          {{ $t('employees.addEmployee') }}
        </BaseButton>
      </div>

      <!-- Employees Table -->
      <BaseCard>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('employees.table.employee') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('employees.table.position') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('employees.table.status') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('employees.table.joinDate') }}
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('employees.table.lastActive') }}
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ $t('employees.table.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span class="text-white text-sm font-medium">{{ getInitials(employee.fullName) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ employee.fullName }}</div>
                      <div class="text-sm text-gray-500">{{ employee.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ employee.position }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <BaseBadge :variant="getStatusVariant(employee.status)">
                    {{ $t(`employees.status.${employee.status}`) }}
                  </BaseBadge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(employee.joinDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(employee.lastActive) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <BaseButton
                      variant="outline"
                      size="sm"
                      @click="editEmployee(employee)"
                    >
                      <PencilIcon class="w-4 h-4" />
                    </BaseButton>
                    <BaseButton
                      variant="outline"
                      size="sm"
                      @click="deleteEmployee(employee)"
                      class="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </BaseButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="filteredEmployees.length === 0" class="text-center py-12">
            <UsersIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">{{ $t('employees.noEmployees') }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ $t('employees.noEmployeesDesc') }}</p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Add Employee Modal -->
    <BaseModal v-if="showAddModal" :model-value="showAddModal" @close="showAddModal = false">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          {{ $t('employees.addEmployee') }}
        </h2>
        
        <form @submit.prevent="addEmployee" class="space-y-4">
          <BaseInput
            v-model="employeeForm.fullName"
            :label="$t('employees.form.fullName')"
            :error="employeeErrors.fullName"
            required
          />
          
          <BaseInput
            v-model="employeeForm.email"
            type="email"
            :label="$t('employees.form.email')"
            :error="employeeErrors.email"
            required
          />
          
          <BaseInput
            v-model="employeeForm.position"
            :label="$t('employees.form.position')"
            :error="employeeErrors.position"
            required
          />
          
          <BaseInput
            v-model="employeeForm.phone"
            :label="$t('employees.form.phone')"
            :error="employeeErrors.phone"
          />
          
          <div class="flex justify-end space-x-3 pt-4">
            <BaseButton
              type="button"
              variant="outline"
              @click="showAddModal = false"
            >
              {{ $t('common.cancel') }}
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              :loading="addLoading"
            >
              {{ $t('employees.form.add') }}
            </BaseButton>
          </div>
        </form>
      </div>
    </BaseModal>

    <!-- Edit Employee Modal -->
    <BaseModal v-if="showEditModal" :model-value="showEditModal" @close="showEditModal = false">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          {{ $t('employees.editEmployee') }}
        </h2>
        
        <form @submit.prevent="updateEmployee" class="space-y-4">
          <BaseInput
            v-model="editForm.fullName"
            :label="$t('employees.form.fullName')"
            :error="editErrors.fullName"
            required
          />
          
          <BaseInput
            v-model="editForm.email"
            type="email"
            :label="$t('employees.form.email')"
            :error="editErrors.email"
            required
            disabled
          />
          
          <BaseInput
            v-model="editForm.position"
            :label="$t('employees.form.position')"
            :error="editErrors.position"
            required
          />
          
          <BaseInput
            v-model="editForm.phone"
            :label="$t('employees.form.phone')"
            :error="editErrors.phone"
          />
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('employees.form.status') }}
            </label>
            <select
              v-model="editForm.status"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">{{ $t('employees.status.active') }}</option>
              <option value="pending">{{ $t('employees.status.pending') }}</option>
              <option value="inactive">{{ $t('employees.status.inactive') }}</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <BaseButton
              type="button"
              variant="outline"
              @click="showEditModal = false"
            >
              {{ $t('common.cancel') }}
            </BaseButton>
            <BaseButton
              type="submit"
              variant="primary"
              :loading="editLoading"
            >
              {{ $t('employees.form.update') }}
            </BaseButton>
          </div>
        </form>
      </div>
    </BaseModal>

    <!-- Delete Confirmation Modal -->
    <BaseModal v-if="showDeleteModal" :model-value="showDeleteModal" @close="showDeleteModal = false">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <ExclamationTriangleIcon class="w-6 h-6 text-red-600 mr-3" />
          <h2 class="text-lg font-medium text-gray-900">
            {{ $t('employees.deleteConfirm') }}
          </h2>
        </div>
        
        <p class="text-sm text-gray-500 mb-6">
          {{ $t('employees.deleteConfirmDesc', { name: employeeToDelete?.fullName }) }}
        </p>
        
        <div class="flex justify-end space-x-3">
          <BaseButton
            variant="outline"
            @click="showDeleteModal = false"
          >
            {{ $t('common.cancel') }}
          </BaseButton>
          <BaseButton
            variant="danger"
            @click="confirmDelete"
            :loading="deleteLoading"
          >
            {{ $t('common.delete') }}
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'vue3-toastify';

interface Employee {
  id: string;
  fullName: string;
  email: string;
  position: string;
  phone?: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: Date;
  lastActive: Date;
}

const { t } = useI18n();
const router = useRouter();
const authStore = useAuthStore();

const showUserMenu = ref(false);
const userMenuRef = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const statusFilter = ref('all');

// Modals
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);

// Loading states
const addLoading = ref(false);
const editLoading = ref(false);
const deleteLoading = ref(false);

// Stats
const stats = reactive({
  totalEmployees: 8,
  activeEmployees: 6,
  pendingEmployees: 1,
  employeeLimit: 10
});

// Employees data
const employees = ref<Employee[]>([
  {
    id: '1',
    fullName: 'Ana García',
    email: 'ana.garcia@empresa.com',
    position: 'Desarrolladora Senior',
    phone: '+1 234 567 8901',
    status: 'active',
    joinDate: new Date('2023-01-15'),
    lastActive: new Date()
  },
  {
    id: '2',
    fullName: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@empresa.com',
    position: 'Diseñador UX/UI',
    phone: '+1 234 567 8902',
    status: 'active',
    joinDate: new Date('2023-02-20'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '3',
    fullName: 'María López',
    email: 'maria.lopez@empresa.com',
    position: 'Analista de Datos',
    phone: '+1 234 567 8903',
    status: 'pending',
    joinDate: new Date('2023-12-01'),
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    fullName: 'David Martín',
    email: 'david.martin@empresa.com',
    position: 'DevOps Engineer',
    phone: '+1 234 567 8904',
    status: 'active',
    joinDate: new Date('2023-03-10'),
    lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '5',
    fullName: 'Laura Sánchez',
    email: 'laura.sanchez@empresa.com',
    position: 'Product Manager',
    phone: '+1 234 567 8905',
    status: 'active',
    joinDate: new Date('2023-04-05'),
    lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000)
  }
]);

// Forms
const employeeForm = reactive({
  fullName: '',
  email: '',
  position: '',
  phone: ''
});

const employeeErrors = reactive({
  fullName: '',
  email: '',
  position: '',
  phone: ''
});

const editForm = reactive({
  id: '',
  fullName: '',
  email: '',
  position: '',
  phone: '',
  status: 'active' as Employee['status']
});

const editErrors = reactive({
  fullName: '',
  email: '',
  position: '',
  phone: ''
});

const employeeToDelete = ref<Employee | null>(null);

const userInitials = computed(() => {
  const user = authStore.user;
  if (!user?.firstName || !user?.lastName) return 'AD';
  return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
});

const filteredEmployees = computed(() => {
  let filtered = employees.value;
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(emp => 
      emp.fullName.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.position.toLowerCase().includes(query)
    );
  }
  
  // Filter by status
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(emp => emp.status === statusFilter.value);
  }
  
  return filtered;
});

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const getStatusVariant = (status: Employee['status']) => {
  switch (status) {
    case 'active': return 'success';
    case 'pending': return 'warning';
    case 'inactive': return 'error';
    default: return 'default';
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const addEmployee = async () => {
  // Reset errors
  Object.keys(employeeErrors).forEach(key => {
    employeeErrors[key as keyof typeof employeeErrors] = '';
  });
  
  // Validate
  if (!employeeForm.fullName.trim()) {
    employeeErrors.fullName = t('validation.required');
    return;
  }
  
  if (!employeeForm.email.trim()) {
    employeeErrors.email = t('validation.required');
    return;
  }
  
  if (!employeeForm.position.trim()) {
    employeeErrors.position = t('validation.required');
    return;
  }
  
  // Check if email already exists
  if (employees.value.some(emp => emp.email === employeeForm.email)) {
    employeeErrors.email = t('employees.errors.emailExists');
    return;
  }
  
  addLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEmployee: Employee = {
      id: Date.now().toString(),
      fullName: employeeForm.fullName,
      email: employeeForm.email,
      position: employeeForm.position,
      phone: employeeForm.phone,
      status: 'pending',
      joinDate: new Date(),
      lastActive: new Date()
    };
    
    employees.value.push(newEmployee);
    stats.totalEmployees++;
    stats.pendingEmployees++;
    
    // Reset form
    employeeForm.fullName = '';
    employeeForm.email = '';
    employeeForm.position = '';
    employeeForm.phone = '';
    
    showAddModal.value = false;
    toast.success(t('employees.messages.employeeAdded'));
  } catch (error) {
    toast.error(t('employees.messages.employeeAddError'));
  } finally {
    addLoading.value = false;
  }
};

const editEmployee = (employee: Employee) => {
  editForm.id = employee.id;
  editForm.fullName = employee.fullName;
  editForm.email = employee.email;
  editForm.position = employee.position;
  editForm.phone = employee.phone || '';
  editForm.status = employee.status;
  
  showEditModal.value = true;
};

const updateEmployee = async () => {
  // Reset errors
  Object.keys(editErrors).forEach(key => {
    editErrors[key as keyof typeof editErrors] = '';
  });
  
  // Validate
  if (!editForm.fullName.trim()) {
    editErrors.fullName = t('validation.required');
    return;
  }
  
  if (!editForm.position.trim()) {
    editErrors.position = t('validation.required');
    return;
  }
  
  editLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const employeeIndex = employees.value.findIndex(emp => emp.id === editForm.id);
    if (employeeIndex !== -1) {
      const oldStatus = employees.value[employeeIndex].status;
      
      employees.value[employeeIndex] = {
        ...employees.value[employeeIndex],
        fullName: editForm.fullName,
        position: editForm.position,
        phone: editForm.phone,
        status: editForm.status
      };
      
      // Update stats if status changed
      if (oldStatus !== editForm.status) {
        if (oldStatus === 'active') stats.activeEmployees--;
        if (oldStatus === 'pending') stats.pendingEmployees--;
        
        if (editForm.status === 'active') stats.activeEmployees++;
        if (editForm.status === 'pending') stats.pendingEmployees++;
      }
    }
    
    showEditModal.value = false;
    toast.success(t('employees.messages.employeeUpdated'));
  } catch (error) {
    toast.error(t('employees.messages.employeeUpdateError'));
  } finally {
    editLoading.value = false;
  }
};

const deleteEmployee = (employee: Employee) => {
  employeeToDelete.value = employee;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (!employeeToDelete.value) return;
  
  deleteLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const employee = employeeToDelete.value;
    employees.value = employees.value.filter(emp => emp.id !== employee.id);
    
    // Update stats
    stats.totalEmployees--;
    if (employee.status === 'active') stats.activeEmployees--;
    if (employee.status === 'pending') stats.pendingEmployees--;
    
    showDeleteModal.value = false;
    employeeToDelete.value = null;
    toast.success(t('employees.messages.employeeDeleted'));
  } catch (error) {
    toast.error(t('employees.messages.employeeDeleteError'));
  } finally {
    deleteLoading.value = false;
  }
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    toast.success(t('auth.messages.logoutSuccess'));
    router.push('/login');
  } catch (error) {
    toast.error(t('auth.messages.logoutError'));
  }
};

const handleClickOutside = (event: Event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
    showUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>