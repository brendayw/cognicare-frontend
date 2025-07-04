import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const usePasswordUpdate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const updatePassword = async (formData) => {
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.put(`${URL_API}password/update`, formData, {
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
                return true;
            }
        } catch (error) {
            let errorMessage = 'Error al cambiar la contraseña';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'El servidor no respondió';
            }
            setError(errorMessage);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };
    return { updatePassword, isSubmitting, error, success };
};

