import Menu from '../../components/ui/Menu.jsx';
import EditPatientForm from '../../components/patients/forms/EditPatientForm.jsx';
import styles from '../../styles/patients/lists/EditFormsLists.module.css';

export default function EditPatient( ) {
    return (
        <div className='h-screen xl:overflow-y-auto'>
            <Menu/>
            <div className={`${styles.form_containers} flex justify-center`}>
                <EditPatientForm />
            </div>
        </div>
    );
}