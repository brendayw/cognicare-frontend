import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Login con:', { email, password });
      // Aquí implementarías la lógica de autenticación

      if (email === 'patricia@gmail.com' && password === 'Hola1234') {
        navigate('/dashboard');
      } else {
        alert('Credenciales incorrectas')
      }
    };
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-soft text-sm font-bold mb-2" htmlFor="email">
                    Correo Electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 text-sm text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
                    value={email}
                    placeholder='ejemplo@ejemplo'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="mb-6">
                <label className="block text-soft text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 text-sm text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm"
                    value={password}
                    placeholder='******'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <div className="flex items-center justify-between mb-4">
                    <a href="#" className="text-sm text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-dark focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                Iniciar Sesión
                </button>
            </form>
        </div>
    );
}  