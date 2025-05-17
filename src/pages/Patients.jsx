import { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../components/Menu.jsx';
import VistaSelector from '../components/VistaSelector.jsx';
import PatientsList from '../components/pacients-list/PatientsList.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Patients() {
    const [patients, setPatients] = useState([]);
    const [view, setView] = useState('grid');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerTodosLosPacientes = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';

                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}api/patients`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("Respuesta recibida del listado de pacientes:", response); 
            
                if (response.data && response.data.success) {
                console.log("Datos recibidos:", response.data.data);
                
                if (Array.isArray(response.data.data)) {
                    console.log("Número de pacientes:", response.data.data.length);
                    setPatients(response.data.data);
                } 

                else if (response.data.data.rows) {
                    console.log("Número de pacientes (rows):", response.data.data.rows.length);
                    setPatients(response.data.data.rows);
                }
                else {
                    console.log("Recibido objeto único de paciente");
                    setPatients([response.data.data]);
                }
                
            } else {
                throw new Error(response.data.message || 'Estructura de datos inesperada');
            }
                
            } catch (err) {
                console.error('Error fetching patients:', err);
                setError('Error al cargar datos: ' + (err.response?.data?.message || err.message || 'Error desconocido') );
                setPatients([]);
            } finally {
                setLoading(false);
            }
        };
        
        obtenerTodosLosPacientes();
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
                    <PatientsList pacientes={patients} vista={view} />
                )}
            </div>
        </div>
    );
}