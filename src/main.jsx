import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients.jsx';
import ProfesionalProfile from './pages/ProfesionalProfile.jsx';
import Settings from './pages/Settings.jsx';
import Diagnosis from './pages/dashboard/categories/Diagnosis.jsx';
import Treatment from './pages/dashboard/categories/Treatment.jsx';
import Discharged from './pages/dashboard/categories/Discharged.jsx';
import Patient from './pages/dashboard/forms/Patient.jsx';
import Session from './pages/dashboard/forms/Session.jsx';
import Assessment from './pages/dashboard/forms/Assessment.jsx';
import Report from './pages/dashboard/forms/Report.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/diagnosis" element={<Diagnosis />} />
        <Route path="/patients/treatment" element={<Treatment />} />
        <Route path="/patients/discharged" element={<Discharged />} />
        <Route path="/patients/add" element={<Patient />} />
        <Route path="/patients/session/add" element={<Session />} />
        <Route path="/patients/assessments/add" element={<Assessment />} />
        <Route path="/patients/reports/add" element={<Report />} />
        <Route path="/profesional" element={<ProfesionalProfile />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
    </Routes>
  </BrowserRouter>
)