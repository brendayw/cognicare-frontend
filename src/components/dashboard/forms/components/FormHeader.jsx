import { useNavigate } from 'react-router-dom';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';

export default function FormHeader( { titulo = 'Formulario'}) {
    const navigate = useNavigate();
    return (
        <div className='flex justify-between items-center w-full'>
            <div  className='text-lg text-[#00a396] m-2'>
                <h2>{titulo}</h2>
            </div>
            <div className='flex justify-end'>
                <button onClick={() => navigate(-1)} className='bg-transparent cursor-pointer m-4'>
                    <ArrowBackIosTwoToneIcon className='text-[#94a3b8]'/>
                </button>
            </div>
        </div>
    );
}
