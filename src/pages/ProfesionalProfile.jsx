import {useState, useEffect} from 'react';
import axios from 'axios';
import Menu from '../components/Menu.jsx';
import ProfesionalCard from '../components/profesional-profile/ProfesionalCard.jsx';
import Buttons from '../components/profesional-profile/Buttons.jsx';
import Chart from '../components/profesional-profile/Chart.jsx';
import MoreInfo from '../components/profesional-profile/MoreInfo.jsx';
import RecentlyUpdatedPatients from '../components/profesional-profile/RecentlyUpdatedPatients.jsx';

export default function ProfesionalProfile() {
    const [profesional, setProfesional] = useState();
    const [error, setError] = useState('');
    
        useEffect(() => {
            const obtenerProfesional = async () => {
                try {
                    const URL_API = 'https://cognicare-backend.vercel.app/';

                    const token = localStorage.getItem('token');
                    if (!token) throw new Error('Token no encontrado');
    
                    const response = await axios.get(`${URL_API}api/profesional`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
    
                    if (response.data.success) {
                        setProfesional(response.data.data);
                    } else {
                        setError('No se pudo obtener el perfil.');
                    }
                } catch (err) {
                    console.error('Error:', err.response?.data || err.message);
                    setError('No se pudo obtener el perfil del profesional.');
                } 
            };
            obtenerProfesional();
        }, []);

    return (
        <div className='flex w-full'>
            <Menu />
            <div className='flex w-full'>
                <div className='w-3/4'>
                    <ProfesionalCard prof={profesional} />
                    <Buttons />
                    <Chart />
                </div>
                <div className='w-1/4 p-2'>
                    <MoreInfo />
                    <RecentlyUpdatedPatients />
                </div>
            </div>
         </div>
    );
}