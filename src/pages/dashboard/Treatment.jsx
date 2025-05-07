import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/Menu.jsx';
import VistaSelector from '../../components/VistaSelector.jsx';
import TreatmentList from '../../components/dashboard/Treatment/TreatmentList.jsx';

export default function Diagnosis() {
    const [patients, setPatients] = useState([]);
    const [view, setView] = useState('grid');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerPacientesEnTratamiento = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token no encontrado');
                
                const response = await axios.get('http://localhost:5000/api/patients/treatment', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.data && response.data.success && response.data.data) {
                    // Si data.data contiene directamente las filas de pacientes
                    if (Array.isArray(response.data.data)) {
                        setPatients(response.data.data);
                    } 
                    // Si data.data contiene un objeto con rows
                    else if (response.data.data.rows) {
                        setPatients(response.data.data.rows);
                    }
                    // Si es otro tipo de objeto con datos de pacientes
                    else {
                        setPatients([response.data.data]);
                    }
                } else {
                    throw new Error('Estructura de datos inesperada');
                }
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
                setPatients([]);
            } finally {
                setLoading(false);
            }
        };
        
        obtenerPacientesEnTratamiento();
    }, []);
    
    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <div className='h-screen'>
            <Menu/>
            <div className='h-screen'>
                <VistaSelector currentView={view} onViewChange={handleViewChange} />
                {loading ? (
                    <div className=''>Cargando pacientes...</div>
                ) : error ? (
                    <div className=''>{error}</div>
                ) : (
                    <TreatmentList pacientes={patients} vista={view} />
                )}
            </div>
        </div>
    );
}