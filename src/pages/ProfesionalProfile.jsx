import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/ui/Menu.jsx';
import ProfesionalCard from '../components/profesional/ProfesionalCard.jsx';
import Buttons from '../components/profesional/Buttons.jsx';
import Chart from '../components/profesional/Chart.jsx';
import MoreInfo from '../components/profesional/MoreInfo.jsx';
import RecentlyUpdatedPatients from '../components/profesional/RecentlyUpdatedPatients.jsx';

export default function ProfesionalProfile() {
    const [profesional, setProfesional] = useState();
    const { id } = useParams();
    const [error, setError] = useState('');
    
        useEffect(() => {
            const obtenerProfesional = async () => {
                try {
                    const URL_API = 'https://cognicare-backend.vercel.app/api/';
                    const token = localStorage.getItem('token');

                    if (!token) throw new Error('No hay token de autenticación');
    
                    const response = await axios.get(`${URL_API}profesional/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                        
                    if (response.data.success) {
                        setProfesional(response.data.data);
                    } else {
                        setError('No se pudo obtener el perfil.');
                    }
                } catch (err) {
                    console.error('Error:', err.response?.data || err.message);
                    setError('Error al obtener datos: ' + err.message);
                } 
            };
            obtenerProfesional();
        }, [id]);

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