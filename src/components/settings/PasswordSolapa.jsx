import { useState } from 'react';
import axios from 'axios';
import FormInput from '../forms/components/FormInput';
import FormButton from '../forms/components/FormButton';
import styles from '../../styles/settings/PasswordSolapa.module.css';

export default function PasswordSolapa() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmedNewPassword: ''
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target; // Cambiado de name a id
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const URL_API = 'https://cognicare-backend.vercel.app/api/';
      const token = localStorage.getItem('token');
      console.log('Datos enviados:', formData);

      const response = await axios.put(`${URL_API}password/update`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert('Contraseña cambiada con éxito');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmedNewPassword: ''
        });
        setError('');
      }

    } catch (error) {
      console.error('Error completo:', error);
      if (error.response) {
        console.error('Respuesta del servidor:', error.response.data);
        setError(error.response.data.message || 'Error del servidor');
      } else if (error.request) {
        console.error('No hubo respuesta:', error.request);
        setError('El servidor no respondió');
      } else {
        console.error('Error en la solicitud:', error.message);
        setError('Error al enviar el formulario');
      }
    }
  };

  return (
    <div className={`${styles.solapa} ${styles.solapa_password} ${styles.panel_content}`}>
      <form className={`${styles.form_password}`} onSubmit={handleSubmit}>
        
        <h3 className={`${styles.titulo_form}`}>Cambiar Contraseña</h3>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <div className={`${styles.password_data}`}>
          <FormInput
            label="Contraseña actual"
            type='password'
            value={formData.oldPassword}
            onChange={handleChange}
            id="oldPassword"
            placeholder="Ingrese la contraseña actual"
            required
          />

          <FormInput
            label="Nueva contraseña"
            type='password'
            value={formData.newPassword}
            onChange={handleChange}
            id="newPassword"
            placeholder="Ingrese la nueva contraseña"
            required
          />

          <FormInput
            label="Confirmar nueva contraseña"
            type='password'
            value={formData.confirmedNewPassword}
            onChange={handleChange}
            id="confirmedNewPassword"
            placeholder="Ingrese neuvamente la nueva contraseña"
            required
          />
        </div>
        
        <div className='relative bottom-2 right-1'>
          <FormButton texto="Guardar" />
        </div>

      </form>
    </div>
  );
};