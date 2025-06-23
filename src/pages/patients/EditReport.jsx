import Menu from '../../components/ui/Menu.jsx';
import EditReportForm from '../../components/reports/forms/EditReportForm.jsx';
import styles from '../../styles/patients/lists/EditFormsLists.module.css';

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