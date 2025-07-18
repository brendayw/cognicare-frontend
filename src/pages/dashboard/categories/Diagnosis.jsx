import { useState, useEffect } from 'react';
import { Menu, ViewSelector, DiagnosisList } from '../../../components/index.jsx'
import { useDiagnosisData } from '../../../hooks/index.jsx';
import { SkeletonListItemWithIcon } from '../../../skeletons/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Diagnosis() {
    const [view, setView] = useState('grid');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const { patients, error, loading } = useDiagnosisData();

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
        <div className='min-h-screen flex flex-col'>
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
                ) : error ? (
                    <div className='w-full bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-2 md:m-4 p-3 md:p-4 flex items-center'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <DiagnosisList pacientes={patients} vista={effectiveView} error={error} />
                )}
            </div>
        </div>
    );
}