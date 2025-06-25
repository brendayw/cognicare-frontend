import { useParams } from 'react-router-dom';
import { usePatientData } from '../../../hooks/usePatientData.jsx';
import axios from 'axios';
import styles from '../../../styles/patients/profile/PatientProgress.module.css';

export default function PatientProgress() {
    const { id } = useParams();
    const { patient, loading, error } = usePatientData(id);
    
    if (loading) return <div className={styles.loading}>Cargando...</div>;

    /*skeleton*/
    if (!patient) {
        return (
            <div className="p-4 border rounded-lg m-2">
                <h3 className="text-lg font-medium mb-3">Progreso del Paciente</h3>
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-2 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        );
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