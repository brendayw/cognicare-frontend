import { useState, useEffect } from 'react';
import PatientsCategories from '../components/dashboard/PatientsCategories';
import ProfileCard from '../components/dashboard/ProfileCard';
import PatientsChart from '../components/dashboard/PatientsChart';
import Calendar from '../components/dashboard/Calendar.jsx';
import RecentlyCreatedPatients from '../components/dashboard/RecentlyCreatedPatients.jsx';
import AddButtons from '../components/dashboard/AddButtons.jsx';

export default function Dashboard() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='flex flex-col min-h-screen w-full'>
            <div className='flex flex-col lg:flex-row flex-1 w-full'>
                <div className='w-full lg:w-3/4 p-2 lg:p-4 space-y-4'>
                    <ProfileCard  />
                    <PatientsCategories />
                    
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 w-full`}>
                        <div className='flex-1 min-w-0'>
                            <PatientsChart />
                        </div>
                        <div className={`flex-1 min-w-0 ${isMobile ? 'hidden' : 'block'}`}>
                            <Calendar />
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-1/4 p-2 lg:p-4 space-y-4'>
                    <AddButtons />
                    <RecentlyCreatedPatients />
                </div>
            </div>
        </div>
    );
}