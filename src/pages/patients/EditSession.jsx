import Menu from '../../components/ui/Menu.jsx';
import EditSessionForm from '../../components/sessions/forms/EditSessionForm.jsx';

export default function EditAssessment() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <EditSessionForm />
            </div>
        </div>
    );
}