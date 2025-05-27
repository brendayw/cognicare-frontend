import React from 'react';
import Menu from '../../components/Menu.jsx';
import PatientProfileHeader from '../../components/patients/profile/PatientProfileHeader.jsx';
import PatientName from '../../components/patients/profile/PatientName.jsx';
import PatientData from '../../components/patients/profile/PatientData.jsx';
import PatientProgress from '../../components/patients/profile/PatientProgress.jsx';
import CustomTabs from '../../components/CustomTabs.jsx';

export default function PatientProfile() {
    return (
        <div className='flex w-full'>
            <Menu />
            <div className='w-full'>
                <PatientProfileHeader />
                <div className='flex'>
                    <div className='w-[40%]'>
                        <PatientName />
                        <PatientData  />
                        <PatientProgress />
                    </div>
                    <div className='w-[60%]'>
                        <CustomTabs />
                    </div>
                </div>
            </div>
            
        </div>
    );
}