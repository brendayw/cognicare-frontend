import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../styles/patients/profile/PatientProgress.module.css';

export default function PatientProgress({patient}) {
    const [perfilDetallado, setPerfilDetallado] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    
    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                if (!id) throw new Error('Id del paciente no reconocido');
        
                const response = await axios.get(`${URL_API}patients/${id}`, {
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
    if (!patient) {
        return (
            <div className="p-4 border rounded-lg m-2">
                <h3 className="text-lg font-medium mb-3">Progreso del Paciente</h3>
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-2 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    return (
       <div className={`${styles.sessions}`}>
            <div className={`${styles.sessions_held}`}>
                <p>Sesiones Realizadas
                    <span>{perfilDetallado.sesiones_realizadas} </span>
                </p>
            </div>
            <div className={`${styles.sessions_total}`}>
                <p>Sesiones Totales
                    <span>{perfilDetallado.sesiones_totales} </span>
                </p>
            </div>
       </div>
    );
}