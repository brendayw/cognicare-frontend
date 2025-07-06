import { Menu, ReportForm }from '../../../components/index.jsx';

export default function Report() {
    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <ReportForm />
            </div>
        </div>
    );
}