import { useState, useEffect } from 'react';
import axios from 'axios';

const useSessionsData = (patientId) => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}patients/${patientId}/sessions`, {
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
            } catch (error) {        
                setError('Error al cargar datos: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [patientId]);

    const handleSessionDeleted = (deletedId) => {
        setSessions(prev => prev.filter(a => a.id !== deletedId));
    };

    return { sessions, error, loading, handleSessionDeleted };
};

export default useSessionsData;