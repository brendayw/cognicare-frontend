import { useParams } from 'react-router-dom';
import { usePatientData } from '../../../hooks/patients/usePatientData.jsx';
import SkeletonData from '../../../skeletons/patients/SkeletonData.jsx';
import styles from '../../../styles/patients/profile/PatientData.module.css';

export default function PatientData() {
    const { id } = useParams();
    const { patient, loading, error } = usePatientData(id);
        
    if (loading) {
        return (
            <SkeletonData />
        );
    }
    
    
    if (error) return <div className={styles.error}>{error}</div>; 

    const normalizeEstado = (estado) => {
        if (!estado) return 'tratamiento';
        return estado.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const estadoNormalizado = normalizeEstado(patient.estado);

    return (
        <div className={`${styles.patient_datacard}`}>
            <div className={`${styles.id_card} ${styles[`id_card--${estadoNormalizado}`]}`}>
                <p>ID: {patient.id}</p>
                <p>Estado: {patient.estado || 'No disponible' }</p>
            </div>
            <div className={`${styles.card_details} ${styles[`card_details--${estadoNormalizado}`]}`}>
                <p>Genero: <span> {patient.genero || '-' }</span></p>
                <p>Fecha de nacimiento: <span>{patient.fecha_nacimiento || '-'}</span></p>
                <p>Fecha de inicio: <span>{patient.fecha_inicio || '-' }</span></p>
                <p>Dirección: <span>{patient.direccion || '-' }</span></p>
                <p>Email: <span>{patient.email || '-' }</span></p>
                <p>Teléfono: <span>{patient.telefono || '-'}</span></p>
            </div>
        </div>
    );
}