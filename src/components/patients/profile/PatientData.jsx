import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../styles/patients/profile/PatientData.module.css';

export default function PatientData() {
    const [perfilDetallado, setPerfilDetallado] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    
    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                if (!id) throw new Error('Id del paciente no reconocido');
        
                const response = await axios.get(`${URL_API}api/patients/${id}`, 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
        
                if (response.data.success) {
                    setPerfilDetallado(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil del profesional.');
                }
        
            } catch (err) {
                console.error('Error:', err.response?.data || err.message);
                setError('Error al cargar datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        obtenerPerfil();
    }, [id]);
    
    if (loading) return <div className={styles.loading}>Cargando...</div>;

    return (
        //patient_datacard
        <div className={`${styles.patient_datacard}`}>
            <div className={`${styles.id_card}`}>
                <p>ID: {perfilDetallado.id}</p>
                <p>Estado: {perfilDetallado.estado || 'No disponible' }</p>
            </div>
            <div className={`${styles.card_details}`}>
                <p>Genero: {perfilDetallado.genero}</p>
                <p>Fecha de nacimiento: {perfilDetallado.fecha_nacimiento}</p>
                <p>Fecha de inicio: {perfilDetallado.fecha_inicio}</p>
                <p>Dirección: {perfilDetallado.direccion}</p>
                <p>Email: {perfilDetallado.email}</p>
                <p>Teléfono: {perfilDetallado.telefono}</p>
            </div>
        </div>
    );
}