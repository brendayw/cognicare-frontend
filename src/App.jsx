import { useState } from 'react';
import './App.css'; 
import LoginForm from './components/forms/loginForm';
import SignupForm from './components/forms/singupForm';

export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  
  return (
    <div className="h-screen overflow-hidden flex">

      <div className="w-1/2 flex flex-col items-center justify-center bg-primary text-white p-8">
        <h1 className="text-4xl font-bold text-white">
          {activeTab === 'login' ? '¡Bienvenido!' : '¡Hola!'}
        </h1>

        {activeTab === 'login' && (
          <p className="mt-4 text-lg">¿No tienes una cuenta?</p>
        )}

        {activeTab === 'signup' && (
          <p className="mt-4 text-lg">Ya tienes una cuenta?</p>
        )}

        <button
          className="mt-6 bg-[#889dbb] text-white py-2 px-6 rounded-full shadow shadow-dark"
          onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
        >
          {activeTab === 'login' ? 'Registrarse' : 'Iniciar sesión'}
        </button>

      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-primary">
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
