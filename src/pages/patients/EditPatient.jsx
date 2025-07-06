import { Menu, EditPatientForm } from '../../components/index.jsx';
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