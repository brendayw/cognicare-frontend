import Menu from '../../components/ui/Menu.jsx';
import EditAssessmentForm from '../../components/assessments/forms/EditAssessmentForm.jsx';

export default function EditAssessment() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <EditAssessmentForm />
            </div>
        </div>
    );
}