import { useState, useEffect } from 'react';
import axios from 'axios';

const useTreatmentData = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTreatmentData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}patients/treatment`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data && response.data.success && response.data.data) {
                    if (Array.isArray(response.data.data)) {
                        setPatients(response.data.data);
                    } else if (response.data.data.rows) {
                        setPatients(response.data.data.rows);
                    } else {
                        setPatients([response.data.data]);
                    }
                } else {
                    throw new Error('Estructura de datos inesperada');
                }

            } catch (error) {
                setError('Error al cargar datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTreatmentData();
    }, []);
    return { patients, error, loading };
}

export default useTreatmentData;