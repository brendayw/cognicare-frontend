import { useParams, Link } from 'react-router-dom';
import { TabTitle } from '../../../index.jsx';
import { useAssessmentsData, usePatientData } from '../../../../hooks/index.jsx';
import { SkeletonAssessments } from '../../../../skeletons/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import styles from '../../../../styles/patients/tabs/AssessmentResume.module.css';

export default function AssessmentResume() {
    const { id } = useParams();
    const { assessments, error, loading } = useAssessmentsData(id);
    const { patient } = usePatientData(id);

    if (loading) {
        return (
            <div className='p-2'>
                <TabTitle titulo='Evaluaciones' />
                <SkeletonAssessments />
            </div>
        );
    }

    const estadoNormalizado = patient && patient.estado
        ? patient.estado.toLowerCase().replace(/\s+/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
        : 'default';

    return (
        <div className={`${styles.assessments_resume}`}>
            <div className={`${styles.assessments_header} `}>
                <TabTitle titulo='Evaluaciones' />
                <Link to='assessments'>
                    <BorderColorTwoToneIcon className='text-[#424884] cursor-pointer hover:text-[#00a396]' />
                </Link>
            </div>
            
            {error ? (
                <p className='bg-[#f6e9e6] w-[625px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2' />
                    {error}
                </p>
            ) : assessments.length > 0 ? (
                <div className={`${styles.assessment} `}>
                    {assessments.slice(0, 2).map((assessment, index) => (
                        <div
                            key={assessment.id || index}
                            className={`${styles.assessment_details} ${styles[`assessment_details--${estadoNormalizado}`]}`}
                        >
                            <span>{assessment.nombre_evaluacion || '-'}</span>
                            <span>{assessment.tipo_evaluacion || '-'}</span>
                            <p>Resultados: <span>{assessment.resultado || '-'}</span></p>
                            <p>Fecha: <span>{assessment.fecha_evaluacion || '-'}</span></p>
                            <p>Observaciones: <span>{assessment.observaciones || '-'}</span></p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full'>     
                    <p className='w-[98%] bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2' />
                        No se encontraron evaluaciones asociadas al paciente para mostrar.
                    </p>
                </div>
            )}
        </div>
    );
}
