import { Menu, EditReportForm } from '../../../components/index.jsx';
import styles from '../../../styles/patients/lists/EditFormsLists.module.css';

export default function EditReport() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div className={`${styles.form_containers} flex justify-center`}>
                <EditReportForm />
            </div>
        </div>
    );
}