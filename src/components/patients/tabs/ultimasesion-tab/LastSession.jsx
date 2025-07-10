import { useParams } from 'react-router-dom';
import { useSessionsData, usePatientData } from '../../../../hooks/index.jsx';
import { SkeletonHistory } from '../../../../skeletons/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../../styles/patients/tabs/LastSession.module.css';

export default function LastSessionTab() {
    const { id } = useParams();
    const { lastSession, loading, error } = useSessionsData(id);
    const { patient } = usePatientData(id);

    if (loading) {
        return (
            <SkeletonHistory />
        );
    }

    const estadoNormalizado = patient && patient.estado
        ? patient.estado.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        : 'default';

    return (
        <div className='flex flex-col items-center justify-center'>
            {lastSession ? (
                <div className={`${styles.lastsession_container} ${styles[`lastsession_container--${estadoNormalizado}`]}`} >
                    <div className={styles.session_datetime}>
                        <p>Día: <span>{lastSession.fecha ? lastSession.fecha : 'No disponible'}</span></p>
                        <p>Hora: <span>{lastSession.hora ? lastSession.hora : 'No disponible'}</span></p>
                        <p>Duración: <span>{lastSession.duracion ? lastSession.duracion : 'No disponible'}</span></p>
                    </div>
                    <div className={styles.session_details}>
                        <p>Estado: <span>{lastSession.estado ? lastSession.estado : 'No disponible'}</span></p>
                        <p>Tipo: <span>{lastSession.tipoSesion ? lastSession.tipoSesion : 'No disponible'}</span></p>
                        <p>Observaciones: <span>{lastSession.observaciones ? lastSession.observaciones : 'No disponible'}</span></p>
                    </div>
                </div>
            ) : (
                <div className='w-full'>     
                    <p className='flex items-center bg-[#f6e9e6] w-[98%] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}