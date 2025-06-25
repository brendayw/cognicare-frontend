import { useParams } from 'react-router-dom';
import useAssessmentsData from '../../hooks/useAssessmentsData.jsx';
import Menu from '../../components/ui/Menu.jsx';
import AssessmentsList from '../../components/assessments/AssessmentsList.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone'

export default function Assessments() {
    const { id } = useParams();
    const { assessments, error, loading, handleAssessmentDeleted } = useAssessmentsData(id);

    return (
        <div className='h-screen'>
            <Menu />
            <div className='h-screen'>
                {loading ? (
                    <div className=''>Cargando pacientes...</div>
                ) : error ? (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </div>
                ) : (
                    <AssessmentsList assessments={assessments} error={error} onAssessmentDeleted={handleAssessmentDeleted}/>
                )}
            </div>
        </div>
    );
}