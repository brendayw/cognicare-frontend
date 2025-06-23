import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../styles/patients/profile/PatientData.module.css';

export default function PatientData({patient}) {
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
                
                setError('Error al cargar datos: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        obtenerPerfil();
    }, [id]);
    
    if (loading) return <div className={styles.loading}>Cargando...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    if (!patient) {
        return (
            <div className="p-4 border rounded-lg m-2">
                <h3 className="text-lg font-medium mb-3">Datos del Paciente</h3>
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
            </div>
        );
    }
    

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