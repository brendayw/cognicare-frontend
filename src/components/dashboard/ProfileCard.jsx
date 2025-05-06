import React from 'react';
import avatarFemenino from '../../../public/assets/avatar_mujer.jpg';
import avatarMasculino from '../../../public/assets/hombre_avatar.avif';
import styles from '../../styles/dashboard/ProfileCard.module.css';

export default function ProfileCard( { profesional }) {
    // Función para obtener el avatar según el género
    // const obtenerAvatar = (genero) => {
    //     if (genero === 'femenino') return avatarFemenino;
    //     if (genero === 'masculino') return avatarMasculino;
    //     return avatarFemenino;  // Valor por defecto
    // };

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
                            E-mail: <span>{profesional.correo_electronico}</span>
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