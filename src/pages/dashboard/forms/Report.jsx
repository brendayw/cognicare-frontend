import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../../components/Menu.jsx';
import ReportForm from '../../../components/dashboard/forms/ReportForm.jsx';

export default function Report() {

    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <ReportForm />
            </div>
        </div>
    );
}