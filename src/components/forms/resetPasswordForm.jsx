import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordForm({ onClose }) {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const URL_API = 'https://cognicare-backend.vercel.app/api/';

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
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
            } else {
                setError('No existe una cuenta asociada a este email');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al verificar el email');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        console.log('Comparando:', newPassword, confirmPassword);
    
        if (newPassword.trim() !== confirmPassword.trim()) {
            console.log('Contraseñas no coinciden');
            return setError('Las contraseñas no coinciden');
        }
        setIsLoading(true);

        try {
            const response = await axios.post(`${URL_API}password/reset`, 
                {   email, 
                    password: newPassword, 
                    confirmPassword: confirmPassword 
                }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setSuccess('Contraseña actualizada correctamente');
                setTimeout(() => onClose(), 2000);
            } else {
                setError(response.data.message || 'Error al actualizar la contraseña');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error al actualizar la contraseña');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">
                    {step === 1 ? 'Recuperar contraseña' : 'Nueva contraseña'}
                </h2>
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                </div>

                {step === 1 ? (
                <form onSubmit={handleVerifyEmail}>
                    <div className="mb-4">
                    <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Ingresa tu correo electrónico
                    </label>
                    <input
                        id="reset-email"
                        type="email"
                        placeholder="tu@email.com"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />
                    </div>

                    {error && (
                    <div className="mb-4 text-red-600 text-sm">{error}</div>
                    )}

                    <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md"
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verificando...' : 'Continuar'}
                    </button>
                    </div>
                </form>
                ) : (
                <form onSubmit={handleResetPassword}>
                    {success && (
                    <div className="mb-4 text-green-600 text-sm">{success}</div>
                    )}

                    <div className="mb-4">
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Nueva contraseña
                    </label>
                    <input
                        id="new-password"
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        autoFocus
                    />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar nueva contraseña
                    </label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Repite tu contraseña"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    </div>

                    {error && (
                    <div className="mb-4 text-red-600 text-sm">{error}</div>
                    )}

                    <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm text-primary hover:underline"
                    >
                        Volver
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark ${
                        isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Actualizando...' : 'Cambiar contraseña'}
                    </button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}