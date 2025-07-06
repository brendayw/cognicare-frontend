import { useParams } from 'react-router-dom';
import { usePatientData } from '../../../hooks/index.jsx';
import { SkeletonProgress } from '../../../skeletons/index.jsx';
import styles from '../../../styles/patients/profile/PatientProgress.module.css';

export default function PatientProgress() {
    const { id } = useParams();
    const { patient, loading, error } = usePatientData(id);
    
    if (loading) {
        return (
            <SkeletonProgress />
        )
    }
    
    return (
       <div className={`${styles.sessions}`}>
            <div className={`${styles.sessions_held}`}>
                <p>Sesiones Realizadas
                    <span>{patient.sesiones_realizadas} </span>
                </p>
            </div>
            <div className={`${styles.sessions_total}`}>
                <p>Sesiones Totales
                    <span>{patient.sesiones_totales} </span>
                </p>
            </div>
       </div>
    );
}