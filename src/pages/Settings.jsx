import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfesionalData } from '../hooks/useProfesionalData.jsx'; 
import { useLogout } from '../hooks/useLogOut.jsx';
import Menu from '../components/ui/Menu.jsx';
import PanelSettings from '../components/settings/PanelSettings.jsx';
import PerfilSolapa from '../components/settings/PerfilSolapa.jsx';
import PasswordSolapa from '../components/settings/PasswordSolapa.jsx';
import DesactivarSolapa from '../components/settings/DesactivarSolapa.jsx';

export default function Settings() {
  const { id } = useParams();
  const { profesional, error, loading, handleProfesionalDeleted } = useProfesionalData(id);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [showPanel, setShowPanel] = useState(true);
  const logout = useLogout();

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

  const shouldShowContent = (tabName) => {
    if (isMobile) {
      return activeTab === tabName;
    } else {
      return activeTab === tabName || (activeTab === null && tabName === 'perfil');
    }
  };

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  // if (error) {
  //   return (
  //     <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
  //       {error}
  //     </div>
  //   );
  // }

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