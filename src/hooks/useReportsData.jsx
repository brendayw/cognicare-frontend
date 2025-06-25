import { useState, useEffect } from 'react';
import axios from 'axios';

const useReportsData = (patientId) => { 
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fecthReports = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}patients/${patientId}/reports`, {
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
            } catch (error) {
                setError('Error al cargar datos: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fecthReports();
    }, [patientId]);

    const handleReportDeleted = (deletedId) => {
        setReports(prev => prev.filter(a => a.id !== deletedId));
    };

    return { reports, error, loading, handleReportDeleted };
};
export default useReportsData;