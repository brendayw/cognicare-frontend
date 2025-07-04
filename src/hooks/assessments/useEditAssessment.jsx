import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useEditAssessment = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    
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
            
            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
                return true;
            }
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

    return { editAssessment, isSubmitting, error, success };
};

export default useEditAssessment;