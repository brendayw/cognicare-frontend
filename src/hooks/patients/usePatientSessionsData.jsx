import { useState, useEffect } from 'react';
import axios from 'axios';

const usePatientSessionsData = () => {
    const [data, setData] = useState({
        names: [],
        completedSessions: [],
        totalSessions: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchPatientsSessions = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}api/patients`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const chartData = response.data.data;
                const treatmentPatients = chartData.filter(p => p.estado === 'tratamiento');
                const diagnosticPatients = chartData.filter(p => p.estado === 'diagnóstico');
                const relevantPatients = [...treatmentPatients, ...diagnosticPatients];

                setData({
                    names: relevantPatients.map(p => p.nombre_completo),
                    completedSessions: relevantPatients.map(p => p.sesiones_realizadas),
                    totalSessions: relevantPatients.map(p => p.sesiones_totales),
                    loading: false,
                    error: null
                });
            } catch (err) {
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Error al cargar datos: ' + (err.message || 'Error desconocido')
                }));
            }
        };

        fetchPatientsSessions();
    }, []);

    return data;
};

export default usePatientSessionsData;
