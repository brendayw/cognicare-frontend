import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import Menu from '../../components/ui/Menu.jsx';
import AssessmentsList from '../../components/assessments/AssessmentsList.jsx';

export default function Assessments() {
    const [assessments, setAssessments] = useState([]);
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerEvaluacionesDelPaciente = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}patients/${id}/assessments`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("Respuesta recibida del listado de evaluaciones:", response); 
            
                if (response.data?.success) {
                    if (Array.isArray(response.data.data)) {
                        console.log("Evaluaciones del paciente recibidas (array directo):", response.data.data.length);
                        setAssessments(response.data.data);
                    } 
                    else if (response.data.data?.rows && Array.isArray(response.data.data.rows)) {
                        console.log("Evaluacione recibidas (en propiedad rows):", response.data.data.rows.length);
                        setAssessments(response.data.data.rows);
                    }
                    else {
                        console.log("No hay evaluaciones registradas");
                        setAssessments([]);
                        setError('No se encontraron evalucioanes asociadas al paciente');
                    }
                } else {
                    throw new Error(response.data?.message || 'La respuesta no indica éxito');
                }
                
            } catch (err) {
                console.error('Error al obtener evaluaciones:', {
                    error: err,
                    response: err.response?.data,
                    stack: err.stack
                });
        
                setError('Error al cargar datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        
        obtenerEvaluacionesDelPaciente();
    }, [id]);

    const handleAssessmentDeleted = (deletedId) => {
        setAssessments(prev => prev.filter(a => a.id !== deletedId));
    };

    return (
        <div className='h-screen'>
            <Menu />
            <div className='h-screen'>
                {loading ? (
                    <div className=''>Cargando pacientes...</div>
                ) : error ? (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <AssessmentsList assessments={assessments} error={error} onAssessmentDeleted={handleAssessmentDeleted}/>
                )}
            </div>
        </div>
    );
}