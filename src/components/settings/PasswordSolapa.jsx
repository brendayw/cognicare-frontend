import { useState } from 'react';
import { FormInput, FormButton } from '../index.jsx';
import { usePasswordUpdate } from '../../hooks/index.jsx';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import styles from '../../styles/settings/PasswordSolapa.module.css';

export default function PasswordSolapa({ isMobile = false, onBack }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmedNewPassword: ''
  });
  const { updatePassword, isSubmitting, error, success } = usePasswordUpdate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmedNewPassword) {
      alert('Las contraseñas nuevas no coinciden');
      return;
    }

    const updated = await updatePassword(formData);
    if (updated) {
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmedNewPassword: ''
      });
    }
  };

  return (
    <div className={`${styles.solapa} ${styles.solapa_password} ${styles.panel_content}`}>
      {isMobile && onBack && (
        <div className="mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-[#00a396] hover:text-[#008a7a] transition-colors"
            aria-label="Volver al panel de configuraciones"
          >
            <ArrowBackIosTwoToneIcon className="cursor-pointer" />
          </button>
        </div>
      )}

      <form className={`${styles.form_password}`} onSubmit={handleSubmit}>
        <h3 className={`${styles.titulo_form}`}>Cambiar Contraseña</h3>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        {success && (
          <div className={styles.success_message}>
            ¡Contraseña cambiada con éxito!
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
        
        <div className='relative bottom-8 md:top-[-40px] sm:top-[-20px] lg:top-0 right-1'>
          <FormButton texto="Guardar" noTop/>
        </div>

      </form>
    </div>
  );
};