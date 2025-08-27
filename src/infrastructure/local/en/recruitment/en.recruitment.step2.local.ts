import { instructions } from './en.recruitment.step2.instructions.local'

export const step2 = {
  title: 'Upload CVs',
  uploading: 'Uploading files...',
  validation: {
    invalidType: 'Invalid file type. Only PDF files are allowed.'
  },
  filesAdded: 'files added',
  filesSelected: 'files selected',
  fileList: {
    title: 'File list',
    clearAll: 'Clear all'
  },
  addMore: 'Add more',
  errors: {
    title: 'Upload errors'
  },
  instructions,
  dropzone: {
    title: 'Drag and drop your files here',
    subtitle: 'or click to select files',
    browse: 'Browse files'
  },
  continue: 'Continue',
  success: 'CVs uploaded successfully'
}
