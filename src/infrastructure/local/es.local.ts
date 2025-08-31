import { account } from './es/account/es.account.local'
import { auth } from './es/auth/es.auth.local'
import { dashboard } from './es/dashboard/es.dashboard.local'
import { common } from './es/es.common.local'
import { navigation } from './es/es.navigation.local'
import { roles } from './es/es.roles.local'
import { help } from './es/help/es.help.local'
import { landing } from './es/landing/es.landing.local'
import { pricing } from './es/pricing/es.pricing.local'
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
  recruitment: {
    step1: {
      title: 'Descripción del Puesto',
      saving: 'Guardando...',
      aiImprove: {
        modalTitle: 'Mejorando descripción con IA',
        improving: 'Mejorando descripción...',
        button: 'Mejorar con IA',
        original: 'Descripción original',
        improved: 'Descripción mejorada',
        warning: 'Esta acción reemplazará tu descripción actual',
        accept: 'Aceptar mejora',
        accepted: 'Mejora aceptada'
      },
      jobDescription: {
        title: 'Descripción del Puesto',
        subtitle: 'Describe el puesto que estás buscando llenar',
        label: 'Descripción del trabajo',
        placeholder: 'Ingresa una descripción detallada del puesto...',
        hint: 'Incluye responsabilidades, requisitos y cualquier información relevante'
      },
      preferences: {
        title: 'Preferencias de Candidatos',
        education: 'Educación',
        certifications: 'Certificaciones',
        titles: 'Títulos profesionales',
        skills: 'Habilidades',
        experience: 'Experiencia',
        optional: 'Opcional',
        experienceForm: 'Experiencia requerida',
        experiencePlaceholder: 'Ej: 3-5 años en desarrollo web, experiencia con React...',
        skillsForm: 'Habilidades requeridas',
        skillsPlaceholder: 'Ej: JavaScript, React, Node.js, SQL...',
        titlesForm: 'Títulos profesionales',
        titlesPlaceholder: 'Ej: Desarrollador Frontend, Ingeniero de Software...',
        certificationsForm: 'Certificaciones requeridas',
        certificationsPlaceholder: 'Ej: AWS Certified, Google Cloud, Scrum Master...',
        educationForm: 'Educación requerida',
        educationPlaceholder: 'Ej: Licenciatura en Ingeniería, Maestría en Ciencias de la Computación...'
      },
      continue: 'Continuar',
      success: 'Descripción del puesto guardada exitosamente'
    },
    step2: {
      title: 'Subir CVs',
      uploading: 'Subiendo archivos...',
      validation: {
        invalidType: 'Tipo de archivo no válido. Solo se permiten archivos PDF.'
      },
      filesAdded: 'archivos agregados',
      filesSelected: 'archivos seleccionados',
      fileList: {
        title: 'Lista de archivos',
        clearAll: 'Limpiar todo'
      },
      addMore: 'Agregar más',
      errors: {
        title: 'Errores de carga'
      },
      instructions: {
        title: 'Instrucciones de carga',
        subtitle: 'Sube los CVs de los candidatos para analizar',
        pdfOnly: 'Solo archivos PDF',
        maxFiles: 'Máximo 10 archivos',
        maxSize: 'Tamaño máximo: 5MB por archivo'
      },
      dropzone: {
        title: 'Arrastra y suelta tus archivos aquí',
        subtitle: 'o haz clic para seleccionar archivos',
        browse: 'Examinar archivos'
      },
      continue: 'Continuar',
      success: 'CVs subidos exitosamente'
    },
    step3: {
      title: 'Análisis Completo',
      processing: {
        title: 'Procesando',
        description: 'Analizando los CVs y generando el informe de compatibilidad',
        results: {
          title: 'Procesando resultados',
          description: 'Analizando los CVs y generando el informe de compatibilidad'
        },
        progress: 'Progreso del análisis',
        info: 'Esto puede tomar unos minutos dependiendo del número de CVs',
        completed: 'Análisis completado exitosamente',
        convert: {
          title: 'Convertir',
          description: 'Convirtiendo los CVs',
          button: 'Convertir'
        },
        analyze: {
          title: 'Analizar',
          description: 'Analizando los CVs',
          button: 'Analizar'
        },
      },
      results: {
        title: 'Resultados del Análisis',
        subtitle: 'Candidatos analizados y clasificados por compatibilidad',
        exportContacts: 'Exportar contactos',
        contactsExported: 'Contactos exportados exitosamente',
        topCandidates: 'Mejores candidatos',
        table: {
          name: 'Nombre',
          career: 'Carrera',
          compatibility: 'Compatibilidad',
          actions: 'Acciones'
        },
        startNew: 'Iniciar nuevo análisis',
        backToDashboard: 'Volver al dashboard'
      },
      ready: {
        title: '¡Todo listo!',
        description: 'Los CVs han sido procesados y están listos para revisar',
        start: 'Ver resultados'
      }
    },
    step: 'Paso',
    of: 'de'
  },
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
