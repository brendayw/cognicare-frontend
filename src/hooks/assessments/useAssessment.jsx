import { useState, useEffect } from 'react';
import axios from 'axios';

const useAssessment = () => {
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}assessments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.data?.success) {
                    const data = Array.isArray(response.data.data)
                        ? response.data.data
                        : response.data.data?.rows
                        ? response.data.data.rows
                        : [];
                    setAssessments(data);
                } else {
                    throw new Error(response.data?.message || 'La respuesta no indica éxito');
                }

            } catch (error) {
                setError('Error al cargar datos: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchAssessments();
    });
    return { assessments, loading, error};
}

export default useAssessment;