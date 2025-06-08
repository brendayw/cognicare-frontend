import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/ui/Menu.jsx';
import PanelSettings from '../components/settings/PanelSettings.jsx';
import PerfilSolapa from '../components/settings/PerfilSolapa.jsx';
import PasswordSolapa from '../components/settings/PasswordSolapa.jsx';
import DesactivarSolapa from '../components/settings/DesactivarSolapa.jsx';


export default function Settings() {
  const [activeTab, setActiveTab] = useState('perfil');
  const { id } = useParams();
  const [profesional, setProfesional] = useState();
  const [error, setError] = useState();

  const URL_API = 'https://cognicare-backend.vercel.app/api/';

  useEffect(() => {
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          await axios.get(`${URL_API}logout`);
          window.location.href = '';
        } catch (error) {
          console.error('Error al cerrar sesion', error);
          alert('Hubo un problema al intentar cerrar sesion');
        }
      };

      logoutBtn.addEventListener('click', handleLogout);
      return () => logoutBtn.removeEventListener('click', handleLogout);
    }
  }, []);

  useEffect(() => {
    const obtenerProfesional = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token de autenticación');
        const response = await axios.get(`${URL_API}profesional/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("Respuesta recibida del profesional:", response); 
        if (response.data?.success) {
          setProfesional(response.data.data)
        }

      } catch (error) {
        setError(error.message);
        console.error('Error al obtener profesional:', error);
      }
    }
    obtenerProfesional();
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProfesionalDeleted = (deletedId) => {
    setProfesional(prev => prev.filter(a => a.id !== deletedId));
  };

  return (
    <div className="container">
      <Menu />
      <div className='flex w-full'>
        <div className='w-1/4'>
          <PanelSettings activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      
        <div className='w-3/4'>
          {activeTab === 'perfil' ? <PerfilSolapa /> : activeTab === 'password' ? <PasswordSolapa /> : <DesactivarSolapa profesional={profesional} onProfesionalDeleted={handleProfesionalDeleted}/>}
        </div>
      </div>
    </div>
  );
}