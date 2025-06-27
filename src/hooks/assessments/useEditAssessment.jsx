import { useState, useEffect } from 'react';
import axios from 'axios';

const useEditAssessment = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const editAssessment = async (assessmentId, formData) => {
        setIsSubmitting(true);
        setError('');
        
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.put(`${URL_API}assessments/${assessmentId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Error del servidor');
            } else if (error.request) {
                setError('El servidor no respondió');
            } else {
                setError('Error al enviar el formulario');
            }
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { editAssessment, isSubmitting, error };
};

export default useEditAssessment;