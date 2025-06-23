import Menu from '../../../components/ui/Menu.jsx';
import PatientForm from '../../../components/patients/forms/PatientForm.jsx';

export default function Patient() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div className='m-2 '>
                <PatientForm />
            </div>
        </div>
    );
}