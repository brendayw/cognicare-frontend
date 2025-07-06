import { useParams } from 'react-router-dom';
import { useSessionsData } from '../../../../hooks/index.jsx';
import SkeletonHistory from '../../../../skeletons/patients/tabs/SkeletonHistory.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../../styles/patients/tabs/LastSessionTab.module.css';

export default function LastSessionTab() {
    const { id } = useParams();
    const { lastSession, loading, error } = useSessionsData(id);

    if (loading) {
        return (
            <SkeletonHistory />
        );
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            {error ? (
                <p className='flex items-center bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>
            ) : lastSession ? (
                <div className={styles.lastsession_container}>
                    <div className={styles.session_datetime}>
                        <p>Día: <span>{lastSession.fecha ? lastSession.fecha : 'No disponible'}</span></p>
                        <p>Hora: <span>{lastSession.hora ? lastSession.hora : 'No disponible'}</span></p>
                        <p>Duración: <span>{lastSession.duracion ? lastSession.duracion : 'No disponible'}</span></p>
                    </div>
                    <div className={styles.session_details}>
                        <p>Estado: <span>{lastSession.estado ? lastSession.estado : 'No disponible'}</span></p>
                        <p>Tipo: <span>{lastSession.tipo_sesion ? lastSession.tipo_sesion : 'No disponible'}</span></p>
                        <p>Observaciones: <span>{lastSession.observaciones ? lastSession.observaciones : 'No disponible'}</span></p>
                    </div>
                </div>
            ) : (
                <div className='w-full'>     
                    <p className='w-[98%] bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2' />
                        No se encontró la última sesión registrada para mostrar.
                    </p>
                </div>
            )}
        </div>
    );
}