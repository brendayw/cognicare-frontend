import { Outlet } from 'react-router-dom';
import Menu from '../ui/Menu.jsx';

export default function Layout() {
    return (
        <div className="h-screen flex flex-col xl:overflow-hidden">
            <Menu />
            <main className="flex-grow p-2 xs:ml-0 sm:ml-0 md:ml-24 lg:ml-30 xl:ml-38 [@media_(min-width:_1291px)]:ml-48" >
                <Outlet />
            </main>
        </div>
    );
}