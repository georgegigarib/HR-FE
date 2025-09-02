import { processing } from './es.recruitment.step3.processing.local'
import { results } from './es.recruitment.step3.results.local'

export const step3 = {
  title: 'Análisis completado',
  processing,
  results,
  ready: {
    title: '¡Todo listo!',
    description: 'Los CVs han sido procesados y están listos para su revisión',
    start: 'Ver resultados'
  }
}
