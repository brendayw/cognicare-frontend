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
    console.log('id del paciente', id);

    useEffect(() => {
        const obtenerPaciente = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/'
                const token = localStorage.getItem('token');
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
                console.error('Error fetching patient:', err);
            }
            // } finally {
            //     setLoading(false);
            // }
        };
        obtenerPaciente();
    }, [id]);

    const handlePatientDeleted = (deletedPatientId) => {
        // Opcional: mostrar mensaje de éxito
        console.log(`Paciente ${deletedPatientId} eliminado correctamente`);
    };

    //loading o skeleton
    //error

    return (
        <div className='flex w-full'>
            <Menu />
            <div className='w-full'>
                <PatientProfileHeader patient={patient} onPatientDeleted={handlePatientDeleted} />
                <div className='flex'>
                    <div className='w-[40%]'>
                        <PatientName patient={patient} />
                        <PatientData  patient={patient} />
                        <PatientProgress patient={patient} />
                    </div>
                    <div className='w-[60%]'>
                        <CustomTabs patient={patient} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}