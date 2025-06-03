import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../../styles/patients/tabs/HistoryResume.module.css';

export default function HistoryResume() {
    const [patientData, setPatientData] = useState('');
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');

                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}api/patients/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                        setPatientData(response.data.data);
                    } else {
                        setError('No se pudo obtener los datos del paciente.');
                    }

            } catch (err) {
                console.error('Error:', err.response?.data || err.message);
                setError('Error al obtener datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        }
        obtenerData();
    }, [id]);

    if (loading) return <div className=''>Cargando datos...</div>;
    const normalizeEstado = (estado) => {
        if (!estado) return 'tratamiento';
        return estado.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const estadoNormalizado = normalizeEstado(patientData?.estado);

    return (
        <div className={`${styles.resume_tab} ${styles[`resume_tab--${estadoNormalizado}`]}`}>
            <div className={`${styles.history_details} ${styles[`history_details--${estadoNormalizado}`]}`}>
                <p>Motivo inicial: <span> {patientData.motivo_inicial || '-' }  </span> </p>
                <p>Observaciones iniciales: <span> {patientData.observaciones || '-' } </span> </p>
                <p>Motivo de alta: <span>{patientData.motivo_alta || '-' }</span> </p>
                <p>Fecha de alta:  <span>{patientData.fecha_fin || '-' } </span> </p>
            </div>
        </div>
    );
}