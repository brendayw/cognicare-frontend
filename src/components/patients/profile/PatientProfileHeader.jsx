import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { softDeletePatient } from '../forms/softDeletePatient.jsx';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ConfirmationDialog from '../../ui/ConfirmationDialog.jsx';

export default function PatientProfileHeader( { patient, onPatientDeleted } ) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const navigate = useNavigate();

    const handleOpenDialog = (patient) => {
        setPatientToDelete(patient);
        setDialogOpen(true);
    };
        
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDeleteError(null);
    };
        
    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        setDeleteError(null);
                    
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');
            await softDeletePatient(patientToDelete.id, token);
            onPatientDeleted?.(patientToDelete.id);
            handleCloseDialog();
            navigate('/patients');
            
        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className='relative w-full flex items-center justify-between p-4 ml-2 xs:ml-2'>
            <Link to='/patients'>
                <ArrowBackIosTwoToneIcon className='text-[#94a3b8] cursor-pointer hover:text-[#00a396]'/>
            </Link>
            
            <div className='flex items-center'>
                <Link to='edit' className={`${!patient ? 'pointer-events-none opacity-50' : ''}`}>
                    <BorderColorTwoToneIcon className='text-[#94a3b8] cursor-pointer hover:text-[#00a396] mr-4'/>
                </Link>

                <DeleteForeverTwoToneIcon
                    className={`text-[#94a3b8] cursor-pointer hover:text-[#00a396] mr-2 ${
                        !patient ? 'pointer-events-none opacity-50' : ''
                    }`}
                    onClick={() => patient && handleOpenDialog(patient)}
                />
            </div>

            {patient && (
                <ConfirmationDialog
                    open={dialogOpen}
                    title={`¿Estás seguro que deseas borrar al paciente ${patient.nombre_completo || patient.name || ''}?`}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmDelete}
                    isProcessing={isDeleting}
                    error={deleteError}
                />
            )}
        </div>
    );
}