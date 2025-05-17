import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/settings/PasswordSolapa.module.css';

export default function PasswordSolapa() {
  const [formData, setFormData] = useState({
    password_actual: '',
    nueva_password: '',
    confirmar_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password_actual, nueva_password, confirmar_password } = formData;

    if (nueva_password !== confirmar_password) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (!password_actual || !nueva_password || !confirmar_password) {
      alert('Por favor, ingresa todos los campos.');
      return;
    }

    try {
      const URL_API = 'https://cognicare-backend.vercel.app/';
      await axios.post(`${URL_API}/api/cambiarPassword`, {
        nueva_password,
        password_actual
      });
      alert('Contraseña cambiada con éxito');
      setFormData({
        password_actual: '',
        nueva_password: '',
        confirmar_password: ''
      });
    } catch (error) {
      if (error.response) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Error al cambiar la contraseña');
      }
    }
  };

  return (
    <div id="passwordSolapa" className={`${styles.solapa} ${styles.solapa_password}`}>
      <h3>Cambiar Contraseña</h3>
      <form id="cambiarPassword" className={`${styles.form_password}`} onSubmit={handleSubmit}>
        <div className={`${styles.campo} ${styles.campo_password}`}>
          <label htmlFor="password_actual">Contraseña actual:</label>
          <input 
            type="password" 
            id="passwordActual" 
            name="password_actual" 
            placeholder="Contraseña actual" 
            value={formData.password_actual}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className={`${styles.campo} ${styles.campo_password}`}>
          <label htmlFor="nueva_password">Nueva Contraseña:</label>
          <input 
            type="password" 
            id="nuevaPassword" 
            name="nueva_password" 
            placeholder="Nueva Contraseña" 
            value={formData.nueva_password}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div className={`${styles.campo} ${styles.campo_password}`}>
          <label htmlFor="confirmar_password">Confirmar Nueva Contraseña:</label>
          <input 
            type="password" 
            id="confirmarPassword" 
            name="confirmar_password" 
            placeholder="Confirmar nueva contraseña" 
            value={formData.confirmar_password}
            onChange={handleChange}
            required 
          />
        </div>

        <div className={`${styles.campo_password}`}>
          <button className={`${styles.btn_password}`} type="submit" aria-label="Guardar cambios de la contraseña">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};