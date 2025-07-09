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

    if (error) {
        return (
            <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                <ErrorOutlineTwoToneIcon className='mr-2'/>
                {error}
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
            {error ? (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>
            ) : reports.length > 0 ? (
                <div className={styles.report}>
                    {reports.slice(0, 4).map((report) => (
                        
                        <div 
                            key={report.id}
                            className={`${styles.report_details} ${styles[`report_details--${estadoNormalizado}`]}`}
                        >
                            <span>{report.descripcion || '-'}</span>
                            <span>{report.tipo_reporte || '-'}</span>
                            <span>{report.fecha_reporte || '-'}</span>
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
                    <p className='w-[98%] bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2' />
                        No se encontraron reportes asociados al paciente para mostrar.
                    </p>
                </div>
            )}
        </div>
    );
}