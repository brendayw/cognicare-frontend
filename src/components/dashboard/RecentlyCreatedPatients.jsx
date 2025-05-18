import React, { useEffect, useState } from 'react';
import UserList from '../UserList.jsx';
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
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');
                
                if (!token) {
                    throw new Error('Error al cargar datos: No hay token de autenticación');
                }

                const response = await axios.get(`${URL_API}api/patients/recently`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Respuesta completa del recently:', response);


                let pacientesData = [];
                if (response.data) {

                    if (response.data.data && Array.isArray(response.data.data)) {
                        pacientesData = response.data.data;

                    } else if (response.data.rows && Array.isArray(response.data.rows)) {
                        pacientesData = response.data.rows;

                    } else if (Array.isArray(response.data)) {
                        pacientesData = response.data;
                    } else {
                        console.warn('Estructura de respuesta inesperada, intentando extraer pacientes:', response.data);
                        const possibleArrays = Object.values(response.data).filter(Array.isArray);
                        if (possibleArrays.length === 1) {
                            pacientesData = possibleArrays[0];
                        } else {
                            throw new Error(`Formato de respuesta no reconocido: ${JSON.stringify(response.data)}`);
                        }
                        //throw new Error(`Formato de respuesta no reconocido: ${JSON.stringify(response.data)}`);
                    }
                }

                setPatients(pacientesData || []);

                if (!pacientesData || pacientesData.length === 0) {
                    setError('No se encontraron pacientes creados recientemente')
                }
                // } else {
                //     throw new Error('La respuesta no contiene datos');
                // }

                // if (pacientesData.length > 0) {
                //     setPatients(pacientesData);
                // } else {
                //     setPatients([]);
                //     setError('No se encontraron pacientes recientes');
                // }

            } catch (err) {
                let errorMessage = 'Error al cargar pacientes';
                
                if (err.response) {
                    // Error de respuesta HTTP (4xx, 5xx)
                    errorMessage = err.response.data?.message || 
                                 `Error ${err.response.status}: ${err.response.statusText}`;
                } else if (err.request) {
                    // La solicitud fue hecha pero no hubo respuesta
                    errorMessage = 'No se recibió respuesta del servidor';
                } else {
                    // Error al configurar la solicitud
                    errorMessage = err.message || 'Error desconocido';
                }
                
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
        obtenerRecienCreados();
    }, []);

    return (
        <UserList 
            title="Últimos pacientes creados"
            users={patients}
            loading={loading}
            error={error}
            emptyMessage="No hay pacientes recientes"
            primaryText="nombre_completo"
            secondaryText="motivo_inicial"
        />
    );
}