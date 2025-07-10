import { useParams } from 'react-router-dom';
import { usePatientData } from '../../../../hooks/index.jsx';
import { SkeletonHistory } from '../../../../skeletons/index.jsx';
import styles from '../../../../styles/patients/tabs/HistoryResume.module.css';

export default function HistoryResume() {
    const { id } = useParams();
    const { patient, loading, error } = usePatientData(id);

    if (loading) {
        return (
            <SkeletonHistory />
        );
    }

    if (error) {
        return (
            <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                <ErrorOutlineTwoToneIcon className='mr-2'/>
                {error}
            </div>
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
                <p>Motivo inicial: <span> {patient.motivoInicial || 'No disponible' }  </span> </p>
                <p>Observaciones iniciales: <span> {patient.observaciones || 'No disponible' } </span> </p>
                <p>Motivo de alta: <span>{patient.motivoAlta || 'No disponible' }</span> </p>
                <p>Fecha de alta:  <span>{patient.fechaFin || 'No disponible' } </span> </p>
            </div>
        </div>
    );
}