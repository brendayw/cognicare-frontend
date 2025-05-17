import React, {useState, useEffect} from 'react';
import avatarFemenino from '../../../public/assets/female-header.png';
import avatarMasculino from '../../../public/assets/male-header.png';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/profesional/ProfesionalCard.module.css';

// ProfesionalCard.jsx
export default function ProfesionalCard({ prof }) {
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}api/profesional`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                if (response.data.success) {
                    setPerfil(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil del profesional.');
                }

            } catch (err) {
                console.error('Error:', err.response?.data || err.message);
                setError('Error al cargar datos: ' + err.message); // Manejo de errores
            } 
        };

        obtenerPerfil();
    }, []);

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
                            src={prof?.genero === 'Femenino' ? avatarFemenino : avatarMasculino}
                            alt="Avatar del profesional"
                        />
                    </div>
                    <div className={`${styles.datos}`}>
                        <h4>
                            <span className={`${styles.datos_nombre}`}>
                                {prof?.nombre_completo || 'Cargando...'}
                            </span>
                        </h4>
                        
                        <div className={`${styles.datos_perfil}`}>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Profesión: <span>{prof?.especialidad || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Matrícula: <span>{prof?.matricula || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Telefono: <span>{prof?.telefono || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    E-mailn: <span>{prof?.correo_electronico || '-'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <CreateTwoToneIcon />
                </div>
            )}
        </div>
    );
}