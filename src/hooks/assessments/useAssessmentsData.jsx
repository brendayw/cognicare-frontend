import { useState, useEffect } from 'react';
import axios from 'axios';

const useAssessmentsData = (patientId) => {
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}patients/${patientId}/assessments`, {
                headers: { 'Authorization': `Bearer ${token}` },
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
                setError('Error al cargar datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchAssessments();
    }, [patientId]);


    const handleAssessmentDeleted = (deletedId) => {
        setAssessments(prev => prev.filter(a => a.id !== deletedId));
    };

    return { assessments, error, loading, handleAssessmentDeleted };
};

export default useAssessmentsData;