import React from 'react';
import TabTitle from './TabTitle';
import HistoryResume from './resumen-tab/HistoryResume';
import AssessmentsResume from './resumen-tab/AssessmentsResume';
import ReportsResume from './resumen-tab/ReportsResume';

export default function ResumenTab() {
    return (
        <div className='w-full flex flex-col gap-2'>
            <TabTitle titulo='Historia Clínica del paciente' />
            <div className='w-full'>
                <HistoryResume />
            </div >
            <div className='w-full'>
                <AssessmentsResume />
            </div>
            <div className='w-full'>
                <ReportsResume />
            </div>
        </div>
    )
}