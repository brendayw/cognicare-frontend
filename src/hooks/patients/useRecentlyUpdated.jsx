import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRecentlyUpdated = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRecentlyCreated, setShowRecentlyCreated] = useState(false);

    useEffect(() => {
        const fetchRecentlyUpdatedPatients = async () => {
            setLoading(true);
            setError(null);

            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}patients/updated`, {
                    headers: { 'Authorization': `Bearer ${token}` }
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

                if (pacientesData.length > 0) {
                    setPatients(pacientesData);
                } else {
                    setShowRecentlyCreated(true);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || 
                    err.message || 'Error al cargar pacientes';
                setError(errorMessage);
                setPatients([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentlyUpdatedPatients();
    }, []);

    return { patients, loading, error, showRecentlyCreated };
};