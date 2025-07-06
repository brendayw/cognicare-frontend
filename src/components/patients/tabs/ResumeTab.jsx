import { TabTitle, HistoryResume, AssessmentsResume, ReportsResume } from '../../index.jsx';

export default function ResumeTab() {
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