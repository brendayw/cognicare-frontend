import { Menu, EditProfessionalForm } from '../../components/index.jsx';
import styles from '../../styles/patients/lists/PatientsProfileLists.module.css';

export default function EditProfessional() {
    return (
        <div className='h-screen xl:overflow-y-auto'>
            <Menu />
            <div className={`${styles.form_containers} flex justify-center`}>
                <EditProfessionalForm />
            </div>
        </div>
    );
}