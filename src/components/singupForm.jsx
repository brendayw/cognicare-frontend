import { useState } from 'react';
import '../App.css';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Registro con:', { name, email, password });
      // Aquí implementarías la lógica de registro
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
                        value={name}
                        placeholder='usuario'
                        onChange={(e) => setName(e.target.value)}
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
        </div>
    );
}
  