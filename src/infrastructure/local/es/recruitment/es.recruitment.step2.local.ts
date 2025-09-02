import { instructions } from './es.recruitment.step2.instructions.local'

export const step2 = {
  title: 'Subir CVs',
  uploading: 'Subiendo archivos...',
  validation: {
    invalidType: 'Tipo de archivo no válido. Solo se permiten archivos PDF.'
  },
  filesAdded: 'archivos añadidos',
  filesSelected: 'archivos seleccionados',
  fileList: {
    title: 'Lista de archivos',
    clearAll: 'Borrar todo'
  },
  addMore: 'Agregar más',
  errors: {
    title: 'Errores de carga'
  },
  instructions,
  dropzone: {
    title: 'Arrastra y suelta tus archivos aquí',
    subtitle: 'o haz clic para seleccionar archivos',
    browse: 'Examinar archivos'
  },
  continue: 'Continuar',
  success: 'CVs subidos con éxito'
}
