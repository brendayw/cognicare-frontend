import React from 'react';
import TabTitle from './TabTitle';
import LastSessionTab from './ultimasesion-tab/LastSessionTab';
import HistorySessions from './ultimasesion-tab/HistorySessions';

export default function UltimaSesionTab() {
    return (
        <div className='w-full flex flex-col gap-2'>
            <TabTitle titulo='Última sesión registrada' />
            <div className='w-full'>
                <div className='w-full'>
                    <LastSessionTab />
                </div>
                <div className='w-full'>
                    <HistorySessions />
                </div>
            </div>
        </div>
    )
    
}