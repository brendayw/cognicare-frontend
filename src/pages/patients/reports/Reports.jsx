import { useParams } from 'react-router-dom';
import useReportsData from '../../../hooks/reports/useReportsData.jsx';
import Menu from '../../../components/ui/Menu.jsx';
import ReportsList from '../../../components/reports/ReportsList.jsx';
import SkeletonListItem from '../../../skeletons/lists/SkeletonListItem.jsx';
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
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
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