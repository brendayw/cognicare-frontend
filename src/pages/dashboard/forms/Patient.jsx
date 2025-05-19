import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../../components/Menu.jsx';
import PatientForm from '../../../components/dashboard/forms/PatientForm.jsx';

export default function Patient() {

    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <PatientForm />
            </div>
        </div>
    );
}