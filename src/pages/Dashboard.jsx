import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientsCategories from '../components/dashboard/PatientsCategories';
import ProfileCard from '../components/dashboard/ProfileCard';
import PatientsChart from '../components/dashboard/PatientsChart';
import Calendar from '../components/dashboard/Calendar.jsx';
import RecentlyCreatedPatients from '../components/dashboard/RecentlyCreatedPatients.jsx';
import AddButtons from '../components/dashboard/AddButtons.jsx';

export default function Dashboard() {
    const [perfil, setPerfil] = useState(null); // Estado para almacenar el perfil
    const [error, setError] = useState('');
    
    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/profesional', 
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                if (response.data.success) {
                    setPerfil(response.data.data);
                } else {
                    setError('No se pudo obtener el perfil.');
                }

            } catch (err) {
                console.error('Error:', err.response?.data || err.message);
                setError('No se pudo obtener el perfil del profesional.'); // Manejo de errores
            } 
        };

        obtenerPerfil();
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <div className="flex w-full">
            <div className="w-3/4">
                {/* Solo pasa el perfil a ProfileCard si se obtiene correctamente */}
                {perfil ? (
                    <ProfileCard profesional = {perfil} />
                ) : (
                    <p>No se encontró el perfil del profesional.</p>
                )}
                <PatientsCategories />
                <div className="flex space-x-2 w-full">
                    <div className="flex-1">
                        <PatientsChart />
                    </div>
                    <div className="flex-1">
                        <Calendar />
                    </div>
                </div>
            </div>
            <div className="w-1/4 p-2">
                <AddButtons />
                <RecentlyCreatedPatients />
            </div>
        </div>
    );
}