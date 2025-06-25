import { useParams } from 'react-router-dom';
import { useProfesionalData } from '../hooks/useProfesionalData.jsx';
import Menu from '../components/ui/Menu.jsx';
import ProfesionalCard from '../components/profesional/ProfesionalCard.jsx';
import Buttons from '../components/profesional/Buttons.jsx';
import Chart from '../components/profesional/Chart.jsx';
import MoreInfo from '../components/profesional/MoreInfo.jsx';
import RecentlyUpdatedPatients from '../components/profesional/RecentlyUpdatedPatients.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function ProfesionalProfile() {
    const { id } = useParams();
    const { profesional, error, loading } = useProfesionalData(id);
    
    if (loading) {
        return <div>Cargando perfil del profesional...</div>;
    }

    if (error) {
        return (
            <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                <ErrorOutlineTwoToneIcon className='mr-2'/>
                {error}
            </div>
        );
    }

    return (
        <div className='flex flex-col min-h-screen w-full'>
            <Menu />
            <div className='flex flex-col lg:flex-row flex-1 w-full'>
                <div className='w-full lg:w-3/4 p-2 lg:p-4 space-y-2'>
                    <ProfesionalCard prof={profesional} />
                    <Buttons />
                    <Chart />
                </div>
                <div className='w-full lg:w-1/4 p-2 lg:p-4 space-y-2'>
                    <MoreInfo />
                    <RecentlyUpdatedPatients />
                </div>
            </div>
         </div>
    );
}