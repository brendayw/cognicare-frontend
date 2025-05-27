import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import styles from '../../../../styles/patients/tabs/LastSessionTab.module.css';

export default function LastSessionTab() {
    const [lastSessionData, setLastSessionData] = useState(null);
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                console.log('ID del paciente obtenido de useParams:', id);

                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                console.log('Token: ' + token);

                if (!token) throw new Error('No hay token de autenticación');

                // AGREGADO: Validar que el ID existe
                if (!id) throw new Error('ID del paciente no encontrado');

                const response = await axios.get(`${URL_API}session/${id}/last`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                console.log('Respuesta completa last session:', response.data); // Para debug

                if (response.data.success) {
                    // CORREGIDO: Manejar si data es un array o un objeto
                    const sessionData = Array.isArray(response.data.data) 
                        ? response.data.data[0] 
                        : response.data.data;
                    
                    setLastSessionData(sessionData);
                    console.log('Datos de sesión establecidos:', sessionData);
                } else {
                    setError(response.data.message || 'No se pudo obtener los datos de la sesión.');
                }

            } catch (err) {
                console.error('Error completo:', err);
                
                // MEJORADO: Manejo más específico de errores
                if (err.response) {
                    // Error de respuesta del servidor
                    setError(`Error del servidor: ${err.response.data.message || err.response.statusText}`);
                } else if (err.request) {
                    // Error de red
                    setError('Error de conexión. Verifica tu conexión a internet.');
                } else {
                    // Otros errores
                    setError('Error al obtener datos: ' + err.message);
                }
            } finally {
                setLoading(false);
            }
        }
        
        // Solo ejecutar si hay ID
        if (id) {
            obtenerData();
        } else {
            setError('ID del paciente no proporcionado');
            setLoading(false);
        }
    }, [id]);

    if (loading) return <div className=''>Cargando datos...</div>;
    if (error) return <div className='error-message'>Error: {error}</div>;
    if (!lastSessionData) {
        return <div>No se encontraron datos de la última sesión.</div>;
    }

    return (
        <div className={`${styles.lastsession_container}`}>
            <div className={`${styles.session_datetime}`}>
                <p>Dia: <span> {lastSessionData.fecha} </span></p>
                <p>Hora: <span> {lastSessionData.hora} </span></p>
                <p>Duración: <span> {lastSessionData.duracion} </span></p>
            </div>
            <div className={`${styles.session_details}`}>
                <p>Estado: <span> {lastSessionData.estado} </span></p>
                <p>Tipo de sesión: <span> {lastSessionData.tipo_sesion} </span></p>
                <p>Observaciones: <span> {lastSessionData.observaciones} </span></p>
            </div>
        </div>
    );
}