import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/ui/Menu.jsx';
import PanelSettings from '../components/settings/PanelSettings.jsx';
import PerfilSolapa from '../components/settings/PerfilSolapa.jsx';
import PasswordSolapa from '../components/settings/PasswordSolapa.jsx';
import DesactivarSolapa from '../components/settings/DesactivarSolapa.jsx';

export default function Settings() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [showPanel, setShowPanel] = useState(true);
  const { id } = useParams();
  const [profesional, setProfesional] = useState();
  const [error, setError] = useState();

  const URL_API = 'https://cognicare-backend.vercel.app/api/';

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setActiveTab(null);
        setShowPanel(true);
      }
    }

    const initialMobile = window.innerWidth <= 1024;
    setIsMobile(initialMobile);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]); 

  useEffect(() => {
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
      const handleLogout = async (e) => {
        e.preventDefault();
        try {
          await axios.get(`${URL_API}logout`);
          window.location.href = '';
        } catch (error) {
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

        if (response.data?.success) {
          setProfesional(response.data.data)
        }
      } catch (error) {
        setError(error.message);
      }
    }
    obtenerProfesional();
  }, [id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setShowPanel(false);
    }
  };

  const handleBackToPanel = () => {
    if (isMobile) {
      setShowPanel(true);
      setActiveTab(null);
    }
  };

  const handleProfesionalDeleted = (deletedId) => {
    setProfesional(prev => prev.filter(a => a.id !== deletedId));
  };

  const shouldShowContent = (tabName) => {
    if (isMobile) {
      return activeTab === tabName;
    } else {
      return activeTab === tabName || (activeTab === null && tabName === 'perfil');
    }
  };

  return (
    <div className="w-full px-4">
      <Menu />
            
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} w-full`}>
        {showPanel && (
          <div className={`w-full ${!isMobile ? 'lg:w-1/4' : ''}`}>
            <PanelSettings activeTab={activeTab} onTabChange={handleTabChange} isMobile={isMobile} />
          </div>
        )}
  
        {(activeTab || !isMobile) && (!showPanel || !isMobile) && (
          <div className={`solapa activa ${!isMobile ? 'w-full lg:w-3/4' : 'w-full'}`}>
            {shouldShowContent('perfil') && (
              <PerfilSolapa 
                isMobile={isMobile} 
                onBack={handleBackToPanel} 
              />
            )}
            {shouldShowContent('password') && (
              <PasswordSolapa 
                isMobile={isMobile} 
                onBack={handleBackToPanel} 
              />
            )}
            {shouldShowContent('deactivate') && (
              <DesactivarSolapa 
                profesional={profesional} 
                onProfesionalDeleted={handleProfesionalDeleted}
                isMobile={isMobile} 
                onBack={handleBackToPanel} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}