import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../../styles/patients/tabs/LastSessionTab.module.css';

export default function LastSessionTab() {
    const [lastSession, setLastSession] = useState(null);
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

                const response = await axios.get(`${URL_API}session/${id}/last`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    let sessionData = response.data.data;

                    if (!sessionData || (Array.isArray(sessionData) && sessionData.length === 0)) {
                        throw new Error('NO_SESSION');
                    }

                    setLastSession(Array.isArray(sessionData) ? sessionData[0] : sessionData);
                }

            } catch (err) {
                if (err.message === 'NO_SESSION') {
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

    return (
        <div className='flex flex-col items-center justify-center'>
            {error ? (
                <p className='flex items-center bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>
            ) : lastSession ? (
                <div className={styles.lastsession_container}>
                    <div className={styles.session_datetime}>
                        <p>Día: <span>{lastSession.fecha || '-'}</span></p>
                        <p>Hora: <span>{lastSession.hora || '-'}</span></p>
                        <p>Duración: <span>{lastSession.duracion || '-'}</span></p>
                    </div>
                    <div className={styles.session_details}>
                        <p>Estado: <span>{lastSession.estado || '-'}</span></p>
                        <p>Tipo: <span>{lastSession.tipo_sesion || '-'}</span></p>
                        <p>Observaciones: <span>{lastSession.observaciones || '-'}</span></p>
                    </div>
                </div>
            ) : (
                <p className='flex items-center bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    No se encontraró sesión para mostrar
                </p>
            )}
        </div>
    );
}