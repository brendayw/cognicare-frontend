import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePatientStatusData = () => {
    const [statusData, setStatusData] = useState({
        diagnosisCount: 0,
        treatmentCount: 0,
        dischargedCount: 0,
        loading: true,
        error: ''
    });

    useEffect(() => {
        const fetchPatientsByStatus = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const [diagnosisRes, treatmentRes, dischargedRes] = await Promise.all([
                    axios.get(`${URL_API}api/patients/diagnosis`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }).catch(() => ({ data: { success: false, data: [] } })),
                    axios.get(`${URL_API}api/patients/treatment`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }).catch(() => ({ data: { success: false, data: [] } })),
                    axios.get(`${URL_API}api/patients/discharged`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }).catch(() => ({ data: { success: false, data: [] } }))
                ]);

                setStatusData({
                    diagnosisCount: diagnosisRes.data.success ? diagnosisRes.data.data.length : 0,
                    treatmentCount: treatmentRes.data.success ? treatmentRes.data.data.length : 0,
                    dischargedCount: dischargedRes.data.success ? dischargedRes.data.data.length : 0,
                    loading: false,
                    error: ''
                });
            } catch (error) {
                setStatusData(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Error al cargar datos: ' + error.message
                }));
            }
        };

        fetchPatientsByStatus();
    }, []);

    return statusData;
};