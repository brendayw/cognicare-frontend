import { useParams } from 'react-router-dom';
import { usePatientData } from '../../../../hooks/patients/usePatientData.jsx';
import SkeletonHistory from '../../../../skeletons/patients/tabs/SkeletonHistory.jsx';
import styles from '../../../../styles/patients/tabs/HistoryResume.module.css';

export default function HistoryResume() {
    const { id } = useParams();
    const { patient, loading, error } = usePatientData(id);

    if (loading) {
        return (
            <SkeletonHistory />
        );
    }

    const normalizeEstado = (estado) => {
        if (!estado) return 'tratamiento';
        return estado.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const estadoNormalizado = normalizeEstado(patient.estado);

    return (
        <div className={`${styles.resume_tab} ${styles[`resume_tab--${estadoNormalizado}`]}`}>
            <div className={`${styles.history_details} ${styles[`history_details--${estadoNormalizado}`]}`}>
                <p>Motivo inicial: <span> {patient.motivo_inicial || '-' }  </span> </p>
                <p>Observaciones iniciales: <span> {patient.observaciones || '-' } </span> </p>
                <p>Motivo de alta: <span>{patient.motivo_alta || '-' }</span> </p>
                <p>Fecha de alta:  <span>{patient.fecha_fin || '-' } </span> </p>
            </div>
        </div>
    );
}