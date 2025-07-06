import { Menu, PatientForm }from '../../../components/index.jsx';

export default function Patient() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div >
                <PatientForm />
            </div>
        </div>
    );
}