import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfessionalData = (professionalId) => {
    const [professional, setProfessional] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfessionalData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}profesional/${professionalId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    setProfessional(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil.');
                }

            } catch (error) {
                setError('Error al obtener datos: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProfessionalData();
    }, [professionalId]);

    const handleProfessionalDeleted = (deletedId) => {
        setProfessional(prev => prev.filter(a => a.id !== deletedId));
    };

    return { professional, error, loading, handleProfessionalDeleted };
}

export default useProfessionalData;