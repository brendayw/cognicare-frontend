import { useEffect, useState } from 'react';
import axios from 'axios';
import RecentlyCreatedPatients from '../dashboard/RecentlyCreatedPatients.jsx';
import UserList from '../ui/UserList.jsx';

export default function RecentlyUpdatedPatients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showRecentlyCreated, setShowRecentlyCreated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerUltimosActualizados = async () => {
            try {
                setLoading(true);
                setError(null);
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('Error al cargar datos: No hay token de autenticación');
                }

                const response = await axios.get(`${URL_API}api/patients/updated`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Respuesta completa updated:', response);


                let pacientesData = [];
                if (response.data?.data && Array.isArray(response.data.data)) {
                    pacientesData = response.data.data;
                } 
                else if (Array.isArray(response.data)) {
                    pacientesData = response.data;
                }
                else if (response.data?.success) {
                    console.log(response.data.message);
                }
                else {
                    throw new Error('Formato de respuesta no reconocido');
                }

                setPatients(pacientesData);

                if (pacientesData.length > 0) {
                    setPatients(pacientesData);
                } else {
                    //si no hay pacientes actualizados muestra los últimos creados
                    setShowRecentlyCreated(true);
                    
                }

            } catch (err) {
                console.error('Error al cargar pacientes:', err);
                const errorMessage = err.response?.data?.message || err.message || 'Error al cargar pacientes';

                console.error('Detalles del error:', {
                    message: err.message,
                    response: err.response?.data,
                    stack: err.stack
                });

                setError(errorMessage);
                setPatients([]);
                
            } finally {
                setLoading(false);
            }
        }; 
        obtenerUltimosActualizados();
    }, []);

    if (showRecentlyCreated) {
        return <RecentlyCreatedPatients />;
    }

    return (
        <div className='h-[300px] relative top-[115px] sm:top-[115px] md:top-[55px] lg:top-[30px]'>
            <UserList 
                title="Últimos actualizados"
                users={patients}
                loading={loading}
                error={error}
                emptyMessage="No hay pacientes recientes"
                primaryText="nombre_completo"
                secondaryText="motivo_inicial"
            />
        </div>
    );
}