import { useState, useEffect } from 'react';
import axios from 'axios';

export const useDiagnosisData = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiagnosisData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}patients/diagnosis`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.data?.success && response.data.data) {
                    const patientsData = Array.isArray(response.data.data)
                        ? response.data.data
                        : response.data.data.rows
                        ? response.data.data.rows
                        : [response.data.data];

                    setPatients(patientsData);
                } else {
                    throw new Error('Estructura de datos inesperada');
                }

            } catch (error) {
                setError('Error al cargar datos: ' + err.message);
                setPatients([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDiagnosisData();
    }, []);
    return { patients, error, loading };
};