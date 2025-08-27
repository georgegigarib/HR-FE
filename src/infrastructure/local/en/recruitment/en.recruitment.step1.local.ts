import { aiImprove } from './en.recruitment.step1.improve.local';
import { preferences } from './en.recruitment.step1.preferences.local';

export const step1 = {
  title: 'Job Description',
  saving: 'Saving...',
  aiImprove,
  jobDescription: {
    title: 'Job Description',
    subtitle: 'Describe the position you are looking to fill',
    label: 'Job description',
    placeholder: 'Enter a detailed job description...',
    hint: 'Include responsibilities, requirements, and any relevant information'
  },
  preferences,
  continue: 'Continue',
  success: 'Job description saved successfully'
}
