import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProfesionalData = (profesionalId) => {
    const [profesional, setProfesional] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfesionalData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}profesional/${profesionalId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    setProfesional(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil.');
                }

            } catch (error) {
                setError('Error al obtener datos: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProfesionalData();
    }, [profesionalId]);

    const handleProfesionalDeleted = (deletedId) => {
        setProfesional(prev => prev.filter(a => a.id !== deletedId));
    };

    return { profesional, error, loading, handleProfesionalDeleted };
}