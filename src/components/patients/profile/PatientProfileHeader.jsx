import { Link } from 'react-router-dom';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';

export default function PatientProfileHeader() {
    return (
        <div className='w-full flex items-center justify-between p-2'>
            <Link to='/patients'>
                <ArrowBackIosTwoToneIcon className='text-[#94a3b8] cursor-pointer hover:text-[#00a396]'/>
            </Link>

            <Link to='edit'>
                <BorderColorTwoToneIcon className='text-[#94a3b8] cursor-pointer hover:text-[#00a396]'/>
            </Link>
        </div>
    );
}