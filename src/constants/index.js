import { countriesList } from "./countries";
import { provincesList } from "./provinces";

export const apiTimeout = 1000 * 15; // 15 sec
// export const apiBaseUrl = 'http://localhost:4000'
export const apiBaseUrl = "https://edu-search-api.herokuapp.com/";
export const boxShadow = "0px 5px 25px 0px rgba(0, 0, 0, 0.2)";
export const bucketBaseURL =
  "https://bucket-personal-test-jonidelv.s3.us-east-2.amazonaws.com/";


export const dashboardCardTypes = {
  FAVOURITE_TO_EXPIRE: "FAVOURITE_TO_EXPIRE",
  PERSONAL_DATA_COMPLETED: "PERSONAL_DATA_COMPLETED",
  ACTIVE_APPLICATIONS: "ACTIVE_APPLICATIONS",
  PUBLISHED_RESULTS: "PUBLISHED_RESULTS",
  NEW_CONTESTS: "NEW_CONTESTS",
};

export const contestSteps = [
  "Primer llamado a Docentes",
  "Análisis de solicitudes",
  "Entrevistas a los docentes",
  "Coloquio",
  "Calificación de postulaciones",
  "Publicacion de resultados",
  "Cierre del concurso",
];

export const noInformation = "Sin Información";

export const noInformationSection =
  "Aún no has cargado ningun elemento en esta categoría";

export const roles = {
  Teacher: "Teacher",
  UAdmin: "UAdmin",
  UCouncilMember: "UCouncilMember",
  UHumanResources: "UHumanResources",
};

export const resumeSectionsEnum = {
  Degree: "Degree",
  FurtherTraining: "FurtherTraining",
  Scholarship: "Scholarship",
  TeachingBackground: "TeachingBackground",
  ManagementBackground: "ManagementBackground",
  ResearchBackground: "ResearchBackground",
  HRBackground: "HRBackground",
  EvaluationBackground: "EvaluationBackground",
  STBackground: "STBackground",
  AcademicProduction: "AcademicProduction",
  Award: "Award",
  Other: "Other",
  
};
export const resumeSections = [
  { key: "4", value: "Degree", description: "Formación Superior y Media", fieldsToShow: { subType: true, institution: true, title: true, startYear: true, endYear: true, currentSituation: true } },
  { key: "5", value: "FurtherTraining", description: "Formacion Complementaria", fieldsToShow: { subType: true, title: true, institution: true, endYear: true } },
  { key: "6", value: "Scholarship", description: "Becas", fieldsToShow: { title: true, subType: true, institution: true, startYear: true, endYear: true, currentSituation: true } },
  { key: "7", value: "TeachingBackground", description: "Antecedentes en Docencia", fieldsToShow: { subType: true, title: true, institution: true, startYear: true, endYear: true, currentSituation: true, subject: true, duration: true } },
  { key: "8", value: "ManagementBackground", description: "Antecedentes en Gestión", fieldsToShow: { subType: true, title: true, institution: true, startYear: true, endYear: true, currentSituation: true } },
  { key: "9", value: "ResearchBackground", description: "Antecedentes en Investigación", fieldsToShow: { title: true, institution: true, startYear: true, endYear: true, currentSituation: true } },
  { key: "10", value: "HRBackground", description: "Antecedentes en Formación y RRHH", fieldsToShow: { title: true, institution: true, startYear: true, endYear: true, currentSituation: true } },
  { key: "11", value: "EvaluationBackground", description: "Antecedentes en Evaluación", fieldsToShow: { title: true, institution: true, startYear: true, endYear: true, currentSituation: true } },
  { key: "12", value: "STBackground", description: "Antecedentes en Ciencia y Tecnología", fieldsToShow: { title: true, institution: true, startYear: true, endYear: true, currentSituation: true } },
  { key: "13", value: "AcademicProduction", description: "Producciones Academicas", fieldsToShow: { title: true, institution: true, endYear: true, currentSituation: true } },
  { key: "14", value: "Award", description: "Premios", fieldsToShow: { title: true, institution: true, endYear: true, currentSituation: true } },
  { key: "15", value: "Other", description: "Otros Antecedentes Profesionales Relevantes", fieldsToShow: { title: true, institution: true, startYear: true, endYear: true, currentSituation: true } }
];


export const countries = countriesList;

export const provinces = provincesList;

export const degreeTypes = [
  { value: "Secondary", description: "Secundario" },
  { value: "NonUniversitary", description: "No Universitario" },
  { value: "NonUniversitary-PostTitle", description: "No Universitario - PostTitulo" },
  { value: "Grade", description: "Grado" },
  { value: "Postgraduate-Specialization", description: "PostGrado - Especializacion" },
  { value: "Postgraduate-Master", description: "PostGrado - Maestria" },
  { value: "Postgraduate-Doctorate", description: "PostGrado - Doctorado" }
];

export const situationTypes = [
  { value: "Ended", description: "Terminado" },
  { value: "Current", description: "En proceso" },
  { value: "Quit", description: "Abandonó" },
];

export const periodTypes = [
  { value: "Yearly", description: "Anual" },
  { value: "Quarterly", description: "Cuatrimestral" },
  { value: "Bimonthly", description: "Bimerstral" },
];

export const contestTypes = {
  all: "all",
  postulations: "postulations",
  favourites: "favourites"
}