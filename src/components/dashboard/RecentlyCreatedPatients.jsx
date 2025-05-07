import React, { useEffect, useState } from 'react';
import UserList from '../UserList.jsx';
import axios from 'axios';

export default function RecentlyCreatedPatients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerUltimosActualizados = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem('token');
                
                if (!token) {
                    throw new Error('No se encontró el token de autenticación');
                }

                const response = await axios.get('http://localhost:5000/api/patients/recently', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                console.log('Respuesta completa:', response);

                // Manejo flexible de diferentes formatos de respuesta
                let pacientesData = [];
                
                if (response.data) {
                    // Caso 1: Respuesta con estructura { success: true, rows: [...] }
                    if (response.data.success && Array.isArray(response.data.rows)) {
                        pacientesData = response.data.rows;
                    } 
                    // Caso 2: Respuesta con array directo
                    else if (Array.isArray(response.data)) {
                        pacientesData = response.data;
                    }
                    // Caso 3: Respuesta con estructura alternativa
                    else if (response.data.data && Array.isArray(response.data.data)) {
                        pacientesData = response.data.data;
                    }
                    else {
                        throw new Error(`Formato de respuesta no reconocido: ${JSON.stringify(response.data)}`);
                    }
                } else {
                    throw new Error('La respuesta no contiene datos');
                }

                if (pacientesData.length > 0) {
                    setPatients(pacientesData);
                } else {
                    setPatients([]);
                    setError('No se encontraron pacientes recientes');
                }

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
        
        obtenerUltimosActualizados();
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