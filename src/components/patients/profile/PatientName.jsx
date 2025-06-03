import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AvatarFemenino from '/assets/avatar_mujer.jpg';
import AvatarMasculino from '/assets/hombre_avatar.avif';
import styles from '../../../styles/patients/profile/PatientName.module.css';


export default function PatientName() {
    const [perfilDetallado, setPerfilDetallado] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                if (!id) throw new Error('Id del paciente no reconocido');
    
                const response = await axios.get(`${URL_API}api/patients/${id}`, 
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
    }, [id]);

    if (loading) return <div className={styles.loading}>Cargando...</div>;

    const avatarImagen = perfilDetallado.genero === 'Masculino' ? AvatarMasculino : AvatarFemenino;
    
    const normalizeEstado = (estado) => {
        if (!estado) return 'tratamiento';
        return estado.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const estadoNormalizado = normalizeEstado(perfilDetallado?.estado);
    
    return (
        <div className={`${styles.patient_card}`} >
            <div className={`${styles.patient_photo}`}>
                <img src={avatarImagen} alt={`Avatar predeterminado para ${perfilDetallado.nombre_completo}`} />
            </div>

            <div className={`${styles.patient_info} ${styles[`patient_info--${estadoNormalizado}`]}` }>
                <h4> <span> {perfilDetallado.nombre_completo} </span> </h4>

                <div className={`${styles.patient_info_details}`}>
                    
                    <div className={`${styles.info_details}`}>
                        
                        <div className={`${styles.details_col}`}>
                            <p className={`${styles.title}`}> ID del paciente </p>
                            <p className={`${styles.data}`}> {perfilDetallado.id} </p>
                        </div>
                        
                        <div className={`${styles.details_col}`}>
                            <p className={`${styles.title}`}> ID del profesional </p>
                            <p className={`${styles.data}`}> {perfilDetallado.id_profesional} </p>
                        </div>
                    </div>
                </div>  
            </div>          
        </div>
    );
}