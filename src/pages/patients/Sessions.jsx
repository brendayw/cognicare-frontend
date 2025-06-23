import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import Menu from '../../components/ui/Menu.jsx';
import SessionsList from '../../components/sessions/SessionsList.jsx';

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerSesionesDelPaciente = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}patients/${id}/sessions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            
                if (response.data?.success) {
                    if (Array.isArray(response.data.data)) {
                        setSessions(response.data.data);
                    } else if (response.data.data?.rows && Array.isArray(response.data.data.rows)) {
                        setSessions(response.data.data.rows);
                    } else {
                        setSessions([]);
                        setError('No se encontraron sesiones asociadas al paciente');
                    }
                } else {
                    throw new Error(response.data?.message || 'La respuesta no indica éxito');
                }
            } catch (err) {        
                setError('Error al cargar datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        obtenerSesionesDelPaciente();
    }, [id]);

    const handleSessionDeleted = (deletedId) => {
        setSessions(prev => prev.filter(a => a.id !== deletedId));
    };

    return (
        <div className='h-screen'>
            <Menu/>
            <div className='h-screen'>
                {loading ? (
                    <div className=''>Cargando pacientes...</div>
                ) : error ? (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <SessionsList sessions={sessions} error={error} onSessionDeleted={handleSessionDeleted}/>
                )}
            </div>
        </div>
    );
}