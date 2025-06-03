import Menu from '../../../components/ui/Menu.jsx';
import ReportForm from '../../../components/reports/forms/ReportForm.jsx';

export default function Report() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <ReportForm />
            </div>
        </div>
    );
}