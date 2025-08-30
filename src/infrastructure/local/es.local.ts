import { account } from './es/account/es.account.local'
import { common } from './es/es.common.local'
import { navigation } from './es/es.navigation.local'
import { roles } from './es/es.roles.local'

export const es = {
  hello: 'hola mundo te habla george',
  app: {
    name: 'HR Platform'
  },
  roles,
  navigation,
  dashboard: {
    menu: {
      logout: 'Cerrar sesión',
      profile: 'Perfil',
      settings: 'Configuración'
    },
    admin: {
      title: 'Panel de Administrador',
      stats: {
        totalEmployees: 'Total de Empleados',
        processedCvs: 'CVs Procesados',
        remainingCvs: 'CVs Restantes',
        currentPlan: 'Plan Actual'
      },
      quickActions: {
        recruitment: 'Reclutamiento',
        recruitmentDesc: 'Iniciar un nuevo proceso de reclutamiento',
        startRecruitment: 'Iniciar Reclutamiento',
        employees: 'Empleados',
        employeesDesc: 'Gestionar empleados y perfiles',
        manageEmployees: 'Gestionar Empleados'
      },
      recentActivity: {
        title: 'Actividad Reciente',
        empty: 'No hay actividad reciente',
        emptyDesc: 'La actividad aparecerá aquí cuando comiences a usar la plataforma'
      }
    },
    time: {
      daysAgo: 'hace {count} días',
      hoursAgo: 'hace {count} horas',
      justNow: 'ahora mismo'
    }
  },
  landing: {
    hero: {
      title: 'Revoluciona tu proceso de reclutamiento con',
      highlight: 'IA',
      subtitle: 'Analiza CVs automáticamente, encuentra los mejores candidatos y toma decisiones de contratación más inteligentes con nuestra plataforma impulsada por inteligencia artificial.',
      cta: 'Comenzar ahora',
      demo: 'Ver demo'
    },
    features: {
      title: 'Características principales',
      subtitle: 'Descubre las herramientas que transformarán tu proceso de reclutamiento',
      ai: {
        title: 'Análisis con IA',
        description: 'Algoritmos avanzados analizan CVs y los comparan con descripciones de trabajo para encontrar coincidencias perfectas.'
      },
      analysis: {
        title: 'Análisis detallado',
        description: 'Obtén reportes completos sobre cada candidato con puntuaciones de compatibilidad y recomendaciones.'
      },
      time: {
        title: 'Ahorra tiempo',
        description: 'Reduce el tiempo de selección en un 80% automatizando el proceso inicial de filtrado de candidatos.'
      }
    },
    howItWorks: {
      title: 'Cómo funciona',
      step1: {
        title: 'Sube la descripción del trabajo',
        description: 'Define los requisitos y habilidades necesarias para el puesto.'
      },
      step2: {
        title: 'Carga los CVs',
        description: 'Sube múltiples CVs en formato PDF para análisis automático.'
      },
      step3: {
        title: 'Obtén resultados',
        description: 'Recibe un ranking de candidatos con análisis detallado y recomendaciones.'
      }
    },
    cta: {
      title: '¿Listo para transformar tu reclutamiento?',
      subtitle: 'Únete a cientos de empresas que ya están usando nuestra plataforma para encontrar el talento perfecto.',
      button: 'Comenzar ahora',
      register: 'Crear cuenta gratuita',
      login: 'Iniciar sesión'
    }
  },
  auth: {
    or: 'o',
    login: {
      title: 'Iniciar sesión',
      subtitle: 'Accede a tu cuenta para continuar',
      rememberMe: 'Recordarme',
      forgotPassword: '¿Olvidaste tu contraseña?',
      submit: 'Iniciar sesión',
      loggingIn: 'Iniciando sesión...',
      noAccount: '¿No tienes una cuenta?',
      signUp: 'Regístrate',
      success: 'Sesión iniciada correctamente',
      error: 'Error al iniciar sesión'
    },
    register: {
      title: 'Crear cuenta',
      subtitle: 'Únete a nuestra plataforma',
      step1Title: 'Información de la empresa',
      step2Title: 'Información personal',
      submit: 'Crear cuenta',
      creating: 'Creando cuenta...',
      hasAccount: '¿Ya tienes una cuenta?',
      signIn: 'Inicia sesión',
      success: 'Cuenta creada correctamente',
      error: 'Error al crear la cuenta',
      nextStep: 'Siguiente',
      previousStep: 'Anterior',
      back: 'Atrás',
      acceptTerms: 'Acepto los',
      and: 'y',
      termsLink: 'Términos de Servicio',
      privacyLink: 'Política de Privacidad',
      createAccount: 'Crear Cuenta'
    },
    forgotPassword: {
      title: 'Olvidé mi contraseña',
      subtitle: 'Ingresa tu email para restablecer tu contraseña',
      sending: 'Enviando...',
      submit: 'Enviar enlace de restablecimiento',
      emailSent: '¡Email enviado!',
      checkEmail: 'Enviamos un enlace de restablecimiento a {email}',
      sendAnother: 'Enviar otro email',
      backToLogin: 'Volver al login',
      success: 'Email de restablecimiento enviado exitosamente',
      error: 'Error al enviar email de restablecimiento'
    },
    fields: {
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      firstName: 'Nombre',
      lastName: 'Apellido',
      companyId: 'ID de empresa',
      companyName: 'Nombre de empresa',
      role: 'Rol'
    },
    placeholders: {
      email: 'tu@email.com',
      password: 'Tu contraseña',
      confirmPassword: 'Confirma tu contraseña',
      firstName: 'Tu nombre',
      lastName: 'Tu apellido',
      companyId: 'ID único de empresa',
      companyName: 'Nombre de tu empresa'
    },
    validation: {
      emailRequired: 'El correo electrónico es obligatorio',
      emailInvalid: 'El correo electrónico no es válido',
      passwordRequired: 'La contraseña es obligatoria',
      passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
      confirmPasswordRequired: 'Confirmar contraseña es obligatorio',
      passwordsNotMatch: 'Las contraseñas no coinciden',
      firstNameRequired: 'El nombre es obligatorio',
      lastNameRequired: 'El apellido es obligatorio',
      companyIdRequired: 'El ID de empresa es obligatorio',
      companyNameRequired: 'El nombre de empresa es obligatorio'
    },
    roles: {
      admin: 'Administrador',
      adminDescription: 'Acceso completo a todas las funciones de la plataforma',
      employee: 'Empleado',
      employeeDescription: 'Acceso limitado a funciones específicas del empleado'
    },
    logout: 'Cerrar sesión'
  },
  services: {
    main: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones integrales de análisis de CVs y reclutamiento'
    },
    hero: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones integrales de análisis de CVs y reclutamiento',
      cta: 'Comenzar'
    },
    cvAnalysis: {
      title: 'Análisis de CVs',
      subtitle: 'Análisis avanzado de CVs con IA',
      description: 'Nuestra IA analiza CVs en profundidad, extrayendo información clave y proporcionando puntuaciones detalladas de compatibilidad.',
      features: {
        ai: 'Análisis con IA',
        compatibility: 'Puntuación de compatibilidad',
        extraction: 'Extracción de datos',
        reports: 'Reportes detallados',
        parsing: 'Análisis de contenido',
        matching: 'Coincidencia de perfiles',
        scoring: 'Puntuación automática',
        insights: 'Insights inteligentes'
      }
    },
    aiImprovement: {
      title: 'Mejora de Descripciones de Trabajo con IA',
      subtitle: 'Optimiza tus descripciones de trabajo',
      description: 'Mejora tus descripciones de trabajo con sugerencias de IA para atraer mejores candidatos.',
      features: {
        optimization: 'Optimización de contenido',
        suggestions: 'Sugerencias de IA',
        templates: 'Plantillas profesionales',
        analytics: 'Análisis de rendimiento',
        keywords: 'Optimización de palabras clave',
        clarity: 'Mejora de claridad'
      },
      demo: {
        title: 'Demostración de Mejora con IA',
        before: 'Antes',
        after: 'Después'
      }
    },
    candidateManagement: {
      title: 'Gestión de Candidatos',
      subtitle: 'Sistema completo de gestión de candidatos',
      description: 'Gestiona tus candidatos de manera eficiente con nuestras herramientas integrales.',
      features: {
        ranking: 'Clasificación de candidatos',
        tracking: 'Seguimiento de aplicaciones',
        communication: 'Herramientas de comunicación',
        collaboration: 'Colaboración en equipo',
        reports: 'Reportes detallados',
        export: 'Exportación de datos'
      },
      demo: {
        title: 'Gestión Avanzada de Candidatos',
        export: 'Exportar Resultados'
      }
    },
    additional: {
      title: 'Características Adicionales',
      subtitle: 'Funcionalidades avanzadas para optimizar tu proceso de reclutamiento',
      security: {
        title: 'Seguridad Empresarial',
        description: 'Seguridad de nivel bancario con encriptación SSL y cumplimiento GDPR para proteger tus datos.'
      },
      speed: {
        title: 'Velocidad Ultrarrápida',
        description: 'Procesa cientos de CVs en minutos con nuestros algoritmos de IA optimizados.'
      },
      integration: {
        title: 'Integración Fácil',
        description: 'Integra sin problemas con tus herramientas de RRHH existentes y flujos de trabajo a través de nuestra API.'
      },
      support: {
        title: 'Soporte 24/7',
        description: 'Obtén ayuda cuando la necesites con nuestro equipo de soporte dedicado.'
      }
    },
    cta: {
      title: '¿Listo para Transformar tu Reclutamiento?',
      subtitle: 'Únete a cientos de empresas que ya usan nuestra plataforma para encontrar el talento perfecto.',
      primary: 'Comenzar Prueba Gratuita',
      secondary: 'Programar Demo'
    }
  },
  pricing: {
    hero: {
      title: 'Planes y Precios',
      subtitle: 'Elige el plan perfecto para tus necesidades de análisis de CVs'
    },
    billing: {
      monthly: 'Mensual',
      annual: 'Anual',
      save20: 'Ahorra 20%'
    },
    plans: {
      trial: {
        name: 'Prueba Gratuita',
        period: '7 días gratis',
        description: 'Perfecto para probar nuestra plataforma',
        cta: 'Comenzar Prueba Gratuita',
        features: {
          cvs: '5 análisis de CV',
          users: '1 usuario',
          ai: 'Análisis básico con IA',
          support: 'Soporte por email'
        }
      },
      starter: {
        name: 'Starter',
        period: '/mes',
        description: 'Ideal para pequeñas empresas y reclutadores independientes',
        cta: 'Comenzar con Starter',
        features: {
          cvs: '50 análisis de CV por mes',
          users: '3 usuarios',
          ai: 'Análisis avanzado con IA',
          export: 'Exportar contactos',
          support: 'Soporte por email'
        }
      },
      professional: {
        badge: 'Más Popular',
        name: 'Professional',
        period: '/mes',
        description: 'Para equipos de RRHH que necesitan análisis avanzados',
        cta: 'Comenzar con Professional',
        features: {
          cvs: '200 análisis de CV por mes',
          users: '10 usuarios',
          ai: 'Análisis completo con IA',
          export: 'Exportar contactos ilimitado',
          analytics: 'Analytics y métricas avanzadas',
          support: 'Soporte prioritario'
        }
      },
      enterprise: {
        name: 'Enterprise',
        period: '/mes',
        description: 'Solución completa para grandes organizaciones',
        cta: 'Contactar Ventas',
        features: {
          cvs: 'Análisis ilimitados',
          users: 'Usuarios ilimitados',
          ai: 'IA personalizada y avanzada',
          export: 'Exportar contactos ilimitado',
          analytics: 'Analytics empresariales',
          api: 'Acceso completo a API',
          support: 'Soporte dedicado 24/7'
        }
      }
    },
    comparison: {
      title: 'Compara Nuestros Planes',
      subtitle: 'Encuentra el plan que mejor se adapte a tus necesidades',
      features: 'Características',
      table: {
        cvAnalysis: 'Análisis de CV',
        users: 'Usuarios',
        aiImprovement: 'Mejoras con IA',
        exportContacts: 'Exportar Contactos',
        analytics: 'Analytics',
        apiAccess: 'Acceso a API',
        support: 'Soporte',
        unlimited: 'Ilimitado',
        emailSupport: 'Soporte por Email',
        prioritySupport: 'Soporte Prioritario',
        dedicatedSupport: 'Soporte Dedicado'
      }
    },
    faq: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Respuestas a las preguntas más comunes sobre nuestros planes',
      q1: {
        question: '¿Puedo cambiar de plan en cualquier momento?',
        answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplicarán inmediatamente y se prorrateará la facturación.'
      },
      q2: {
        question: '¿Qué sucede si excedo mi límite de análisis?',
        answer: 'Si excedes tu límite mensual, puedes comprar análisis adicionales o actualizar a un plan superior. Te notificaremos cuando te acerques al límite.'
      },
      q3: {
        question: '¿Ofrecen descuentos para organizaciones sin fines de lucro?',
        answer: 'Sí, ofrecemos descuentos especiales para organizaciones sin fines de lucro y educativas. Contacta a nuestro equipo de ventas para más información.'
      },
      q4: {
        question: '¿Puedo cancelar mi suscripción en cualquier momento?',
        answer: 'Absolutamente. Puedes cancelar tu suscripción en cualquier momento sin penalizaciones. Mantendrás acceso hasta el final de tu período de facturación actual.'
      },
      q5: {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos todas las principales tarjetas de crédito (Visa, MasterCard, American Express) y transferencias bancarias para planes Enterprise.'
      }
    },
    cta: {
      title: '¿Listo para comenzar?',
      subtitle: 'Únete a miles de empresas que ya confían en nuestra plataforma',
      startTrial: 'Comenzar Prueba Gratuita',
      contactSales: 'Contactar Ventas'
    },
    messages: {
      planSelected: 'Plan seleccionado exitosamente'
    }
  },
  help: {
    hero: {
      title: 'Centro de Ayuda',
      subtitle: 'Encuentra respuestas a tus preguntas y aprende a sacar el máximo provecho de nuestra plataforma de análisis de CVs.'
    },
    search: {
      placeholder: 'Buscar en las preguntas frecuentes...'
    },
    quickLinks: {
      gettingStarted: 'Primeros pasos',
      gettingStartedDesc: 'Aprende los conceptos básicos para comenzar',
      account: 'Gestión de cuenta',
      accountDesc: 'Administra tu perfil y configuración',
      billing: 'Facturación y planes',
      billingDesc: 'Información sobre precios y pagos',
      technical: 'Soporte técnico',
      technicalDesc: 'Soluciona problemas técnicos'
    },
    categories: {
      gettingStarted: 'Primeros pasos',
      account: 'Gestión de cuenta',
      billing: 'Facturación y planes',
      technical: 'Soporte técnico'
    },
    faq: {
      title: 'Preguntas frecuentes',
      subtitle: 'Encuentra respuestas rápidas a las preguntas más comunes',
      gettingStarted: {
        q1: {
          question: '¿Cómo empiezo a usar la plataforma?',
          answer: 'Para comenzar, simplemente regístrate con tu correo electrónico, completa la información de tu empresa y podrás acceder inmediatamente a todas las funcionalidades. Te recomendamos comenzar con nuestro tutorial interactivo.'
        },
        q2: {
          question: '¿Qué formatos de CV acepta la plataforma?',
          answer: 'Actualmente aceptamos archivos en formato PDF. Puedes subir hasta 30 CVs simultáneamente para análisis. Los archivos deben tener un tamaño máximo de 10MB cada uno.'
        },
        q3: {
          question: '¿Cómo funciona el análisis con IA?',
          answer: 'Nuestro sistema utiliza algoritmos de procesamiento de lenguaje natural para extraer información clave de los CVs y compararla con los requisitos del puesto. El análisis incluye habilidades, experiencia, educación y compatibilidad general.'
        },
        q4: {
          question: '¿Cuánto tiempo tarda el análisis?',
          answer: 'El análisis típicamente toma entre 2-5 minutos dependiendo del número de CVs. Recibirás una notificación cuando el proceso esté completo y podrás ver los resultados inmediatamente.'
        }
      },
      account: {
        q1: {
          question: '¿Cómo cambio mi contraseña?',
          answer: 'Ve a Configuración de cuenta > Seguridad > Cambiar contraseña. Ingresa tu contraseña actual y la nueva contraseña dos veces. La nueva contraseña debe tener al menos 8 caracteres.'
        },
        q2: {
          question: '¿Puedo agregar más usuarios a mi cuenta?',
          answer: 'Sí, puedes invitar a miembros de tu equipo desde la sección "Gestión de equipo" en tu dashboard. Cada usuario tendrá su propio acceso y podrás asignar diferentes niveles de permisos.'
        },
        q3: {
          question: '¿Cómo actualizo la información de mi empresa?',
          answer: 'La información de la empresa se puede actualizar en Configuración > Perfil de empresa. Puedes cambiar el nombre, dirección, y otra información corporativa en cualquier momento.'
        },
        q4: {
          question: '¿Cómo elimino mi cuenta?',
          answer: 'Para eliminar tu cuenta, contacta a nuestro equipo de soporte. Ten en cuenta que esta acción es irreversible y se eliminarán todos tus datos y análisis guardados.'
        }
      },
      billing: {
        q1: {
          question: '¿Qué planes están disponibles?',
          answer: 'Ofrecemos tres planes: Básico (hasta 50 análisis/mes), Profesional (hasta 200 análisis/mes) y Enterprise (análisis ilimitados). Todos incluyen soporte técnico y actualizaciones gratuitas.'
        },
        q2: {
          question: '¿Puedo cambiar mi plan en cualquier momento?',
          answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento desde la sección de Facturación. Los cambios se aplicarán en tu próximo ciclo de facturación.'
        },
        q3: {
          question: '¿Ofrecen descuentos por pago anual?',
          answer: 'Sí, ofrecemos un 20% de descuento en todos los planes cuando pagas anualmente. El descuento se aplica automáticamente al seleccionar la facturación anual.'
        },
        q4: {
          question: '¿Qué métodos de pago aceptan?',
          answer: 'Aceptamos todas las tarjetas de crédito principales (Visa, MasterCard, American Express), PayPal y transferencias bancarias para cuentas Enterprise.'
        }
      },
      technical: {
        q1: {
          question: '¿Qué hago si el análisis falla?',
          answer: 'Si un análisis falla, verifica que los archivos PDF no estén dañados y tengan texto seleccionable. Si el problema persiste, contacta a soporte técnico con los detalles del error.'
        },
        q2: {
          question: '¿La plataforma funciona en dispositivos móviles?',
          answer: 'Sí, nuestra plataforma es completamente responsive y funciona en tablets y smartphones. Sin embargo, recomendamos usar una computadora para una mejor experiencia al subir múltiples archivos.'
        },
        q3: {
          question: '¿Cómo exporto los resultados?',
          answer: 'Puedes exportar los resultados en formato PDF o Excel desde la página de resultados. Haz clic en el botón "Exportar" y selecciona tu formato preferido.'
        },
        q4: {
          question: '¿Los datos están seguros?',
          answer: 'Sí, utilizamos encriptación SSL/TLS para todas las transmisiones de datos y almacenamiento seguro en la nube. Cumplimos con las regulaciones GDPR y nunca compartimos tu información con terceros.'
        }
      }
    },
    contact: {
      title: '¿Necesitas más ayuda?',
      subtitle: 'Nuestro equipo de soporte está aquí para ayudarte',
      email: {
        title: 'Soporte por email',
        description: 'Envíanos un mensaje y te responderemos en menos de 24 horas',
        action: 'Enviar email'
      },
      chat: {
        title: 'Chat en vivo',
        description: 'Chatea con nuestro equipo de soporte en tiempo real',
        action: 'Iniciar chat',
        comingSoon: 'El chat en vivo estará disponible próximamente'
      },
      phone: {
        title: 'Soporte telefónico',
        description: 'Llámanos de lunes a viernes de 9:00 AM a 6:00 PM',
        action: 'Llamar ahora'
      }
    }
  },
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
