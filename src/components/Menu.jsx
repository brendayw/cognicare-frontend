import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from '../styles/Menu.module.css';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';


export default function Menu() {
    const location = useLocation();

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
                    <a className={`${styles.link_menu} `} to="/dashboard">
                        <HomeTwoToneIcon  />
                        <span>Inicio</span>
                    </a>
                </div>

                <div className={`${styles.enlace} ${isActive('/patients')} `}>
                    <a className={`${styles.link_menu} `} to="/patients">
                        <GroupsTwoToneIcon/>
                        <span>Pacientes</span>
                    </a>
                </div>

                <div className={`${styles.enlace} ${isActive('/profesional')} `}>
                    <a className={`${styles.link_menu} `} to="/profesional">
                        <PersonOutlineTwoToneIcon />
                        <span>Profesional</span>
                    </a>
                </div>

                <div className={`${styles.enlace} ${isActive('/settings')} `}>
                    <a className={`${styles.link_menu} `}  to="/settings">
                        <SettingsTwoToneIcon />
                        <span>Ajustes</span>
                    </a>
                </div>

                <div className={`${styles.enlace} ${styles.logout} `}>
                    <div id="logout" className={`${styles.link_menu} `}>
                        <LogoutTwoToneIcon />
                        <span>Salir</span>
                    </div>
                </div>
            </div>
        </div>
    );
}