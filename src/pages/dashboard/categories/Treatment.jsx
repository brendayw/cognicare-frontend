import { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../../components/ui/Menu.jsx';
import VistaSelector from '../../../components/ui/VistaSelector.jsx';
import TreatmentList from '../../../components/patients/lists/TreatmentList.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Diagnosis() {
    const [patients, setPatients] = useState([]);
    const [view, setView] = useState('grid');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerPacientesEnTratamiento = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';

                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}api/patients/treatment`, {
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
                setError('Error al cargar datos: ' + err.message);

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
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <TreatmentList pacientes={patients} vista={view} />
                )}
            </div>
        </div>
    );
}