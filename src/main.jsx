import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import ProfesionalProfile from './pages/ProfesionalProfile.jsx';
import EditProfesional from './pages/EditProfesional.jsx';
import Settings from './pages/Settings.jsx';
import Diagnosis from './pages/dashboard/categories/Diagnosis.jsx';
import Treatment from './pages/dashboard/categories/Treatment.jsx';
import Discharged from './pages/dashboard/categories/Discharged.jsx';
import PatientProfile from './pages/patients/PatientProfile.jsx';
import Patient from './pages/dashboard/forms/Patient.jsx';
import EditPatient from './pages/patients/EditPatient.jsx';
import Session from './pages/dashboard/forms/Session.jsx';
import Sessions from './pages/patients/sessions/Sessions.jsx';
import EditSession from './pages/patients/sessions/EditSession.jsx';
import Assessment from './pages/dashboard/forms/Assessment.jsx';
import Assessments from './pages/patients/assessments/Assessments.jsx';
import EditAssessment from './pages/patients/assessments/EditAssessment.jsx';
import Reports from './pages/patients/reports/Reports.jsx';
import Report from './pages/dashboard/forms/Report.jsx';
import EditReport from './pages/patients/reports/EditReport.jsx';
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
        <Route path="/patients/add" element={<Patient />} />
        <Route path="/patients/diagnosis" element={<Diagnosis />} />
        <Route path="/patients/treatment" element={<Treatment />} />
        <Route path="/patients/discharged" element={<Discharged />} />
        <Route path="/patients/profile/:id" element={<PatientProfile />} />
        <Route path="/patients/profile/:id/edit" element={<EditPatient />} />
        
        {/* Sesiones del paciente */}
        <Route path="/patients/session/add" element={<Session />} />
        <Route path="/patients/profile/:id/sessions" element={<Sessions />} />
        <Route path="/patients/profile/:patientId/sessions/edit/:sessionId" element={<EditSession />} />
        
        {/* Evaluaciones del paciente */}
        <Route path="/patients/assessments/add" element={<Assessment />} />
        <Route path="/patients/profile/:id/assessments" element={<Assessments />} />
        <Route path="/patients/profile/:patientId/assessments/edit/:assessmentId" element={<EditAssessment />} />

        {/* Reportes del paciente */}
        <Route path="/patients/reports/add" element={<Report />} />
        <Route path="/patients/profile/:id/reports" element={<Reports />} />
        <Route path="/patients/profile/:patientId/reports/edit/:reportId" element={<EditReport />} />


        <Route path="/profesional/:id" element={<ProfesionalProfile />} />
        <Route path="/profesional" element={<ProfesionalProfile />} />
        <Route path="/profesional/:id/edit" element={<EditProfesional />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
    </Routes>
  </BrowserRouter>
)