import { Menu, EditSessionForm }from '../../../components/index.jsx';
import styles from '../../../styles/patients/lists/EditFormsLists.module.css';

export default function EditAssessment() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div className={`${styles.form_containers} flex justify-center`}>
                <EditSessionForm />
            </div>
        </div>
    );
}