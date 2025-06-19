import { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import Menu from '../../../components/ui/Menu.jsx';
import VistaSelector from '../../../components/ui/VistaSelector.jsx';
import DischargedList from '../../../components/patients/lists/DischargedList.jsx';

export default function Discharged() {
    const [patients, setPatients] = useState([]);
    const [view, setView] = useState('grid');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            if (mobile && view !== 'list') {
                setView('list');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [view]);


    useEffect(() => {
        const obtenerPacientesDeAlta = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';

                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}api/patients/discharged`, {
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
        
        obtenerPacientesDeAlta();
    }, []);
    
    const handleViewChange = (newView) => {
        if (!isMobile) {
            setView(newView);
        }
    };

    const effectiveView = isMobile ? 'list' : view;

    return (
        <div className='h-screen flex flex-col'>
            <Menu/>
            <div className='flex-1 p-2 md:p-4'>
                {!isMobile && (
                    <VistaSelector 
                        currentView={view} 
                        onViewChange={handleViewChange} 
                    />
                )}

                {isMobile && (
                    <div className="mt-24 mb-4 px-2">
                        <h2 className="text-xl font-bold text-[#00a396]">
                            Todos los pacientes
                        </h2>
                    </div>
                )}

                {loading ? (
                    <div className='flex justify-center items-center h-full'>Cargando pacientes...</div>
                ) : error ? (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <DischargedList pacientes={patients} vista={effectiveView} error={error} />
                )}
            </div>
        </div>
    );
}
