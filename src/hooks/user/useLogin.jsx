import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submitLogin = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
        
            const response = await axios.post(`${URL_API}login`, { email, password }, {
                withCredentials: true
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
                return { success: true };
            } else {
                setError('Credenciales incorrectas');
                return { success: false, error: 'Credenciales incorrectas' };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error en la autenticación';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { submitLogin, loading, error };
};

export default useLogin;