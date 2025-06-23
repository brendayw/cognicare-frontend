import { useState } from 'react';
import axios from 'axios';
import '../../App.css';

export default function SignupForm() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const response = await axios.post(`${URL_API}signup`, {  
                usuario,
                email, 
                password
            });
    
            if (response.data.success) {
                setSuccessMessage('¡Cuenta creada con éxito!');
            } else {
                setError(response.data.message || 'Error al crear la cuenta');
                setSuccessMessage('');
            }
    
        } catch (error) {
            setError('Error al crear una cuenta: ' + error.message);
            setSuccessMessage('');
        }
    };
  
    return (
        <div className='max-w-md mx-auto p-4 md:p-0'>
            {error && (
                <div className="flex items-center bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] text-xs md:text-sm mb-4 px-2 py-1 md:py-2">
                    <ErrorOutlineTwoToneIcon className='m-1 md:m-2'/>
                    {error}
                </div>
            )}

            {successMessage && 
                <div className="bg-[#27ae60] rounded-md text-center text-white text-xs md:text-sm mb-4 p-2">
                    {successMessage}
                </div>
            }
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3 md:mb-4">
                    <label className="block text-soft text-sm font-bold mt-2" htmlFor="name">
                        Usuario
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-1 md:py-2 text-xs md:text-sm border border-gray-300 text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-xs md:placeholder:text-sm"
                        value={usuario}
                        placeholder='usuario'
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-soft text-xs md:text-sm font-bold mb-1 md:mb-2" htmlFor="signup-email">
                        Correo Electrónico
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        className="w-full px-3 py-1 md:py-2 text-xs md:text-sm border border-gray-300 text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-xs md:placeholder:text-sm"
                        value={email}
                        placeholder='ejemplo@ejemplo.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 md:mb-4">
                    <label className="block text-soft text-xs md:text-sm font-bold mb-1 md:mb-2" htmlFor="signup-password">
                        Contraseña
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        className="w-full px-3 py-1 md:py-2 text-xs md:text-sm border border-gray-300 text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-xs md:placeholder:text-sm"
                        value={password}
                        placeholder='*******'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-dark shadow shadow-dark text-sm md:text-base"
                >
                    Crear Cuenta
                </button>
            </form>
        </div>
    );
}
  