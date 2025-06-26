import { useState } from 'react';
import axios from 'axios';

const useAssessmentForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitAssessment = async (formattedData, resetForm) => {
        setLoading(true);
        setError(null);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.post(`${URL_API}assessments`, formattedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('Formulario enviado con éxito');
                resetForm();
            } else {
                alert('Hubo un error al enviar el formulario');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error del servidor');
        } finally {
            setLoading(false);
        }
    };

    return { submitAssessment, loading, error };
};

export default useAssessmentForm;