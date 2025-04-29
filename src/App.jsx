import { useState } from 'react';
import './App.css'; 
import LoginForm from './components/loginForm';  // Asegúrate de importar el componente LoginForm
import SignupForm from './components/singupForm'; // Asegúrate de importar el componente SignupForm

export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Columna de izquierda: Overlay */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-primary text-white p-8">
        <h1 className="text-4xl font-bold text-white">
          {activeTab === 'login' ? '¡Bienvenido!' : '¡Hola!'}
        </h1>

        {/* Mostrar el mensaje dependiendo del formulario activo */}
        {activeTab === 'login' && (
          <p className="mt-4 text-lg">¿No tienes una cuenta?</p>
        )}

        {activeTab === 'signup' && (
          <p className="mt-4 text-lg">Ya tienes una cuenta?</p>
        )}

        {/* Botón de acción */}
        <button
          className="mt-6 bg-transparent border-[1px] text-white py-2 px-6 rounded-full"
          onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
        >
          {activeTab === 'login' ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </div>

      {/* Columna de derecha: Formulario */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {/* Títulos del formulario */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">
              {activeTab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </h1>
            {/* <p className="text-gray-500 mt-2">
              {activeTab === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta'}
            </p> */}
          </div>

          {/* Renderizamos el formulario correspondiente */}
          {activeTab === 'login' && <LoginForm />}
          {activeTab === 'signup' && <SignupForm />}
        </div>
      </div>
    </div>
  );
}
