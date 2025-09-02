import { aiImprove } from './es.recruitment.step1.improve.local'
import { preferences } from './es.recruitment.step1.preferences.local'

export const step1 = {
  title: 'Descripción del puesto',
  saving: 'Guardando...',
  aiImprove,
  jobDescription: {
    title: 'Descripción del puesto',
    subtitle: 'Describe el puesto que deseas cubrir',
    label: 'Descripción del puesto',
    placeholder: 'Ingresa una descripción detallada del puesto...',
    hint: 'Incluye responsabilidades, requisitos y cualquier información relevante'
  },
  preferences,
  continue: 'Continuar',
  success: 'Descripción del puesto guardada con éxito'
}
