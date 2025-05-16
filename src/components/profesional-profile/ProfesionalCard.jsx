import React, {useState, useEffect} from 'react';
import axios from 'axios';
import avatarFemenino from '../../../public/assets/female-header.png';
import avatarMasculino from '../../../public/assets/male-header.png';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import styles from '../../styles/profesional/ProfesionalCard.module.css';

// ProfesionalCard.jsx
export default function ProfesionalCard() {
    const [perfil, setPerfil] = useState(null);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/profesional', 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                if (response.data.success) {
                    setPerfil(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil.');
                }

            } catch (err) {
                console.error('Error:', err.response?.data || err.message);
                setError('No se pudo obtener el perfil del profesional.'); // Manejo de errores
            } 
        };

        obtenerPerfil();
    }, []);

    return (
        <div className={`${styles.profesional_container}`}>
            <div className={`${styles.tarjeta_profesional}`}>
                <div className={`${styles.perfil}`}>
                    <img
                        className={`${styles.profesional_header}`}
                        src={perfil?.genero === 'Femenino' ? avatarFemenino : avatarMasculino}
                        alt="Avatar del profesional"
                    />
                </div>
                <div className={`${styles.datos}`}>
                    <h4>
                        <span className={`${styles.datos_nombre}`}>
                            {perfil?.nombre_completo || 'Cargando...'}
                        </span>
                    </h4>
                    
                    <div className={`${styles.datos_perfil}`}>
                        <div className={`${styles.dato_perfil}`}>
                            <p className="text-primary text-base">
                                Profesión: <span>{perfil?.especialidad || '-'}</span>
                            </p>
                        </div>
                        <div className={`${styles.dato_perfil}`}>
                            <p className="text-primary text-base">
                                Matrícula: <span>{perfil?.matricula || '-'}</span>
                            </p>
                        </div>
                        <div className={`${styles.dato_perfil}`}>
                            <p className="text-primary text-base">
                                Telefono: <span>{perfil?.telefono || '-'}</span>
                            </p>
                        </div>
                        <div className={`${styles.dato_perfil}`}>
                            <p className="text-primary text-base">
                                E-mailn: <span>{perfil?.email || '-'}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <CreateTwoToneIcon />
            </div>
        </div>
    );
}