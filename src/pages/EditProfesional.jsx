import Menu from '../components/ui/Menu.jsx';
import EditProfesionalForm from '../components/profesional/forms/EditProfesionalForm.jsx';
import styles from '../styles/patients/lists/EditFormsLists.module.css';

export default function EditProfesional( ) {
    return (
        <div className='h-screen xl:overflow-y-auto'>
            <Menu />
            <div className={`${styles.form_containers} flex justify-center`}>
                <EditProfesionalForm />
            </div>
        </div>
    );
}