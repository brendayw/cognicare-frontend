import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePatientData = (patientId) => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fecthPatientData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}patients/${patientId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    setPatient(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil.');
                }

            } catch (error) {
                setError('Error al obtener datos: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        if (patientId) fecthPatientData();
    }, [patientId]);

    const handlePatientDeleted = (deletedId) => {
        setProfesional(prev => prev.filter(a => a.id !== deletedId));
    };

    return { patient, loading, error, handlePatientDeleted };
}