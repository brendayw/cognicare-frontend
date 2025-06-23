import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/dashboard/ProfileCard.module.css';

export default function ProfileCard() {
    const [profesional, setProfesional] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
        
    useEffect(() => {
        const obtenerProfesional = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const { data } = await axios.get(`${URL_API}profesional/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!data.success) throw new Error(data.message || 'Error en respuesta');
                
                setProfesional(data.data);
                
            } catch (err) {

                setError('Error al cargar datos: ' + err.message);
            } finally {

                setLoading(false);
            }
        };
        obtenerProfesional();
    }, []);

    if (loading) return <div className={styles.loading}>Cargando...</div>;

    return (
        <div className={styles.perfil_profesional}>
            {error ? (
                <div className={styles.error}> 
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
                            src='./assets/bg-header.png' // Usar la prop 'perfil' que ya viene de Dashboard
                            alt="Avatar del profesional"
                        />
                    </div>
                    <div className={`${styles.datos}`}>
                        <h4>
                            ¡Bienvenido de nuevo!
                        </h4>
                        <span className={`${styles.datos_nombre}`}>
                            {profesional.nombre_completo}
                        </span>
                        
                        <div className={`${styles.datos_perfil}`}>
                            <p className="text-primary text-base">
                                Profesión: <span>{profesional.especialidad}</span>
                            </p>
                            <p className="text-primary text-base">
                                Matrícula: <span>{profesional.matricula}</span>
                            </p>
                            <p className="text-primary text-base">
                            Teléfono: <span>{profesional.telefono}</span>
                            </p>
                            <p className="text-primary text-base">
                                E-mail: <span>{profesional.email}</span>
                            </p>
                        </div>
                    </div>
                    {/* <div className={`${styles.btn}`}>
                        <a className={`${styles.ver_perfil}`} href="profesional">Ver Perfil</a>
                    </div> */}
                </div>
            )}
        </div>
    );
}