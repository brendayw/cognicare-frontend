import React from 'react';
import { Link } from 'react-router-dom';
import PsychologyAltTwoToneIcon from '@mui/icons-material/PsychologyAltTwoTone';
import PsychologyTwoToneIcon from '@mui/icons-material/PsychologyTwoTone';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import styles from '../../styles/dashboard/PatientsCategories.module.css';

export default function PatientsCategories() {
    return (
        <div className={`${styles.tarjetas}`}>
            <Link to="/patients/diagnosis" className={`${styles.tarjeta}`}>
                <div className={styles['tarjeta-content']}>
                    <PsychologyAltTwoToneIcon />
                    <span>Diagnóstico</span>
                </div>
            </Link>
            <Link to="/patients/treatment" className={`${styles.tarjeta}`}>
                <div className={styles['tarjeta-content']}>
                    <PsychologyTwoToneIcon />
                    <span>Tratamiento</span>
                </div>
            </Link>
            <Link to="/patients/discharged" className={`${styles.tarjeta}`}>
                <div className={styles['tarjeta-content']}>
                    <FavoriteBorderTwoToneIcon />
                    <span>De alta</span>
                </div>
            </Link>
        </div>
    );
}