import { useState } from 'react';
import './App.css'; 
import LoginForm from './components/forms/loginForm';
import SignupForm from './components/forms/singupForm';

export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  
  return (
    <div className='h-screen overflow-y-auto md:overflow-hidden flex flex-col md:flex-row'>

      <div className='w-full h-full md:w-1/2 flex flex-col items-center justify-center bg-primary text-white p-4 md:p-8 order-2 md:order-1'>
        <h1 className='text-2xl md:text-4xl font-bold text-white text-center'>
          {activeTab === 'login' ? '¡Bienvenido!' : '¡Hola!'}
        </h1>

        {activeTab === 'login' && (
          <p className='mt-2 md:mt-4 text-sm md:text-lg text-center'>¿No tienes una cuenta?</p>
        )}

        {activeTab === 'signup' && (
          <p className='mt-2 md:mt-4 text-sm md:text-lg text-center'>Ya tienes una cuenta?</p>
        )}

        <button
          className='mt-4 md:mt-6 bg-[#889dbb] text-white py-2 px-4 md:px-6 rounded-full shadow shadow-dark text-sm md:text-base'
          onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
        >
          {activeTab === 'login' ? 'Registrarse' : 'Iniciar sesión'}
        </button>

      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 order-1 md:order-2'>
        <div className='bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-md'>
          <div className='text-center mb-2 md:mb-4'>
            <h1 className='text-xl md:text-3xl font-bold text-primary'>
              {activeTab === 'login' ? 'Iniciar Sesión' : 'Crea una cuenta'}
            </h1>
          </div>

          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'signup' && <SignupForm />}
        </div>
      </div>
    </div>
  );
}