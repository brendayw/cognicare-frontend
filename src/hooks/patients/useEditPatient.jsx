import { useState, useEffect } from 'react';
import axios from 'axios';

const useEditPatient = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const editPatient = async (patientId, formData) => {
        setIsSubmitting(true);
        setError('');
        
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.put(`${URL_API}patients/${patientId}`, formData, {
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
    return { editPatient, isSubmitting, error };
}

export default useEditPatient;