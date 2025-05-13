import React, {useState, useEffect} from 'react';
import avatarFemenino from '../../../public/assets/female-header.png';
import avatarMasculino from '../../../public/assets/male-header.png';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import styles from '../../styles/profesional/ProfesionalCard.module.css';

// ProfesionalCard.jsx
export default function ProfesionalCard({ prof }) {
    return (
        <div className={`${styles.profesional_container}`}>
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
        </div>
    );
}