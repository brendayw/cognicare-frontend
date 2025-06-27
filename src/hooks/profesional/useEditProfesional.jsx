import { useState, useEffect } from 'react';
import axios from 'axios';

const useEditProfesional = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const editProfesional = async (id, formData) => {
        setIsSubmitting(true);
        setError('');

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.get(`${URL_API}profesional/${id}`, {
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

    return { editProfesional, isSubmitting, error };
}

export default useEditProfesional;