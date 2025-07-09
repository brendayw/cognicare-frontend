import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/index.jsx';
import { Dashboard, Patients, ProfessionalProfile, Settings,
  Diagnosis, Discharged, Treatment, AssessmentForm, PatientForm,
  ReportForm, SessionForm, PatientProfile, EditPatientForm, 
  Assessments, EditAssessmentForm, Reports, EditReportForm,
  Sessions, EditSessionForm, EditProfessionalForm
} from './pages/index.jsx';
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Seccion pacientes */}
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/add" element={<PatientForm />} />
        <Route path="/patients/diagnosis" element={<Diagnosis />} />
        <Route path="/patients/treatment" element={<Treatment />} />
        <Route path="/patients/discharged" element={<Discharged />} />
        <Route path="/patients/profile/:id" element={<PatientProfile />} />
        <Route path="/patients/profile" element={<PatientProfile />} />
        <Route path="/patients/profile/:id/edit" element={<EditPatientForm />} />
        
        {/* Sesiones del paciente */}
        <Route path="/patients/session/add" element={<SessionForm />} />
        <Route path="/patients/profile/:id/sessions" element={<Sessions />} />
        <Route path="/patients/profile/:patientId/sessions/edit/:sessionId" element={<EditSessionForm />} />
        
        {/* Evaluaciones del paciente */}
        <Route path="/patients/assessments/add" element={<AssessmentForm />} />
        <Route path="/patients/profile/:id/assessments" element={<Assessments />} />
        <Route path="/patients/profile/:patientId/assessments/edit/:assessmentId" element={<EditAssessmentForm />} />

        {/* Reportes del paciente */}
        <Route path="/patients/reports/add" element={<ReportForm />} />
        <Route path="/patients/profile/:id/reports" element={<Reports />} />
        <Route path="/patients/profile/:patientId/reports/edit/:reportId" element={<EditReportForm />} />


        <Route path="/profesional/:id" element={<ProfessionalProfile />} />
        <Route path="/profesional" element={<ProfessionalProfile />} />
        <Route path="/profesional/:id/edit" element={<EditProfessionalForm />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
    </Routes>
  </BrowserRouter>
)