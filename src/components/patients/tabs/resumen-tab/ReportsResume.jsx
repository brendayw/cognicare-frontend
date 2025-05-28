import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import TabTitle from '../TabTitle';
import styles from '../../../../styles/patients/tabs/ReportsResume.module.css';

export default function ReportsResume() {
    const [reportsData, setReportsData] = useState([]);
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

                const [reportResponse, patientResponse] = await Promise.all([ 
                    axios.get(`${URL_API}report/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }), 
                    axios.get(`${URL_API}patients/${id}`, {
                        headers: { 'Authorization': `Bearer ${token}`}
                    })
                ]);

                if (reportResponse.data.success && patientResponse.data.success) {
                    let reportData = reportResponse.data.data;
                    
                    if (!reportData || (Array.isArray(reportData) && reportData.length === 0)) {
                        throw new Error('NO_REPORTS');
                    }
                    if (!Array.isArray(reportData)) {
                        reportData = [reportData];
                    }
                    setReportsData(reportData);
                    setPatientStatus(patientResponse.data.data.estado);
                }               
              

            } catch (err) {
                console.error('Error al cargar datos:', err);
                if (err.message === 'NO_REPORTS') {
                    setError('No se encontraron reportes para mostrar asociados al paciente');
                } else if (err.message === 'Token no encontrado') {
                    setError('Error de autenticación: Token no encontrado');
                } else {
                    setError('Error al cargar datos: ' + (err.message || 'Error desconocido'));
                }
            } finally {
                setLoading(false);
            }
        }
        if (id) obtenerData();
    }, [id]);

    if (loading) return <div>Cargando datos...</div>;
    //if (error) return <div className='error-message'>Error: {error}</div>;
    //if (!reportsData || reportsData.length === 0) return <div>No se encontraron reportes</div>;

    const estadoNormalizado = patientStatus
        ? patientStatus.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : 'default';

    const reportRoute = reportsData.archivo;
    const url = `${window.location.origin}/${reportRoute}`;
    return (
        <div className={styles.reports_resume}>
            <div className={styles.reports_header}>
                <TabTitle titulo='Reportes' />
                <BorderColorTwoToneIcon className='text-[#424884]'/>
            </div>
            {error ? (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>
            ) : reportsData.length > 0 ? (
                <div className={styles.report}>
                    {reportsData.map((report, index) => (
                        
                        <div 
                            key={report.id || index}
                            className={`${styles.report_details} ${styles[`report_details--${estadoNormalizado}`]}`}
                        >
                            <span>{report.descripcion || '-'}</span>
                            <span>{report.tipo_reporte || '-'}</span>
                            <span>{report.fecha_reporte || '-'}</span>
                            <span>
                                <a 
                                    className="link-reporte" 
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Ver reporte
                                </a>
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    No se encontraron reportes para mostrar
                </p>
            )}
        </div>
    );
}