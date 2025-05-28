import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
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
                    if (!Array.isArray(reportData)) {
                        reportData = [reportData];
                    }
                    setReportsData(reportData);
                    setPatientStatus(patientResponse.data.data.estado);
                }               
              

            } catch (err) {
                console.error('Error:', err);
                setError(`Error: ${err.response?.data?.message || err.message}`);
            } finally {
                setLoading(false);
            }
        }
        if (id) obtenerData();
    }, [id]);

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div className='error-message'>Error: {error}</div>;
    if (!reportsData || reportsData.length === 0) return <div>No se encontraron reportes</div>;

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
        </div>
    );
}