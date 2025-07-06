import { useParams, Link } from 'react-router-dom';
import { TabTitle } from '../../../index.jsx';
import { useSessionsData, usePatientData } from '../../../../hooks/index.jsx';
import SkeletonSessions from '../../../../skeletons/patients/tabs/SkeletonSessions.jsx';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../../styles/patients/tabs/HistorySession.module.css';

export default function HistorySessions() {
    const { id } = useParams();
    const { sessions, loading, error } = useSessionsData(id); 
    const { patient } = usePatientData(id);

    if (loading) {
        return (
            <div className='p-2'>
                <TabTitle titulo='Historial de sesiones' />
                <SkeletonSessions />
            </div>
        );
    }
    
    const estadoNormalizado = patient && patient.estado
        ? patient.estado.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        : 'default';

    return (
        <div className={`${styles.historysessions_container}`}>
            <div className={styles.history_header}>
                <TabTitle titulo='Historial de sesiones' />
                <Link to='sessions'>
                    <BorderColorTwoToneIcon className='text-[#424884] cursor-pointer hover:text-[#00a396]'/>
                </Link>
            </div>
            {error ? (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>
            ) : sessions.length > 0 ? (
                <div className={`${styles.sessions_container} ${styles[`sessions_container--${estadoNormalizado}`]}`}>
                    {sessions.map((session, index) => (
                        <div 
                            key={session.id || index }
                            className={`${styles.sessions} `}>
                            <div className={`${styles.sessions_observation}`}>
                                <p>Observaciones: <span>{session.observaciones || '-'}</span> </p>
                            </div>
                            <div className={`${styles.sessions_date}`}>
                                <p>Fecha: <span>{session.fecha || '-'}</span> </p>
                                
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full'>     
                    <p className='w-[98%] bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2' />
                        No se encontraron sesiones asociadas al paciente para mostrar.
                    </p>
                </div>
            )}
        </div>
    );
}