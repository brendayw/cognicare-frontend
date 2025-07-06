import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Menu, PanelSettings, ProfileTab, PasswordTab, DeactivateTab } from '../components/index.jsx';
import { useProfessionalData } from '../hooks/index.jsx'; 

export default function Settings() {
  const { id } = useParams();
  const { professional, error, loading, handleProfessionalDeleted } = useProfessionalData(id);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [showPanel, setShowPanel] = useState(true);

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

  return (
    <div className="w-full min-h-screen px-4">
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
              <ProfileTab
                isMobile={isMobile} 
                onBack={handleBackToPanel} 
              />
            )}
            {shouldShowContent('password') && (
              <PasswordTab
                isMobile={isMobile} 
                onBack={handleBackToPanel} 
              />
            )}
            {shouldShowContent('deactivate') && (
              <DeactivateTab
                professional={professional} 
                onProfessionalDeleted={handleProfessionalDeleted}
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