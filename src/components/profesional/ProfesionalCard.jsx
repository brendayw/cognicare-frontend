import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import avatarFemenino from '/assets/female-header.png';
import avatarMasculino from '/assets/male-header.png';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/profesional/ProfesionalCard.module.css';

// ProfesionalCard.jsx
export default function ProfesionalCard({ prof }) {
    const [perfilDetallado, setPerfilDetallado] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
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
                    setPerfilDetallado(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil del profesional.');
                }

            } catch (err) {
                console.error('Error:', err.response?.data || err.message);
                setError('Error al cargar datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        obtenerPerfil();
    }, []);

    const profesional = {
        ...prof,
        ...(perfilDetallado || {})
    };

    if (loading) return <div className={styles.loading}>Cargando...</div>;

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
                            src={profesional?.genero === 'Femenino' ? avatarFemenino : avatarMasculino}
                            alt="Avatar del profesional"
                        />
                    </div>
                    <div className={`${styles.datos}`}>
                        <h4>
                            <span className={`${styles.datos_nombre}`}>
                                {profesional?.nombre_completo || 'Cargando...'}
                            </span>
                        </h4>
                        
                        <div className={`${styles.datos_perfil}`}>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Profesión: <span>{profesional?.especialidad || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Matrícula: <span>{profesional?.matricula || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    Telefono: <span>{profesional?.telefono || '-'}</span>
                                </p>
                            </div>
                            <div className={`${styles.dato_perfil}`}>
                                <p className="text-primary text-base">
                                    E-mail: <span>{profesional?.email || '-'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Link to="/settings">
                        <CreateTwoToneIcon />
                    </Link>
                </div>
            )}
        </div>
    );
}