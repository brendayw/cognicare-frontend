import { Menu, SessionForm }from '../../../components/index.jsx';

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