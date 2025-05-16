import { useState } from 'react';
import axios from 'axios';
import '../App.css';

export default function SignupForm() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registro con:', { usuario, email, password });

        try {
            const response = await axios.post('https://cognicare-backend-zalf.vercel.app/api/signup', {  
                usuario,
                email, 
                password
            });
    
            if (response.data.success) {
                console.log("Usuario creado con éxito");
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-soft text-sm font-bold mb-2" htmlFor="name">
                        Usuario
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 text-sm text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
                        value={usuario}
                        placeholder='usuario'
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-soft text-sm font-bold mb-2" htmlFor="signup-email">
                        Correo Electrónico
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 text-sm text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
                        value={email}
                        placeholder='ejemplo@ejemplo.com'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-soft text-sm font-bold mb-2" htmlFor="signup-password">
                        Contraseña
                    </label>
                <input
                    id="signup-password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 text-sm text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
                    value={password}
                    placeholder='*******'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
    
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-dark focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Crear Cuenta
                </button>
            </form>

            {/* Mostrar el mensaje de éxito si existe */}
            {successMessage && 
                <div className="bg-green-500 text-white p-2 mt-5 text-center rounded-md">
                    {successMessage}
                </div>
            }

            {/* Mostrar el mensaje de error si existe */}
            {error && 
                <div className="bg-red-500 text-white p-2 mt-5 text-center rounded-md">
                    {error}
                </div>
            }

        </div>
    );
}
  