import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import ResetPasswordForm from './resetPasswordForm.jsx';
import '../../App.css';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://cognicare-backend.vercel.app/api/login', {
        email,
        password,
      }, {
        withCredentials: true,
      });
  
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error en la autenticación');
    }
  };
  
  return (
    <div className='max-w-md mx-auto p-4 md:p-0'>
      {error && (
        <div className='flex items-center bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] text-xs md:text-sm mb-4 px-2 py-1 md:py-2'>
          <ErrorOutlineTwoToneIcon className='m-1 md:m-2'/>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='mb-3 md:mb-4'>
          <label className='block text-soft text-xs md:text-sm font-bold mb-1 md:mb-2' htmlFor="email">
            Correo Electrónico
          </label>
          <input
            id="email"
            type="email"
            className='w-full px-3 py-1 md:py-2 border border-gray-300 text-xs md:text-sm text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-xs md:placeholder:text-sm'
            value={email}
            placeholder='ejemplo@ejemplo'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-3 md:mb-4'>
          <label className='block text-soft text-xs md:text-sm font-bold mb-1 md:mb-2' htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className='w-full px-3 py-1 md:py-2 border border-gray-300 text-xs md:text-sm text-soft rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-xs md:placeholder:text-sm'
            value={password}
            placeholder='******'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='flex items-center justify-between mb-3 md:mb-4'>
          <button 
            type="button"
            className='text-sm text-primary hover:underline focus:outline-nonetext-xs md:text-sm text-primary hover:underline focus:outline-none'
            onClick={() => setShowResetPassword(true)}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
                
        <button
          type="submit"
          className='w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-dark shadow shadow-dark text-sm md:text-base'
        >
          Iniciar Sesión
        </button>
      </form>

      {showResetPassword && (
        <ResetPasswordForm 
          onClose={() => setShowResetPassword(false)} 
        />
      )}
    </div>
  );
}  