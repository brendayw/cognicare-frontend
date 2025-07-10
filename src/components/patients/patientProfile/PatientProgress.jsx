import { useParams } from 'react-router-dom';
import { usePatientData } from '../../../hooks/index.jsx';
import { SkeletonProgress } from '../../../skeletons/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../styles/patients/profile/PatientProgress.module.css';

export default function PatientProgress() {
    const { id } = useParams();
    const { patient, loading, error } = usePatientData(id);
    
    if (loading) {
        return (
            <SkeletonProgress />
        )
    }

    if (error) {
        return (
            <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                <ErrorOutlineTwoToneIcon className='mr-2'/>
                {error}
            </div>
        ); 
    }
    
    return (
       <div className={`${styles.sessions}`}>
            <div className={`${styles.sessions_held}`}>
                <p>Sesiones Realizadas
                    <span>{patient.sesionesRealizadas} </span>
                </p>
            </div>
            <div className={`${styles.sessions_total}`}>
                <p>Sesiones Totales
                    <span>{patient.sesionesTotales} </span>
                </p>
            </div>
       </div>
    );
}