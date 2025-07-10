import { useParams, Link } from 'react-router-dom';
import { TabTitle } from '../../../index.jsx';
import { useReportsData, usePatientData } from '../../../../hooks/index.jsx';
import { SkeletonReports } from '../../../../skeletons/index.jsx';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../../styles/patients/tabs/ReportsResume.module.css';

export default function ReportsResume() {
    const { id } = useParams();
    const { reports, error, loading } = useReportsData(id);
    const { patient } = usePatientData(id);

    if (loading) {
        return (
            <div className='p-2'>
                <TabTitle titulo='Reportes' />
                <SkeletonReports />
            </div> 
        );
    }

    const estadoNormalizado = patient && patient.estado
        ? patient.estado.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        : 'default';

    return (
        <div className={styles.reports_resume}>
            <div className={styles.reports_header}>
                <TabTitle titulo='Reportes' />
                <Link to='reports'>
                    <BorderColorTwoToneIcon className='text-[#424884] cursor-pointer hover:text-[#00a396]'/>
                </Link>
            </div>
            {reports.length > 0 ? (
                <div className={styles.report}>
                    {reports.slice(0, 4).map((report) => (
                        
                        <div 
                            key={report.id}
                            className={`${styles.report_details} ${styles[`report_details--${estadoNormalizado}`]}`}
                        >
                            <span>{report.descripcion || 'No disponible'}</span>
                            <span>{report.tipoReporte || 'No disponible'}</span>
                            <span>{report.fechaReporte || 'No disponible'}</span>
                            <span>
                                <Link
                                    to={report.archivo}
                                    className='text-[#424884] hover:text-[#00a396] block text-right'
                                    rel="noopener noreferrer"
                                >
                                    Ver reporte
                                </Link>
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full'>     
                    <p className='bg-[#f6e9e6] w-[98%] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}