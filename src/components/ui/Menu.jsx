import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from '../index.jsx';
import { useLogOut } from '../../hooks/index.jsx';
import axios from 'axios';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/Menu.module.css';

export default function Menu() {
    const location = useLocation();
    const logout = useLogOut();
    const [idProfesional, setIdProfesional] = useState(null);
    const [error, setError] = useState(null);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const searchInputRef = useRef(null);

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
        if (!isSearchActive && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current.focus();
            }, 100);
        }
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const payloadBase64 = token.split('.')[1];
            const payload = JSON.parse(atob(payloadBase64));
            const idUsuario = payload.sub;

            const obtenerIdProfesional = async () => {
                try {
                    const response = await axios.get(`https://cognicare-backend.vercel.app/api/profesional/usuario/${idUsuario}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (response.data.success && response.data.data) {
                        setIdProfesional(response.data.data.id);
                    } else {
                        setIdProfesional(null);
                    }

                } catch (error) {
                    setIdProfesional(null);
                    setError(error.message);
                }
            };
            obtenerIdProfesional();
        } catch (error) {
            setIdProfesional(null);
            setError('Error: ', error.message);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path) => location.pathname.includes(path) ? 'active' : '';

    return (        
        <div className={styles.menu_dashboard}>

            <div className={styles.top_menu}>
                <div className={styles.logo}>
                    <span>CogniCare</span>
                </div>


                {isMobile && (
                    <div className={styles.mobile_buttons}>
                        <button 
                            className={styles.mobile_button}
                            onClick={toggleSearch}
                        >
                            <SearchIcon />
                        </button>
                    </div>
                )}
            </div>

            <div className={`${styles.search_container} ${isSearchActive ? styles.active : ''}`}>
                <SearchBar 
                    isActive={isSearchActive}
                    onToggle={toggleSearch}
                    ref={searchInputRef} 
                />
            </div>

            <div className={styles.menu}>
                <div className={`${styles.enlace} ${isActive('/dashboard')}`}>
                    <Link to="/dashboard" className={styles.link_menu}>
                        <HomeTwoToneIcon />
                        {!isMobile && <span>Inicio</span>}
                    </Link>
                </div>

                <div className={`${styles.enlace} ${isActive('/patients')}`}>
                    <Link to="/patients" className={styles.link_menu}>
                        <GroupsTwoToneIcon/>
                         {!isMobile && <span>Pacientes</span>}
                    </Link>
                </div>

                <div className={`${styles.enlace} ${isActive('/profesional')}`}>
                    <Link to={idProfesional ? `/profesional/${idProfesional}` : '/profesional'} className={styles.link_menu}>
                        <PersonOutlineTwoToneIcon />
                        {!isMobile && <span>Profesional</span>}
                    </Link>
                </div>

                <div className={`${styles.enlace} ${isActive('/settings')}`}>
                    <Link to="/settings" className={styles.link_menu}>
                        <SettingsTwoToneIcon />
                        {!isMobile && <span>Ajustes</span>}
                    </Link>
                </div>

                <div className={`${styles.enlace} ${styles.logout}`} onClick={logout}>
                    <div className={styles.link_menu}>
                        <LogoutTwoToneIcon />
                        {!isMobile && <span>Salir</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}