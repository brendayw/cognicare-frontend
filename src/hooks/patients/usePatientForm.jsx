import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const usePatientForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const submitPatient = async (formattedData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.post(`${URL_API}patients`, formattedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
                return true;

            } else {
                setError('Hubo un error al enviar el formulario');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error del servidor');
        } finally {
            setLoading(false);
        }
    };
    return { submitPatient, loading, error, success };
};

export default usePatientForm;