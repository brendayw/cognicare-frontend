import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import TabTitle from '../TabTitle';
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
                console.log('ID del paciente obtenido de useParams:', id);

                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');

                if (!token) throw new Error('No hay token de autenticación');
                console.log('Token: ' + token);

                if (!id) throw new Error('ID del paciente no encontrado');

                const [assessmentResponse, patientResponse] = await Promise.all([
                   axios.get(`${URL_API}patients/assessments/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }), 
                    axios.get(`${URL_API}patients/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}`}
                    })
                ]);
                
                if (assessmentResponse.data.success && patientResponse.data.success) {
                    let assessmentData = assessmentResponse.data.data;
                    console.log('Datos de evaluación:', assessmentData); 
                    if (!Array.isArray(assessmentData)) {
                        assessmentData = [assessmentData];
                    }
                    setAssessments(assessmentData);
                    setPatientStatus(patientResponse.data.data.estado);
                }
            } catch (err) {
                console.error('Error:', err);
                setError(`Error: ${err.response?.data?.message || err.message}`);
            } finally {
                setLoading(false);
            }
        }
        obtenerData();
    }, [id]);

    if (loading) return <div className=''>Cargando datos...</div>;
    if (error) return <div className='error-message'>Error: {error}</div>;
    if (!assessments|| assessments.length === 0) return <div>No se encontraron evaluaciones para mostrar</div>;

    const estadoNormalizado = patientStatus
        ? patientStatus.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : 'default';

    return (
        <div className={`${styles.assessments_resume}`}>
            <div className={`${styles.assessments_header} `}>
                <TabTitle titulo='Evaluaciones' />
                <BorderColorTwoToneIcon className='text-[#424884]'/>
            </div>
            <div className={`${styles.assessment} `}>
                {assessments.map((assessment, index) => (
                    <div
                        key={assessment.id || index}
                        className={`${styles.assessment_details} ${styles[`assessment_details--${estadoNormalizado}`]}`}
                    >
                        <span> {assessment.nombre_evaluacion || '-'}</span>
                        <span> {assessment.tipo_evaluacion || '-' }</span>
                        <span> {assessment.resultado || '-'}</span>
                        <span> {assessment.fecha_evaluacion || '-' }</span>
                        <span> {assessment.observaciones || '-'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}