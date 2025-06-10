import Menu from '../components/ui/Menu.jsx';
import EditProfesionalForm from '../components/profesional/forms/EditProfesionalForm.jsx';

export default function EditProfesional( ) {
    return (
        <div className='h-screen'>
            <Menu />
            <div>
                <EditProfesionalForm />
            </div>
        </div>
    );
}