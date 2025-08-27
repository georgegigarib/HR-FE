import { processing } from './en.recruitment.step3.processing.local'
import { results } from './en.recruitment.step3.results.local'

export const step3 = {
  title: 'Analysis Complete',
  processing,
  results,
  ready: {
    title: 'All set!',
    description: 'CVs have been processed and are ready for review',
    start: 'View results'
  }
}
