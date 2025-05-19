import { Link } from 'react-router-dom';
import PsychologyAltTwoToneIcon from '@mui/icons-material/PsychologyAltTwoTone';
import PsychologyTwoToneIcon from '@mui/icons-material/PsychologyTwoTone';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
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
            <div className={`${styles.access_card} ${styles.pacientes}`}>
                <Link to="/patients">
                    <GroupsTwoToneIcon />
                    <span>Pacientes</span>
                </Link>
            </div>
            <div className={`${styles.access_card} ${styles.diagnostico}`}>
                <Link to="/patients/diagnosis">
                    <PsychologyAltTwoToneIcon />
                    <span>Diagnóstico</span>
                </Link>
            </div>
            <div className={`${styles.access_card} ${styles.tratamiento}`}>
                <Link to="/patients/treatment">
                    <PsychologyTwoToneIcon />
                    <span>Tratamiento</span>    
                </Link>
            </div>
            <div className={`${styles.access_card} ${styles.alta}`}>
                <Link to="/patients/discharged">
                    <FavoriteBorderTwoToneIcon />
                    <span>Alta</span>    
                </Link>
            </div>
            <div className={`${styles.access_card} ${styles.pacientes}`}>
                <div className={`${styles.add_card}`}>
                    <AddCircleTwoToneIcon />
                    <span>Agregar</span>
                   
                    <div className={`${styles.options}`}>
                        {[
                            { to: "/patients/add", icon: <PersonAddAltTwoToneIcon />},
                            { to: "/patients/session/add", icon: <VolunteerActivismTwoToneIcon />},
                            { to: "/patients/assessments/add", icon: <NoteAddTwoToneIcon /> },
                            { to: "/patients/reports/add", icon: <FilePresentTwoToneIcon /> }
                        ].map((item, index) => (
                            <div key={index} className={`${styles.option}`}>
                                <Link to={item.to}>
                                    {item.icon}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}