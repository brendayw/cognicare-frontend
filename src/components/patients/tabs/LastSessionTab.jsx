import { TabTitle, LastSession, HistorySessions } from '../../index.jsx';

export default function LastSessionTab() {
    return (
        <div className='w-full flex flex-col gap-2'>
            <TabTitle titulo='Última sesión registrada' />
            <div className='w-full'>
                <div className='w-full'>
                    <LastSession />
                </div>
                <div className='w-full'>
                    <HistorySessions />
                </div>
            </div>
        </div>
    )
    
}