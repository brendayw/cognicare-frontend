import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Menu, PatientProfileHeader, PatientName, PatientData, 
    PatientProgress, CustomTabs } from '../../components/index.jsx';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function PatientProfile() {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const obtenerPaciente = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/'
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}patients/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data?.success) {
                    setPatient(response.data.data);
                    setError('');
                }

            } catch (err) {
                setError(err.message);
            }
        };
        obtenerPaciente();
    }, [id]);

    const handlePatientDeleted = (deletedPatientId) => {
        console.log(`Paciente ${deletedPatientId} eliminado correctamente`);
    };

    return (
        <div className='flex flex-col min-h-screen lg:flew-row w-full'>
            <Menu />
            <div className='w-full relative top-0 md:top-2'>
                <PatientProfileHeader patient={patient} onPatientDeleted={handlePatientDeleted} />
                
                { error ? (
                    <div className='w-full'>
                        <p className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                            <ErrorOutlineTwoToneIcon className='mr-2'/>
                            {error}
                        </p>
                    </div>
                ) : (
                    
                    <div className='flex flex-col lg:flex-row'>
                        <div className='w-full lg:w-[40%]'>
                            <PatientName patient={patient} />
                            <PatientData  patient={patient} />
                            <PatientProgress patient={patient} />
                        </div>
                        <div className='w-full lg:w-[60%]'>
                            <CustomTabs patient={patient} />
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
}