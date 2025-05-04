import React from 'react';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import NoteAddTwoToneIcon from '@mui/icons-material/NoteAddTwoTone';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import styles from '../../styles/dashboard/AddButtons.module.css';

export default function AddButtons() {
    return (
        <div className={`${styles.add_container}`}>
            <div className={`${styles.add_card}`}>
                <a href="/patients/add">
                    <PersonAddAltTwoToneIcon />
                    <span>Paciente</span>
                </a>
            </div>
            <div className={`${styles.add_card}`}>
                <a href="patients/session/add">
                    <VolunteerActivismTwoToneIcon />
                    <span>Sesión</span>
                </a>
            </div>
            <div className={`${styles.add_card}`}>
                <a href="patients/assessments/add">
                    <NoteAddTwoToneIcon />
                    <span>Evaluación</span>    
                </a>
            </div>
            <div className={`${styles.add_card}`}>
                <a href="/patients/reports/add">
                    <FilePresentTwoToneIcon />
                    <span>Reporte</span>
                </a>
            </div>
        </div>
    );
}