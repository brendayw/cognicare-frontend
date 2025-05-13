import React from 'react';
import PsychologyAltTwoToneIcon from '@mui/icons-material/PsychologyAltTwoTone';
import PsychologyTwoToneIcon from '@mui/icons-material/PsychologyTwoTone';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import NoteAddTwoToneIcon from '@mui/icons-material/NoteAddTwoTone';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import styles from '../../styles/profesional/Buttons.module.css';

export default function Buttons() {

    return (
        <div className={`${styles.acceso_rapido}`}>
            <div className={`${styles.access_card}`}>
                <a href="/patients">
                    <GroupsTwoToneIcon />
                    <span>Pacientes</span>
                </a>
            </div>
            <div className={`${styles.access_card}`}>
                <a href="patients/diagnosis">
                    <PsychologyAltTwoToneIcon />
                    <span>Diagnóstico</span>
                </a>
            </div>
            <div className={`${styles.access_card}`}>
                <a href="patients/treatment">
                    <PsychologyTwoToneIcon />
                    <span>Evaluación</span>    
                </a>
            </div>
            <div className={`${styles.access_card}`}>
                <div className={`${styles.add_card}`}>
                    
                    <AddCircleTwoToneIcon />
                    <span>Agregar</span>
                   
                    <div className={`${styles.options}`}>
                    {[
                        { href: "/patients/add", icon: <PersonAddAltTwoToneIcon />},
                        { href: "/patients/session/add", icon: <VolunteerActivismTwoToneIcon />},
                        { href: "/patients/assessment/add", icon: <NoteAddTwoToneIcon /> },
                        { href: "/patients/report/add", icon: <FilePresentTwoToneIcon /> }
                    ].map((item, index) => (
                        <div key={index} className={`${styles.option}`}>
                        <a href={item.href}>
                            <i className="material-icons-sharp">{item.icon}</i>
                        </a>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}