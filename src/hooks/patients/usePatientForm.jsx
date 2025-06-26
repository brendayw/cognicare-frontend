import { useState } from 'react';
import axios from 'axios';

const usePatientForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitPatient = async (formattedData, resetForm) => {
        setLoading(true);
        setError(null);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.post(`${URL_API}patients`, formattedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
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
    return { submitPatient, loading, error };
};

export default usePatientForm;