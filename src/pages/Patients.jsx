import { useState, useEffect } from 'react';
import { Menu, ViewSelector, PatientsList } from '../components/index.jsx';
import { usePatients } from '../hooks/index.jsx';
import { SkeletonListItemWithIcon } from '../skeletons/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Patients() {
    const [view, setView] = useState('grid');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { patients, loading, error } = usePatients();

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
        <div className='flex flex-col min-h-screen w-full'>
            <Menu/>
            <div className='flex-1 p-2 md:p-4'>
                {!isMobile && (
                    <ViewSelector currentView={view} onViewChange={handleViewChange} />
                )}

                {isMobile && (
                    <div className="mt-2 mb-2 px-2">
                        <h2 className="text-xl font-bold text-[#00a396]">
                            Todos los pacientes
                        </h2>
                    </div>
                )}
                
                {loading ? (
                    <div className='flex flex-col justify-center items-center h-full'>
                        <SkeletonListItemWithIcon />
                        <SkeletonListItemWithIcon />
                        <SkeletonListItemWithIcon />
                        <SkeletonListItemWithIcon />
                    </div>
                )  : (
                    <PatientsList pacientes={patients} vista={effectiveView} error={error} />
                )}
            </div>
        </div>
    );
}