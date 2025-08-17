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
import Help from '@/views/public/HelpView.vue';
import Pricing from '@/views/public/PricingView.vue';
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
    
    // Dashboards
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresRole: UserRole.ADMIN, title: 'Dashboard Admin' }
    },
    {
      path: '/employee/dashboard',
      name: 'employee-dashboard',
      component: EmployeeDashboard,
      meta: { requiresAuth: true, requiresRole: UserRole.EMPLOYEE, title: 'Dashboard Empleado' }
    },
    
    // Configuración
    {
      path: '/settings/account',
      name: 'account-settings',
      component: AccountSettings,
      meta: { requiresAuth: true, title: 'Configuración de Cuenta' }
    },

    
    // Proceso de reclutamiento
    {
      path: '/recruitment/start',
      name: 'start-recruitment',
      component: StartRecruitment,
      meta: { requiresAuth: true, title: 'Iniciar Reclutamiento' }
    },
    {
      path: '/recruitment/upload',
      name: 'upload-resumes',
      component: UploadResumes,
      meta: { requiresAuth: true, title: 'Subir CVs' }
    },
    {
      path: '/recruitment/processing',
      name: 'processing-results',
      component: ProcessingResults,
      meta: { requiresAuth: true, title: 'Procesamiento y Resultados' }
    },

    {
      path: '/candidate/:id/report',
      name: 'candidate-report',
      component: CandidateReport,
      meta: { requiresAuth: true, title: 'Reporte de Candidato' },
      props: true
    },
    
    // Gestión de empleados (solo admin)
    {
      path: '/admin/employees',
      name: 'employee-management',
      component: EmployeeManagement,
      meta: { requiresAuth: true, requiresRole: UserRole.ADMIN, title: 'Gestión de Empleados' }
    },
    
    // Redirecciones
    {
      path: '/dashboard',
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
