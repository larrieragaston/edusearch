import { countriesList } from './countries'
import { provincesList } from './provinces'

export const apiTimeout = 1000 * 15 // 15 sec
// export const apiBaseUrl = 'http://localhost:4000'
export const apiBaseUrl = 'https://edu-search-api.herokuapp.com/'
export const boxShadow = '0px 5px 25px 0px rgba(0, 0, 0, 0.2)'
export const bucketBaseURL = 'https://bucket-personal-test-jonidelv.s3.us-east-2.amazonaws.com/'
export const fetchModelsParams = {
  offset: 0,
  limit: 5000,
}
export const timeDifference = 30 // minutes
export const maxTime = 18 // hours
export const minTime = 9 // hours

export const theme = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      grey: '#9D9D9D',
      green: 'rgba(30, 194, 156, 1)',
      lightGrey: '#ecebeb',
      primary: '#3BA3F6',
      secondary: '#232323',
    },
    background: {
      paper: 'rgba(250, 250, 250, 1)',
      default: 'rgba(250, 250, 250, .9)',
    },
    primary: {
      light: 'rgba(124, 212, 255, 1)',
      main: 'rgba(59, 163, 246, 1)',
      dark: 'rgba(0, 117, 195, 1)',
      contrastText: 'rgba(250, 250, 250, 1)',
    },
    secondary: {
      light: 'rgba(75, 75, 75, 1)',
      main: 'rgba(35, 35, 35, 1)',
      dark: 'rgba(0, 0, 0, 1)',
      contrastText: 'rgba(250, 250, 250, 1)',
    },
    error: {
      light: 'rgba(230, 110, 126, 1)',
      main: 'rgba(208, 86, 101, 1)',
      dark: 'rgba(150, 52, 62, 1)',
      contrastText: 'rgba(250, 250, 250, 1)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
}

export const dashboardCardTypes = {
  FAVOURITE_TO_EXPIRE: 'FAVOURITE_TO_EXPIRE',
  PERSONAL_DATA_COMPLETED: 'PERSONAL_DATA_COMPLETED',
  ACTIVE_APPLICATIONS: 'ACTIVE_APPLICATIONS',
  PUBLISHED_RESULTS: 'PUBLISHED_RESULTS',
  NEW_CONTESTS: 'NEW_CONTESTS'
}

export const contestSteps = [
  "Primer llamado a Docentes",
  "Análisis de solicitudes",
  "Entrevistas a los docentes",
  "Coloquio",
  "Calificación de postulaciones",
  "Publicacion de resultados",
  "Cierre del concurso"
]

export const noInformation = "Sin Información"

export const roles = {
  Teacher: 'Teacher',
  UAdmin: 'UAdmin',
  UCouncilMember: 'UCouncilMember',
  UHumanResources: 'UHumanResources',
}

export const resumeSectionsEnum = [
  'Degree',
  'FurtherTraining',
  'Scholarship',
  'TeachingBackground',
  'ManagementBackground',
  'ResearchBackground',
  'HRBackground',
  'EvaluationBackground',
  'STBackground',
  'AcademicProduction',
  'Award',
  'Other'
]

export const resumeSections = {
  Degree: 'Degree',
  FurtherTraining: 'FurtherTraining',
  Scholarship: 'Scholarship',
  TeachingBackground: 'TeachingBackground',
  ManagementBackground: 'ManagementBackground',
  ResearchBackground: 'ResearchBackground',
  HRBackground: 'HRBackground',
  EvaluationBackground: 'EvaluationBackground',
  STBackground: 'STBackground',
  AcademicProduction: 'AcademicProduction',
  Award: 'Award',
  Other: 'Other'
}

export const countries = countriesList

export const provinces = provincesList