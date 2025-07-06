import { useState, useEffect } from 'react';
import axios from 'axios';

const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');
        
            const response = await axios.get(`${URL_API}api/patients`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data?.success) {
                setPatients(response.data.data?.rows || 
                    response.data.data || []);

            } else {
                setError('No se encontraron pacientes');
            }

        } catch (err) {
            setError(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    fetchPatients();
    }, []);

    return { patients, loading, error};
}

export default usePatients;
