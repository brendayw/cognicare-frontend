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
            
            {assessments.length > 0 ? (
                <div className={`${styles.assessment} `}>
                    {assessments.slice(0, 2).map((assessment, index) => (
                        <div
                            key={assessment.id || index}
                            className={`${styles.assessment_details} ${styles[`assessment_details--${estadoNormalizado}`]}`}
                        >
                            <span>{assessment.nombreEvaluacion || 'No disponible'}</span>
                            <span>{assessment.tipoEvaluacion || 'No disponible'}</span>
                            <p>Resultados: <span>{assessment.resultado || 'No disponible'}</span></p>
                            <p>Fecha: <span>{assessment.fechaEvaluacion || 'No disponible'}</span></p>
                            <p>Observaciones: <span>{assessment.observaciones || 'No disponible'}</span></p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='w-full'>     
                    <p className='bg-[#f6e9e6] w-[98%] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2' />
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}
