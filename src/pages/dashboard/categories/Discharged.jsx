import { useState, useEffect } from 'react';
import { useDischargedData } from '../../../hooks/useDischargedData.jsx';
import Menu from '../../../components/ui/Menu.jsx';
import VistaSelector from '../../../components/ui/VistaSelector.jsx';
import DischargedList from '../../../components/patients/lists/DischargedList.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Discharged() {
    const [view, setView] = useState('grid');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { patients, error, loading } = useDischargedData();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            if (mobile && view !== 'list') {
                setView('list');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [view]);
    
    const handleViewChange = (newView) => {
        if (!isMobile) {
            setView(newView);
        }
    };

    const effectiveView = isMobile ? 'list' : view;

    return (
        <div className='h-screen flex flex-col'>
            <Menu/>
            <div className='flex-1 p-2 md:p-4'>
                {!isMobile && (
                    <VistaSelector currentView={view} onViewChange={handleViewChange} />
                )}

                {isMobile && (
                    <div className="mt-24 mb-4 px-2">
                        <h2 className="text-xl font-bold text-[#00a396]">
                            Todos los pacientes
                        </h2>
                    </div>
                )}

                {loading ? (
                    <div className='flex justify-center items-center h-full'>Cargando pacientes...</div>
                ) : error ? (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <DischargedList pacientes={patients} vista={effectiveView} error={error} />
                )}
            </div>
        </div>
    );
}
