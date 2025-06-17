import { Link } from 'react-router-dom';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import NoteAddTwoToneIcon from '@mui/icons-material/NoteAddTwoTone';
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone';
import styles from '../../styles/dashboard/AddButtons.module.css';

export default function AddButtons() {
    return (
        <div className={styles.add_container}>
            <div className={styles.add_card}>
                <Link to="/patients/add">
                    <PersonAddAltTwoToneIcon />
                    <span>Paciente</span>
                </Link>
            </div>
            <div className={styles.add_card}>
                <Link to="/patients/session/add">
                    <VolunteerActivismTwoToneIcon />
                    <span>Sesión</span>
                </Link>
            </div>
            <div className={styles.add_card}>
                <Link to="/patients/assessments/add">
                    <NoteAddTwoToneIcon />
                    <span>Evaluación</span>    
                </Link>
            </div>
            <div className={styles.add_card}>
                <Link to="/patients/reports/add">
                    <FilePresentTwoToneIcon />
                    <span>Reporte</span>
                </Link>
            </div>
        </div>
    );
}