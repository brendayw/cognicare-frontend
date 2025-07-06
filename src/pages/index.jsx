export { default as Dashboard } from "./Dashboard";
export { default as Patients } from "./Patients";
export { default as ProfessionalProfile } from "./ProfessionalProfile";
export { default as Settings } from "./Settings";

//Dashboard categories
export { default as Diagnosis } from "./Dashboard/categories/Diagnosis";
export { default as Discharged } from "./Dashboard/categories/Discharged";
export { default as Treatment } from "./Dashboard/categories/Treatment";

//Dashboard forms
export { default as AssessmentForm } from "./Dashboard/forms/Assessment";
export { default as PatientForm } from "./Dashboard/forms/Patient";
export { default as ReportForm } from "./Dashboard/forms/Report";
export { default as SessionForm } from "./Dashboard/forms/Session";

//Patients
export { default as PatientProfile } from "./patients/PatientProfile.jsx";
export { default as EditPatientForm } from "./patients/EditPatient.jsx";

//Patients assessments
export { default as Assessments } from './patients/assessments/Assessments.jsx';
export { default as EditAssessmentForm } from './patients/assessments/EditAssessment.jsx';

//Patients reports
export { default as Reports } from './patients/reports/Reports.jsx';
export { default as EditReportForm } from './patients/reports/EditReport.jsx';

//Patients sessions
export { default as Sessions }from './patients/sessions/Sessions.jsx';
export { default as EditSessionForm } from './patients/sessions/EditSession.jsx';

//Profesional
export { default as EditProfessionalForm } from './professional/EditProfessional.jsx';