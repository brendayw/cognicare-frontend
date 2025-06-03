import { Outlet } from 'react-router-dom';
import Menu from '../ui/Menu.jsx';

export default function Layout() {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <Menu />
            <main className="flex-grow p-4 ml-48">
                <Outlet />
            </main>
        </div>
    );
}