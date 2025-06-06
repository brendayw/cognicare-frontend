import Menu from '../../components/ui/Menu.jsx';
import EditReportForm from '../../components/reports/forms/EditReportForm.jsx';

export default function EditReport() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <EditReportForm />
            </div>
        </div>
    );
}