import { useEffect, useState } from 'react';
import UserList from '../ui/UserList.jsx';
import axios from 'axios';

export default function RecentlyCreatedPatients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerRecienCreados = async () => {
            try {
                setLoading(true);
                setError(null);
                const URL_API = 'https://cognicare-backend.vercel.app/api/';

                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}patients/recently`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                let pacientesData = [];
                if (response.data?.data && Array.isArray(response.data.data)) {
                    pacientesData = response.data.data;
                } else if (Array.isArray(response.data)) {
                    pacientesData = response.data;
                } else if (response.data?.success) {
                    console.log(response.data.message);
                } else {
                    throw new Error('Formato de respuesta no reconocido');
                }

                setPatients(pacientesData);
                
                if (pacientesData.length === 0) {
                    setError('No se encontraron pacientes recientes');
                }

            } catch (err) {
                console.error('Error al cargar pacientes:', err);
                const errorMessage = err.response?.data?.message || 
                    err.message || 'Error al cargar pacientes';
                
                setError(errorMessage);
                setPatients([]);
            } finally {
                setLoading(false);
            }
        };
        obtenerRecienCreados();
    }, []);

    return (
        <div className='h-[300px] relative top-[80px] sm:top-[80px] md:top-[20px] lg:top-[50px]'>
            <UserList 
                title="Últimos pacientes creados"
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