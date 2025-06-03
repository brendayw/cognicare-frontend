import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from '../../styles/Menu.module.css';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

export default function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Función de cierre de sesión
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/'); 
    };

    const isActive = (path) => {
        return location.pathname.includes(path) ? `${styles.active}` : '';
    };

    return (        
        <div className={`${styles.menu_dashboard}`}>
            {/* Top menu */}
            <div className={`${styles.top_menu} `}>
                <div className={`${styles.logo} `}>
                    <span>CogniCare</span>
                </div>
            </div>

            <SearchBar />

            {/* Menu */}
            <div className={`${styles.menu}`}>
                <div className={`${styles.enlace} ${isActive('/dashboard')} `}>
                    <Link to="/dashboard"  className={`${styles.link_menu} `} >
                        <HomeTwoToneIcon  />
                        <span>Inicio</span>
                    </Link>
                </div>

                <div className={`${styles.enlace} ${isActive('/patients')} `}>
                    <Link to="/patients" className={`${styles.link_menu} `}>
                        <GroupsTwoToneIcon/>
                        <span>Pacientes</span>
                    </Link>
                </div>

                <div className={`${styles.enlace} ${isActive('/profesional')} `}>
                    <Link to="/profesional" className={`${styles.link_menu} `} >
                        <PersonOutlineTwoToneIcon />
                        <span>Profesional</span>
                    </Link>
                </div>

                <div className={`${styles.enlace} ${isActive('/settings')} `}>
                    <Link to="/settings"  className={`${styles.link_menu} `} >
                        <SettingsTwoToneIcon />
                        <span>Ajustes</span>
                    </Link>
                </div>

                <div className={`${styles.enlace} ${styles.logout} `} onClick={logout}>
                    <div id="logout" className={`${styles.link_menu} `}>
                        <LogoutTwoToneIcon />
                        <span>Salir</span>
                    </div>
                </div>
            </div>
        </div>
    );
}