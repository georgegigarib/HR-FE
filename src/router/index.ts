import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { UserRole } from '@/domain/models/User';

// Importar vistas
import Home from '@/views/HomeView.vue';
import Login from '@/views/auth/LoginView.vue';
import Register from '@/views/auth/RegisterView.vue';
import ForgotPassword from '@/views/auth/ForgotPasswordView.vue';
import ResetPassword from '@/views/auth/ResetPasswordView.vue';
import Services from '@/views/public/ServicesView.vue';
import Help from '@/presentation/help/views/HelpView.vue';
import Pricing from '@/presentation/pricing/views/PricingView.vue';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import AdminDashboard from '@/views/dashboard/AdminDashboardView.vue';
import EmployeeDashboard from '@/views/dashboard/EmployeeDashboardView.vue';
import AccountSettings from '@/views/dashboard/AccountSettingsView.vue';
import StartRecruitment from '@/views/recruitment/RecruitmentStep1View.vue';
import UploadResumes from '@/views/recruitment/RecruitmentStep2View.vue';
import ProcessingResults from '@/views/recruitment/RecruitmentStep3View.vue';
import CandidateReport from '@/views/recruitment/CandidateReportView.vue';
import EmployeeManagement from '@/views/dashboard/EmployeeManagementView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Rutas públicas
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false, title: 'Inicio' }
    },
    {
      path: '/services',
      name: 'services',
      component: Services,
      meta: { requiresAuth: false, title: 'Servicios' }
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
      meta: { requiresAuth: false, title: 'Ayuda' }
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: Pricing,
      meta: { requiresAuth: false, title: 'Precios' }
    },
    
    // Rutas de autenticación
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false, requiresGuest: true, title: 'Iniciar Sesión' }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false, requiresGuest: true, title: 'Registro' }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: { requiresAuth: false, requiresGuest: true, title: 'Recuperar Contraseña' }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: { requiresAuth: false, requiresGuest: true, title: 'Restablecer Contraseña' }
    },
    
    // Rutas autenticadas con layout
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        // Redirección automática basada en rol
        {
          path: '',
          redirect: (to) => {
            const authStore = useAuthStore();
            if (authStore.isAdmin) {
              return { name: 'admin-dashboard' };
            } else if (authStore.isEmployee) {
              return { name: 'employee-dashboard' };
            }
            return { name: 'login' };
          }
        },
        // Configuración
        {
          path: 'settings',
          name: 'account-settings',
          component: AccountSettings,
          meta: { requiresAuth: true, title: 'Configuración de Cuenta' }
        },
        // Gestión de empleados (solo admin)
        {
          path: 'employees',
          name: 'employee-management',
          component: EmployeeManagement,
          meta: { requiresAuth: true, requiresRole: UserRole.ADMIN, title: 'Gestión de Empleados' }
        }
      ]
    },
    
    // Dashboards
    {
      path: '/admin',
      component: DashboardLayout,
      meta: { requiresAuth: true, requiresRole: UserRole.ADMIN },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard,
          meta: { requiresAuth: true, requiresRole: UserRole.ADMIN, title: 'Dashboard Admin' }
        }
      ]
    },
    {
      path: '/employee',
      component: DashboardLayout,
      meta: { requiresAuth: true, requiresRole: UserRole.EMPLOYEE },
      children: [
        {
          path: 'dashboard',
          name: 'employee-dashboard',
          component: EmployeeDashboard,
          meta: { requiresAuth: true, requiresRole: UserRole.EMPLOYEE, title: 'Dashboard Empleado' }
        }
      ]
    },
    
    // Proceso de reclutamiento
    {
      path: '/recruitment',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'step-1',
          name: 'start-recruitment',
          component: StartRecruitment,
          meta: { requiresAuth: true, title: 'Iniciar Reclutamiento' }
        },
        {
          path: 'step-2',
          name: 'upload-resumes',
          component: UploadResumes,
          meta: { requiresAuth: true, title: 'Subir CVs' }
        },
        {
          path: 'step-3',
          name: 'processing-results',
          component: ProcessingResults,
          meta: { requiresAuth: true, title: 'Procesamiento y Resultados' }
        }
      ]
    },

    {
      path: '/candidate/:id/report',
      name: 'candidate-report',
      component: DashboardLayout,
      meta: { requiresAuth: true, title: 'Reporte de Candidato' },
      children: [
        {
          path: '',
          component: CandidateReport,
          props: true
        }
      ]
    },
    
    // Redirecciones de compatibilidad
    {
      path: '/recruitment/start',
      redirect: { name: 'start-recruitment' }
    },
    {
      path: '/recruitment/upload',
      redirect: { name: 'upload-resumes' }
    },
    {
      path: '/recruitment/processing',
      redirect: { name: 'processing-results' }
    },
    {
      path: '/settings/account',
      redirect: { name: 'account-settings' }
    },
    {
      path: '/admin/employees',
      redirect: { name: 'employee-management' }
    },
    
    // Error 404 - redirect to home for now
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
});

// Guards de navegación
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Actualizar título de la página
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_NAME || 'HR CV Analysis'}`;
  }
  
  // Verificar si el usuario está autenticado
  if (!authStore.isAuthenticated && authStore.accessToken) {
    try {
      await authStore.getCurrentUser();
    } catch (error) {
      console.error('Error getting current user:', error);
      authStore.logout();
    }
  }
  
  // Verificar autenticación requerida
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } });
    return;
  }
  
  // Verificar si requiere ser invitado (no autenticado)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirigir al dashboard apropiado
    if (authStore.isAdmin) {
      next({ name: 'admin-dashboard' });
    } else if (authStore.isEmployee) {
      next({ name: 'employee-dashboard' });
    } else {
      next({ name: 'home' });
    }
    return;
  }
  
  // Verificar rol requerido
  if (to.meta.requiresRole && authStore.user?.role !== to.meta.requiresRole) {
    // Redirigir al dashboard apropiado según el rol
    if (authStore.isAdmin) {
      next({ name: 'admin-dashboard' });
    } else if (authStore.isEmployee) {
      next({ name: 'employee-dashboard' });
    } else {
      next({ name: 'home' });
    }
    return;
  }
  
  next();
});

// Manejar errores de navegación
router.onError((error) => {
  console.error('Router error:', error);
});

export default router;

// Tipos para meta de rutas
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresGuest?: boolean;
    requiresRole?: UserRole;
    title?: string;
  }
}
