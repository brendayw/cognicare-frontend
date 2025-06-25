import { useParams } from 'react-router-dom';
import useReportsData from '../../hooks/useReportsData.jsx';
import Menu from '../../components/ui/Menu.jsx';
import ReportsList from '../../components/reports/ReportsList.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function Reports() {
    const { id } = useParams();
    const { reports, error, loading, handleReportDeleted } = useReportsData(id);

    return (
        <div className='h-screen'>
            <Menu/>
            <div className='h-screen'>
                {loading ? (
                    <div className=''>Cargando pacientes...</div>
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