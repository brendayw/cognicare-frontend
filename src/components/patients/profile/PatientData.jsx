import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../styles/patients/profile/PatientData.module.css';

export default function PatientData( {estado}) {
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
    if (error) return <div className={styles.error}>{error}</div>;

    const normalizeEstado = (estado) => {
        if (!estado) return 'tratamiento'; // Valor por defecto
        return estado.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina acentos
    };

    const estadoNormalizado = normalizeEstado(perfilDetallado?.estado);

    return (
        //patient_datacard
        <div className={`${styles.patient_datacard}`}>
            <div className={`${styles.id_card} ${styles[`id_card--${estadoNormalizado}`]}`}>
                <p>ID: {perfilDetallado.id}</p>
                <p>Estado: {perfilDetallado.estado || 'No disponible' }</p>
            </div>
            <div className={`${styles.card_details} ${styles[`card_details--${estadoNormalizado}`]}`}>
                <p>Genero: <span> {perfilDetallado.genero}</span></p>
                <p>Fecha de nacimiento: <span>{perfilDetallado.fecha_nacimiento}</span></p>
                <p>Fecha de inicio: <span>{perfilDetallado.fecha_inicio}</span></p>
                <p>Dirección: <span>{perfilDetallado.direccion}</span></p>
                <p>Email: <span>{perfilDetallado.email}</span></p>
                <p>Teléfono: <span>{perfilDetallado.telefono}</span></p>
            </div>
        </div>
    );
}