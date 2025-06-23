import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import Menu from '../../components/ui/Menu.jsx';
import ReportsList from '../../components/reports/ReportsList.jsx';


export default function Reports() {
    const [reports, setReports] = useState([]);
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerReportesDelPaciente = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}patients/${id}/reports`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            
                if (response.data?.success) {
                    if (Array.isArray(response.data.data)) {
                        setReports(response.data.data);
                    } else if (response.data.data?.rows && Array.isArray(response.data.data.rows)) {
                        setReports(response.data.data.rows);
                    } else {
                        setReports([]);
                        setError('No se encontraron reportes asociadas al paciente');
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
        obtenerReportesDelPaciente();
    }, [id]);

    const handleReportDeleted = (deletedId) => {
        setReports(prev => prev.filter(a => a.id !== deletedId));
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
                    <ReportsList reports={reports} error={error} onReportDeleted={handleReportDeleted}/>
                )}
            </div>
        </div>
    );
}