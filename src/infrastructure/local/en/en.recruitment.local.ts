export const recruitment = {
  step1: {
    title: 'Job Description',
    saving: 'Saving...',
    aiImprove: {
      modalTitle: 'Improving description with AI',
      improving: 'Improving description...',
      button: 'Improve with AI',
      original: 'Original description',
      improved: 'Improved description',
      warning: 'This action will replace your current description',
      accept: 'Accept improvement',
      accepted: 'Improvement accepted'
    },
    jobDescription: {
      title: 'Job Description',
      subtitle: 'Describe the position you are looking to fill',
      label: 'Job description',
      placeholder: 'Enter a detailed job description...',
      hint: 'Include responsibilities, requirements, and any relevant information'
    },
    preferences: {
      title: 'Candidate Preferences',
      education: 'Education',
      certifications: 'Certifications',
      titles: 'Professional titles',
      skills: 'Skills',
      experience: 'Experience',
      optional: 'Optional',
      experienceForm: 'Required Experience',
      experiencePlaceholder: 'e.g., 3-5 years in web development, React experience...',
      skillsForm: 'Required Skills',
      skillsPlaceholder: 'e.g., JavaScript, React, Node.js, SQL...',
      titlesForm: 'Professional Titles',
      titlesPlaceholder: 'e.g., Frontend Developer, Software Engineer...',
      certificationsForm: 'Required Certifications',
      certificationsPlaceholder: 'e.g., AWS Certified, Google Cloud, Scrum Master...',
      educationForm: 'Required Education',
      educationPlaceholder: 'e.g., Bachelor\'s in Engineering, Master\'s in Computer Science...'
    },
    continue: 'Continue',
    success: 'Job description saved successfully'
  },
  step2: {
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
    instructions: {
      title: 'Upload instructions',
      subtitle: 'Upload candidate CVs for analysis',
      pdfOnly: 'PDF files only',
      maxFiles: 'Maximum 10 files',
      maxSize: 'Max size: 5MB per file'
    },
    dropzone: {
      title: 'Drag and drop your files here',
      subtitle: 'or click to select files',
      browse: 'Browse files'
    },
    continue: 'Continue',
    success: 'CVs uploaded successfully'
  },
  step3: {
    title: 'Analysis Complete',
    processing: {
      title: 'Processing',
      description: 'Analyzing CVs and generating compatibility report',
      results: {
        title: 'Processing results',
        description: 'Analyzing CVs and generating compatibility report'
      },
      progress: 'Analysis progress',
      info: 'This may take a few minutes depending on the number of CVs',
      completed: 'Analysis completed successfully',
      convert: {
        title: 'Convert',
        description: 'Converting CVs',
        button: 'Convert'
      },
      analyze: {
        title: 'Analyze',
        description: 'Analyzing CVs',
        button: 'Analyze'
      }
    },
    results: {
      title: 'Analysis Results',
      subtitle: 'Candidates analyzed and ranked by compatibility',
      exportContacts: 'Export contacts',
      contactsExported: 'Contacts exported successfully',
      topCandidates: 'Top candidates',
      table: {
        name: 'Name',
        career: 'Career',
        compatibility: 'Compatibility',
        actions: 'Actions'
      },
      startNew: 'Start new analysis',
      backToDashboard: 'Back to dashboard'
    },
    ready: {
      title: 'All set!',
      description: 'CVs have been processed and are ready for review',
      start: 'View results'
    }
  },
  step: 'Step',
  of: 'of'
}
