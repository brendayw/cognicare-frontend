import { Menu, AssessmentForm }from '../../../components/index.jsx';

export default function Assessment() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <AssessmentForm />
            </div>
        </div>
    );
}