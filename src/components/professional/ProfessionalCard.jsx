import { Link, useParams } from 'react-router-dom';
import { useProfessionalData } from '../../hooks/index.jsx';
import SkeletonProfileHeader from '../../skeletons/headers/SkeletonProfileHeader.jsx';
import avatarFemenino from '/assets/female-header.png';
import avatarMasculino from '/assets/male-header.png';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/profesional/ProfesionalCard.module.css';

export default function ProfessionalCard() {
    const { id } = useParams();
    const { professional, loading, error } = useProfessionalData(id);

    if (loading) {
        return (
            <SkeletonProfileHeader />
        );
    }
    
    return (
        <div className={`${styles.profesional_container}`}>
            {error ? (
                <div className={styles.error}>
                    <p className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>
            ) : (
                <div className={`${styles.tarjeta_profesional}`}>
                    <div className={`${styles.perfil}`}>
                        <img
                            className={`${styles.profesional_header}`}
                            src={professional.genero === 'Femenino' ? avatarFemenino : avatarMasculino}
                            alt="Avatar del profesional"
                        />
                    </div>
                    <div className={`${styles.datos}`}>
                        <h4>
                            <span className={`${styles.datos_nombre}`}>
                                {professional.nombre_completo || 'Cargando...'}
                            </span>
                        </h4>
                        
                        <div className={`${styles.datos_perfil}`}>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Profesión: <span>{professional.especialidad || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Matrícula: <span>{professional.matricula || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Telefono: <span>{professional.telefono || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    E-mail: <span>{professional.email || '-'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link to="edit">
                        <CreateTwoToneIcon />
                    </Link>
                </div>
            )}
        </div>
    );
}