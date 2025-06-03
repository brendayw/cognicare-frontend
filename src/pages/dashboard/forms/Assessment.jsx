import Menu from '../../../components/ui/Menu.jsx';
import AssessmentForm from '../../../components/assessments/forms/AssessmentForm.jsx';

export default function Assessment() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <AssessmentForm />
            </div>
        </div>
    );
}