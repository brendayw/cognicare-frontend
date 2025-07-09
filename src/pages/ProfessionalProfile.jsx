import { useParams } from 'react-router-dom';
import { Menu, ProfessionalCard, Buttons, Chart, MoreInfo, RecentlyUpdatedPatients } from '../components/index.jsx';
import { useProfessionalData } from '../hooks/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';

export default function ProfessionalProfile() {
    const { id } = useParams();
    const { professional, error } = useProfessionalData(id);
    
    const isProfessionalNotFound = error && error.includes('404');
    
    return (
        <div className='flex flex-col min-h-screen w-full'>
            <Menu />

            {isProfessionalNotFound ? (
                <div className='relative [@media_(max-width:_639px)]:top-24 sm:top-24 md:top-0 flex items-center justify-center'> 
                    <p className='w-full bg-[#fff3e0] border border-amber-300 rounded-md text-center text-[#FFA000] text-sm m-4 p-4'>
                        <WarningAmberTwoToneIcon className='m-2'/>
                        Por favor, complete los datos del profesional en la sección de Ajustes.
                    </p>
                </div>
            ) : error ? (
                <div className='w-full'>
                    <p className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>
            ) : (
                <div className='flex flex-col lg:flex-row flex-1 w-full'>
                    <div className='w-full lg:w-3/4 p-2 lg:p-4 space-y-2'>
                        <ProfessionalCard prof={professional} />
                        <Buttons />
                        <Chart />
                    </div>
                    <div className='w-full lg:w-1/4 p-2 lg:p-4 space-y-2'>
                        <MoreInfo />
                        <RecentlyUpdatedPatients />
                    </div>
                </div>
            )}
         </div>
    );
}