import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
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
                    axios.get(`${URL_API}patients/${id}/sessions`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    axios.get(`${URL_API}patients/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);
                
                if (historyResponse.data.success && patientResponse.data.success) {
                    let sessionData = historyResponse.data.data;
                    if (!sessionData || (Array.isArray(sessionData) && sessionData.length === 0)) {
                        throw new Error('NO_SESSIONS');
                    }
                    if (!Array.isArray(sessionData)) { 
                        sessionData = [sessionData];
                    }
                    setSessionsData(sessionData);
                    setPatientStatus(patientResponse.data.data.estado);
                }

            } catch (err) {
                console.error('Error al cargar datos:', err);
                if (err.message === 'NO_SESSIONS') {
                    setError('No se encontraron sesiones para mostrar asociadas al paciente');
                } else if (err.message === 'Token no encontrado') {
                    setError('Error de autenticación: Token no encontrado');
                } else {
                    setError('Error al cargar datos: ' + (err.message || 'Error desconocido'));
                }
            } finally {
                setLoading(false);
            }
        }
        obtenerData();
    }, [id]);

    if (loading) return <div className=''>Cargando datos...</div>;
    
    const estadoNormalizado = patientStatus
        ? patientStatus.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : 'default';

    return (
        <div className={`${styles.historysessions_container}`}>
            <div className={styles.history_header}>
                <TabTitle titulo='Historial de sesiones' />
                <Link to='sessions'>
                    <BorderColorTwoToneIcon className='text-[#424884] cursor-pointer hover:text-[#00a396]'/>
                </Link>
            </div>
            {error ? (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>
            ) : sessionsData.length > 0 ? (
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
            ) : (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    No se encontraron sesiones para mostrar
                </p>
            )}
        </div>
    );
}