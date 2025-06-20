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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
        const obtenerProfesional = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');

                if (!token) throw new Error('No hay token de autenticación');
    
                const response = await axios.get(`${URL_API}profesional/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                        
                if (token) {
                    const payloadBase64 = token.split('.')[1];
                    const payload = JSON.parse(atob(payloadBase64));
                    console.log('Payload del token:', payload);
                }
                
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
        <div className='flex flex-col min-h-screen w-full'>
            <Menu />
            <div className='flex flex-col lg:flex-row flex-1 w-full'>
                <div className='w-full lg:w-3/4 p-2 lg:p-4 space-y-2'>
                    <ProfesionalCard prof={profesional} />
                    <Buttons />
                    <Chart />
                </div>
                {/* <div className='w-full lg:w-1/4 p-2 lg:p-4 space-y-2'>
                    <MoreInfo />
                    <RecentlyUpdatedPatients />
                </div> */}
            </div>
         </div>
    );
}