import Menu from '../../components/ui/Menu.jsx';
import EditPatientForm from '../../components/patients/forms/EditPatientForm.jsx';

export default function EditPatient( ) {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <EditPatientForm />
            </div>
        </div>
    );
}