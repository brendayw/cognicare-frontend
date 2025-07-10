import { useParams } from 'react-router-dom';
import { Menu, AssessmentsList } from '../../../components/index.jsx';
import { useAssessmentsData } from '../../../hooks/index.jsx';
import { SkeletonListItem } from '../../../skeletons/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone'

export default function Assessments() {
    const { id } = useParams();
    const { assessments, error, loading, handleAssessmentDeleted } = useAssessmentsData(id);

    return (
        <div className='h-[100%]'>
            <Menu />
            <div className='relative top-0 [@media_(max-width:_639px)]:top-[-100px] sm:top-[-100px] md:top-0'>
                
                {loading ? (
                    <>
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                        <SkeletonListItem />
                    </>
                ) : error ? (
                    <div className='relative top-0 [@media_(max-width:_639px)]:top-[100px] sm:top-[100px] md:top-0 bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] text-sm m-4 p-4'>
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