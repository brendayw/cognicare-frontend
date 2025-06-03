import Menu from '../../../components/ui/Menu.jsx';
import SessionForm from '../../../components/sessions/forms/SessionForm.jsx';

export default function Session() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <SessionForm />
            </div>
        </div>
    );
}