import { useParams } from 'react-router-dom';
import Menu from '../../../components/ui/Menu.jsx';
import SessionsList from '../../../components/sessions/SessionsList.jsx';
import useSessionsData from '../../../hooks/sessions/useSessionsData.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Sessions() {
    const { id } = useParams();
    const { sessions, error, loading, handleSessionDeleted } = useSessionsData(id);
    
    return (
        <div className='min-h-screen'>
            <Menu/>
            <div className='relative top-0 [@media_(max-width:_639px)]:top-[-100px] sm:top-[-100px] md:top-0'>
                {loading ? (
                    <div className=''>Cargando pacientes...</div>
                ) : error ? (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <SessionsList sessions={sessions} error={error} onSessionDeleted={handleSessionDeleted}/>
                )}
            </div>
        </div>
    );
}