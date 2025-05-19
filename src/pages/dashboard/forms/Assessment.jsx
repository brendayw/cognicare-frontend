import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../../components/Menu.jsx';
import AssessmentForm from '../../../components/dashboard/forms/AssessmentForm.jsx';

export default function Assessment() {

    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <AssessmentForm />
            </div>
        </div>
    );
}