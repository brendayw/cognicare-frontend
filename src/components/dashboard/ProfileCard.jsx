import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '../../styles/dashboard/ProfileCard.module.css';

export default function ProfileCard() {
    const [profesional, setProfesional] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
        
    useEffect(() => {
        const obtenerProfesional = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No autenticado');
                
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const { data } = await axios.get(`${URL_API}api/profesional`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!data.success) throw new Error(data.message || 'Error en respuesta');
                
                setProfesional(data.data);
            } catch (err) {
                console.error('Error fetching profesional:', err);
                setError(err.message || 'Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        obtenerProfesional();
    }, []);

    if (loading) return <div className={styles.loading}>Cargando...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!profesional) return <div className={styles.error}>No hay datos disponibles</div>;

    return (
        <div className={`${styles.perfil_profesional}`}>
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
                        <span className={`${styles.datos_nombre}`}>
                            {profesional.nombre_completo}
                        </span>
                    </h4>
                    
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
        </div>
    );
}