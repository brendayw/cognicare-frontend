import { useState } from 'react';
import axios from 'axios';

const useResetPassword = () => {
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const URL_API = 'https://cognicare-backend.vercel.app/api/';

    const verifyEmail = async (email) => {
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${URL_API}verify-email`, { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setStep(2);
                setSuccess('Email verificado. Ingresa tu nueva contraseña');
                return { success: true };
            } else {
                setError('No existe una cuenta asociada a este email');
                return { success: false };
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error al verificar el email';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (email, newPassword, confirmPassword) => {
        setError('');
        
        if (newPassword.trim() !== confirmPassword.trim()) {
            setError('Las contraseñas no coinciden');
            return { success: false };
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${URL_API}password/reset`, 
                { email, password: newPassword, confirmPassword }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setSuccess('Contraseña actualizada correctamente');
                return { success: true };
            } else {
                setError(response.data.message || 'Error al actualizar la contraseña');
                return { success: false };
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error al actualizar la contraseña';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setIsLoading(false);
        }
    };

    const resetState = () => {
        setStep(1);
        setError('');
        setSuccess('');
        setIsLoading(false);
    };

    return { step, error, success, isLoading, 
        verifyEmail, resetPassword, resetState, setStep };
};

export default useResetPassword;