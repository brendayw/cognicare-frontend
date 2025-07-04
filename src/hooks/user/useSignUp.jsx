import { useState } from 'react';
import axios from 'axios';

const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitSignUp = async (usuario, email, password) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/'
            const response = await axios.post(`${URL_API}signup`, { usuario, email, password });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
                return { success: true };
            } else {
                setError(response.data.message || 'Error al crear la cuenta');
                return { success: false, error: response.data.message };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error al crear la cuenta';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };
    return { submitSignUp, loading, error, success };
};

export default useSignUp;
     
