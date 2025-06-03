import { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../components/ui/Menu.jsx';
import PanelSettings from '../components/settings/PanelSettings.jsx';
import PerfilSolapa from '../components/settings/PerfilSolapa.jsx';
import PasswordSolapa from '../components/settings/PasswordSolapa.jsx'; // Corregido el import

export default function Settings() {
  const [activeTab, setActiveTab] = useState('perfil');

  useEffect(() => {
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          await axios.get('/api/logout');
          window.location.href = '/login';
        } catch (error) {
          console.error('Error al cerrar sesion', error);
          alert('Hubo un problema al intentar cerrar sesion');
        }
      };

      logoutBtn.addEventListener('click', handleLogout);
      return () => logoutBtn.removeEventListener('click', handleLogout);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <Menu />
      <div className='flex w-full'>
        <div className='w-1/4'>
          <PanelSettings activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      
        <div className='w-3/4'>
          {activeTab === 'perfil' ? <PerfilSolapa /> : <PasswordSolapa />}
        </div>
      </div>
    </div>
  );
}