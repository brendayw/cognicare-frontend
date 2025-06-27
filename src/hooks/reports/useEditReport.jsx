import { useState, useEffect } from 'react';
import axios from 'axios';

const useEditReport = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const editReport = async (reportId, requestData, isFileUpload = false) => {
        setIsSubmitting(true);
        setError('');
        
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const requestHeaders = {
                'Authorization': `Bearer ${token}`
            };

            if (!isFileUpload) {
                requestHeaders['Content-Type'] = 'application/json';
            }

            const response = await axios.put(`${URL_API}reports/${reportId}`, requestData, {
                headers: requestHeaders
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

    return { editReport, isSubmitting, error };
}

export default useEditReport;