import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import TabTitle from '../TabTitle';
import styles from '../../../../styles/patients/tabs/HistorySession.module.css';

export default function HistorySessions() {
    const [sessionsData, setSessionsData] = useState([]);
    const [patientStatus, setPatientStatus] = useState('');
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');

                if (!token) throw new Error('No hay token de autenticación');
                if (!id) throw new Error('ID del paciente no encontrado');

                const [historyResponse, patientResponse] = await Promise.all([
                    axios.get(`${URL_API}session/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    axios.get(`${URL_API}patients/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);
                
                if (historyResponse.data.success && patientResponse.data.success) {
                    let sessionData = historyResponse.data.data;
                    if (!Array.isArray(sessionData)) { 
                        sessionData = [sessionData];
                    }
                    setSessionsData(sessionData);
                    setPatientStatus(patientResponse.data.data.estado);
                }

            } catch (err) {
                console.error('Error:', err);
                setError(`Error: ${err.response?.data?.message || err.message}`);
            } finally {
                setLoading(false);
            }
        }
        if (id) obtenerData();
    }, [id]);

    if (loading) return <div className=''>Cargando datos...</div>;
    if (error) return <div className='error-message'>Error: {error}</div>;
    if (!sessionsData || sessionsData.length === 0) return <div>No se encontraron datos de la última sesión.</div>;
    
    const estadoNormalizado = patientStatus
        ? patientStatus.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : 'default';

    return (
        <div className={`${styles.historysessions_container}`}>
            <div className='flex'>
                <TabTitle titulo='Historial de sesiones' />
                <BorderColorTwoToneIcon className='text-[#424884]'/>
            </div>
            <div className={`${styles.sessions_container} ${styles[`sessions_container--${estadoNormalizado}`]}`}>
                {sessionsData.map((session, index) => (
                    <div 
                        key={session.id || index }
                        className={`${styles.sessions} `}>
                        <div className={`${styles.sessions_observation}`}>
                            <p>Observaciones: <span>{session.observaciones || '-'}</span> </p>
                        </div>
                        <div className={`${styles.sessions_date}`}>
                            <p>Fecha: <span>{session.fecha || '-'}</span> </p>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}