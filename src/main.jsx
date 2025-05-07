import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PatientsList from './pages/PatientsList.jsx';
import ProfesionalProfile from './pages/ProfesionalProfile.jsx';
import Settings from './pages/Settings.jsx';
import Diagnosis from './pages/dashboard/Diagnosis.jsx';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/diagnosis" element={<Diagnosis />} />
        <Route path="/profesional" element={<ProfesionalProfile />} />
        <Route path="/settings" element={<Settings />} />

      </Route>
    </Routes>
  </BrowserRouter>
)