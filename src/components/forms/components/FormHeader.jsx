import { useNavigate } from 'react-router-dom';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import styles from '../../../styles/dashboard/forms/components/FormHeader.module.css';

export default function FormHeader( { titulo = 'Formulario'}) {
    const navigate = useNavigate();
    return (
        <div className={`${styles.header}`}>
            <div  className={`${styles.titulo_header}`}>
                <h2>{titulo}</h2>
            </div>
            <div className={`${styles.boton_header}`}>
                <button onClick={() => navigate(-1)} className={`${styles.btn}`}>
                    <ArrowBackIosTwoToneIcon className='text-[#94a3b8]'/>
                </button>
            </div>
        </div>
    );
}
