import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import PasswordTwoToneIcon from '@mui/icons-material/PasswordTwoTone';
import HeartBrokenTwoToneIcon from '@mui/icons-material/HeartBrokenTwoTone';
import styles from '../../styles/settings/PanelSettings.module.css';

export default function PanelSettings({ activeTab, onTabChange }) {
  return (
    <div className={styles.panel_settings}>
      <div className={styles.opciones}>
        <button 
          className={`${styles.perfil} ${activeTab === 'perfil' ? styles.selected : ''}`} 
          onClick={() => onTabChange('perfil')} 
          aria-label="Editar Perfil"
        >
          <div className={styles.icono_opciones}>
            <ManageAccountsTwoToneIcon />
          </div>
          <span>Perfil</span>
        </button>

        <button 
          className={`${styles.password} ${activeTab === 'password' ? styles.selected : ''}`} 
          onClick={() => onTabChange('password')} 
          aria-label="Cambiar contraseña"
        >
          <div className={styles.icono_opciones}>
            <PasswordTwoToneIcon />
          </div>
          <span>Contraseña</span>  
        </button>

        <button 
          className={`${styles.deactivate} ${activeTab === 'deactivate' ? styles.selected : ''}`} 
          onClick={() => onTabChange('deactivate')} 
          aria-label="Desactivar cuenta"
        >
          <div className={styles.icono_opciones}>
            <HeartBrokenTwoToneIcon />
          </div>
          <span>Desactivar cuenta</span>  
        </button>
      </div>
    </div>
  );
}