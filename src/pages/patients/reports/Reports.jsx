import { useParams } from 'react-router-dom';
import { Menu, ReportsList } from '../../../components/index.jsx'
import { useReportsData } from '../../../hooks/index.jsx';
import { SkeletonListItem } from '../../../skeletons/index.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Reports() {
    const { id } = useParams();
    const { reports, error, loading, handleReportDeleted } = useReportsData(id);

    return (
        <div className='min-h-screen'>
            <Menu/>
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
                    <ReportsList reports={reports} error={error} onReportDeleted={handleReportDeleted}/>
                )}
            </div>
        </div>
    );
}