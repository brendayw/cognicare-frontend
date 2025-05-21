import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/Menu.jsx';
import PatientProfileHeader from '../../components/patients/profile/PatientProfileHeader.jsx';
import PatientName from '../../components/patients/profile/PatientName.jsx';
import PatientData from '../../components/patients/profile/PatientData.jsx';
import PatientProgress from '../../components/patients/profile/PatientProgress.jsx';
import PatientHistoryTab from '../../components/patients/profile/PatientHistoryTab.jsx';
import PatientLastSessionTab from '../../components/patients/profile/PatientLastSessionTab.jsx';

export default function PatientProfile() {
    return (
        <div>
            <Menu />
            <div>
                <PatientProfileHeader />
                <div>
                    <div>
                        <PatientName />
                        <PatientData />
                        <PatientProgress />
                    </div>
                    {/* <div>
                        <PatientHistoryTab />
                        <PatientLastSessionTab />
                    </div> */}
                </div>
            </div>
        </div>
    );
}