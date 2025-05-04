import React from 'react';
import PsychologyAltTwoToneIcon from '@mui/icons-material/PsychologyAltTwoTone';
import PsychologyTwoToneIcon from '@mui/icons-material/PsychologyTwoTone';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import styles from '../../styles/dashboard/PatientsCategories.module.css';

export default function PatientsCategories() {
    return (
        <div className={`${styles.tarjetas}`}>
            <a href="patients/diagnosis" className={`${styles.tarjeta}`}>
                <div className={styles['tarjeta-content']}>
                    <PsychologyAltTwoToneIcon />
                    <span>Diagnóstico</span>
                </div>
            </a>
            <a href="patients/treatment" className={`${styles.tarjeta}`}>
                <div className={styles['tarjeta-content']}>
                    <PsychologyTwoToneIcon />
                    <span>Tratamiento</span>
                </div>
            </a>
            <a href="patients/discharged" className={`${styles.tarjeta}`}>
                <div className={styles['tarjeta-content']}>
                    <FavoriteBorderTwoToneIcon />
                    <span>De alta</span>
                </div>
            </a>
        </div>
    );
}