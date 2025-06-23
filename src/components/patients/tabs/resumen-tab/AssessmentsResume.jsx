import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import TabTitle from '../TabTitle.jsx';
import styles from '../../../../styles/patients/tabs/AssessmentResume.module.css';

export default function AssessmentResume() {
    const [assessments, setAssessments] = useState([]);
    const [patientStatus, setPatientStatus] = useState('');
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                if (!id) throw new Error('ID del paciente no encontrado');

                const [assessmentResponse, patientResponse] = await Promise.all([
                   axios.get(`${URL_API}patients/${id}/assessments`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }), 
                    axios.get(`${URL_API}patients/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}`}
                    })
                ]);
                
                if (assessmentResponse.data.success && patientResponse.data.success) {
                    let assessmentData = assessmentResponse.data.data;

                    if (!assessmentData || (Array.isArray(assessmentData) && assessmentData.length === 0)) {
                        throw new Error('NO_EVALUATIONS');
                    }
                    if (!Array.isArray(assessmentData)) {
                        assessmentData = [assessmentData];
                    }
                    setAssessments(assessmentData);
                    setPatientStatus(patientResponse.data.data.estado);
                }
            } catch (err) {
                if (err.message === 'NO_EVALUATIONS') {
                    setError('No se encontraron evaluaciones para mostrar asociadas al paciente');
                } else if (err.message === 'Token no encontrado') {
                    setError('Error de autenticación: Token no encontrado');
                } else {
                    setError('Error al cargar datos: ' + (err.message || 'Error desconocido'));
                }
            } finally {
                setLoading(false);
            }
        }
        obtenerData();
    }, [id]);

    if (loading) return <div className=''>Cargando datos...</div>;

    const estadoNormalizado = patientStatus
        ? patientStatus.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : 'default';

    return (
        <div className={`${styles.assessments_resume}`}>
            <div className={`${styles.assessments_header} `}>
                <TabTitle titulo='Evaluaciones' />
                <Link to='assessments'>
                    <BorderColorTwoToneIcon className='text-[#424884] cursor-pointer hover:text-[#00a396]'/>
                </Link>
            </div>
            
            {error ? (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>
            ) : assessments.length > 0 ? (
                <div className={`${styles.assessment} `}>
                    {assessments.slice(0,2).map((assessment, index) => (
                        <div
                            key={assessment.id || index}
                            className={`${styles.assessment_details} ${styles[`assessment_details--${estadoNormalizado}`]}`}
                        >
                            <span> {assessment.nombre_evaluacion || '-'}</span>
                            <span> {assessment.tipo_evaluacion || '-' }</span>
                            
                            <p>Resultados: <span> {assessment.resultado || '-'}</span></p>
                            <p>Fecha: <span> {assessment.fecha_evaluacion || '-' }</span></p>
                            <p>Observaciones: <span> {assessment.observaciones || '-'}</span></p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    No se encontraron evaluaciones para mostrar
                </p>
            )}
        </div>
    );
}