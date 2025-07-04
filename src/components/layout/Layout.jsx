import { Outlet } from 'react-router-dom';
import Menu from '../ui/Menu.jsx';

export default function Layout() {
    return (
        <div className="h-screen flex flex-col xl:overflow-hidden">
            <Menu />
            <main className='
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-thumb]:bg-slate-400
                [&::-webkit-scrollbar-thumb]:rounded
                [&::-webkit-scrollbar-track]:bg-slate-100
                [scrollbar-width:thin]
                [scrollbar-color:#94a3b8_#f1f1f1]
                relative flex-grow p-2
                top-0 [@media_(max-width:_639px)]:top-[100px] sm:top-[100px] md:top-0
                xs:ml-0 sm:ml-0 md:ml-24 lg:ml-30 xl:ml-38 [@media_(min-width:_1291px)]:ml-48
                xl:overflow-y-hidden overflow-y-auto md:overflow-y-visible overflow-x-hidden
                [@media_(max-width:_767px)]:max-h-[calc(100vh-100px)]'
            >
                <Outlet />
            </main>
        </div>
    );
}