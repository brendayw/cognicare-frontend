import { useParams } from 'react-router-dom';
import { usePatientData } from '../../../hooks/usePatientData.jsx';
import AvatarFemenino from '/assets/avatar_mujer.jpg';
import AvatarMasculino from '/assets/hombre_avatar.avif';
import styles from '../../../styles/patients/profile/PatientName.module.css';

export default function PatientName() {
    const { id } = useParams();
    const { patient, loading, error } = usePatientData(id);

    if (loading) return <div className={styles.loading}>Cargando...</div>;
    if (error) return <div className={styles.error}>{error}</div>; 

    const avatarImagen = patient.genero === 'Masculino' ? AvatarMasculino : AvatarFemenino;
    
    const normalizeEstado = (estado) => {
        if (!estado) return 'tratamiento';
        return estado.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const estadoNormalizado = normalizeEstado(patient.estado);
    
    return (
        <div className={`${styles.patient_card}`} >
            <div className={`${styles.patient_photo}`}>
                <img src={avatarImagen} alt={`Avatar predeterminado para ${patient.nombre_completo}`} />
            </div>

            <div className={`${styles.patient_info} ${styles[`patient_info--${estadoNormalizado}`]}` }>
                <h4> <span> {patient.nombre_completo} </span> </h4>

                <div className={`${styles.patient_info_details}`}>
                    
                    <div className={`${styles.info_details}`}>
                        
                        <div className={`${styles.details_col}`}>
                            <p className={`${styles.title}`}> ID del paciente </p>
                            <p className={`${styles.data}`}> {patient.id} </p>
                        </div>
                        
                        <div className={`${styles.details_col}`}>
                            <p className={`${styles.title}`}> ID del profesional </p>
                            <p className={`${styles.data}`}> {patient.id_profesional} </p>
                        </div>
                    </div>
                </div>  
            </div>          
        </div>
    );
}