import { useParams } from 'react-router-dom';
import { useProfessionalData } from '../../hooks/index.jsx';
import SkeletonHeader from '../../skeletons/headers/SkeletonHeader.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import styles from '../../styles/dashboard/ProfileCard.module.css';

export default function ProfileCard() {
    const { id } = useParams();
    const { professional, loading, error } = useProfessionalData(id);
        
    if (loading) {
        return (
            <div className=''>
                <SkeletonHeader />
            </div>
        );
    }
    
    const isProfessionalNotFound = error && error.includes('404');

    return (
        <div className={styles.perfil_profesional}>
            {isProfessionalNotFound ? (
                <div className='flex items-center justify-center'> 
                    <p className='w-full bg-[#fff3e0] border border-amber-300 rounded-md text-center text-[#FFA000] text-sm m-4 p-4'>
                        <WarningAmberTwoToneIcon className='m-2'/>
                        Por favor, complete los datos del profesional en la sección de Ajustes.
                    </p>
                </div>
            ) : error ? (
                <div className='flex items-center justify-center'> 
                    <p className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='m-2'/>
                        {error}
                    </p>
                </div>
            ) : (
                <div className={`${styles.tarjeta_profesional}`}>
                    <div className={`${styles.perfil}`}>
                        <img
                            className={`${styles.profesional_header}`}
                            src='./assets/bg-header.png'
                            alt="Avatar del profesional"
                        />
                    </div>
                    <div className={`${styles.datos}`}>
                        <h4>
                            ¡Bienvenido de nuevo!
                        </h4>
                        <span className={`${styles.datos_nombre}`}>
                            {professional.nombre_completo}
                        </span>
                        
                        <div className={`${styles.datos_perfil}`}>
                            <p className="text-primary text-base">
                                Profesión: <span>{professional.especialidad}</span>
                            </p>
                            <p className="text-primary text-base">
                                Matrícula: <span>{professional.matricula}</span>
                            </p>
                            <p className="text-primary text-base">
                            Teléfono: <span>{professional.telefono}</span>
                            </p>
                            <p className="text-primary text-base">
                                E-mail: <span>{professional.email}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}