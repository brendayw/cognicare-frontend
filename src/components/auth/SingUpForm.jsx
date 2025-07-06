import { useState } from 'react';
import { useSignUp } from '../../hooks/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import '../../App.css';

export default function SignUpForm() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { submitSignUp, loading, error, success } = useSignUp();
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await submitSignUp(usuario, email, password);
        if (response?.success) {
            setUsuario('');
            setEmail('');
            setPassword('');
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
            {success && 
                <div className="bg-[#27ae60] rounded-md text-center text-white text-xs md:text-sm mb-4 p-2">
                    ¡Cuenta creada con éxito!
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
  