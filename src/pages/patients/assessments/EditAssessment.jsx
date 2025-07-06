import{ Menu, EditAssessmentForm }from '../../../components/index.jsx';
import styles from '../../../styles/patients/lists/EditFormsLists.module.css';

export default function EditAssessment() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div className={`${styles.form_containers} flex justify-center`}>
                <EditAssessmentForm />
            </div>
        </div>
    );
}