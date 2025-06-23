import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../components/ui/Menu.jsx';
import PatientProfileHeader from '../../components/patients/profile/PatientProfileHeader.jsx';
import PatientName from '../../components/patients/profile/PatientName.jsx';
import PatientData from '../../components/patients/profile/PatientData.jsx';
import PatientProgress from '../../components/patients/profile/PatientProgress.jsx';
import CustomTabs from '../../components/ui/CustomTabs.jsx';
import axios from 'axios';

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
            // } finally {
            //     setLoading(false);
            // }
        };
        obtenerPaciente();
    }, [id]);

    const handlePatientDeleted = (deletedPatientId) => {
        console.log(`Paciente ${deletedPatientId} eliminado correctamente`);
    };

    //loading o skeleton
    //error

    return (
        <div className='flex flex-col lg:flew-row w-full'>
            <Menu />
            <div className='w-full relative top-24 md:top-2'>
                <PatientProfileHeader patient={patient} onPatientDeleted={handlePatientDeleted} />
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
            </div>
            
        </div>
    );
}