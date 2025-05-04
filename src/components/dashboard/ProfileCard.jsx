import React, { useState, useEffect } from 'react';
import axios from 'axios';
import avatarFemenino from '../../../public/assets/avatar_mujer.jpg';
import avatarMasculino from '../../../public/assets/hombre_avatar.avif';
import styles from '../../styles/dashboard/ProfileCard.module.css';

export default function ProfileCard() {
    const [perfil, setPerfil] = useState({});

    useEffect(() => {
        const perfilTemporal = {
            nombre: 'Juan Pérez',
            email: 'juan.perez@ejemplo.com',
            matricula: 1256,
            especialidad: 'Psicóloga',
            fotoPerfil: 'https://via.placeholder.com/150', // Imagen de placeholder
            // Agrega más campos si lo necesitas
          };

        // axios.get('/api/perfil')
        // .then((response) => {
        //     if (response.data.success) {
            setPerfil(perfilTemporal);
        //     } else {
        //     console.log("Error: No se pudo obtener los datos del perfil.");
        //     }
        // })
        // .catch((error) => {
        //     console.error('Error al obtener los datos:', error);
        // });
    }, []);

    const obtenerAvatar = (genero) => {
        if (genero === 'femenino') return avatarFemenino;
        if (genero === 'masculino') return avatarMasculino;
        return avatarFemenino; // imagen neutral por defecto
    };

    return (
        <div className={`${styles.perfil_profesional} `}>
        {/* <h3 className='text-primary text-base'>Perfil del profesional</h3> */}
        <div className={`${styles.tarjeta_profesional} `}>
          <div className={`${styles.perfil}`}>
              <img className={`${styles.profesional_img}`} src={obtenerAvatar(perfil.genero)} alt="Avatar del profesional" />
          </div>
          <div className={`${styles.datos}`}>
            <h4>
              <span>{perfil.nombre_completo}</span>
            </h4>
            <p className='text-primary text-base'>Profesión: <span>{perfil.especialidad}</span></p>
            <p className='text-primary text-base'>Matrícula: <span>{perfil.matricula}</span></p>
          </div>
          <div className={`${styles.btn}`}>
            {/* cambiar por componente */}
            <a className={`${styles.ver_perfil}`} href="profesional">Ver Perfil</a>
          </div>
        </div>
      </div>
    );
}