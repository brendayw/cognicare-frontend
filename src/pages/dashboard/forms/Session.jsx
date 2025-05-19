import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../../components/Menu.jsx';
import SessionForm from '../../../components/dashboard/forms/SessionForm.jsx';

export default function Session() {

    return (
        <div className='h-screen'>
            <Menu/>
            <div>
                <SessionForm />
            </div>
        </div>
    );
}