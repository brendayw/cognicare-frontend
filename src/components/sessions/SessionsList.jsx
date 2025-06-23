import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { softDeleteSession } from './forms/softDeleteSession.jsx';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import ConfirmationDialog from '../ui/ConfirmationDialog.jsx';
import styles from '../../styles/patients/lists/PatientsProfileLists.module.css';

export default function SessionsList({ sessions, error, onSessionDeleted }) {
    const { id: patientId } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);

    const handleOpenDialog = (session) => {
        setSessionToDelete(session);
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
            await softDeleteSession(sessionToDelete.id, token);
                    
            onSessionDeleted?.(sessionToDelete.id);
            handleCloseDialog();
        } catch (error) {
            setDeleteError(error.message);
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    if (error && error.includes('No hay token de autenticación')) {
        return (
            <div>
                <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    Error al cargar datos: No hay token de autenticación
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.lists_container} space-y-4`}>
            <Link to={`/patients/profile/${patientId}`} className='inline-block ml-4'>
                <ArrowBackIosTwoToneIcon className='text-[#94a3b8] hover:text-[#00a396]'/>
            </Link>
            <div className='flex flex-col items-center'>
                {sessions.length > 0 ? (
                    sessions.map((session) => {
                        return (
                            <div key={session.id} className='w-[90%] flex shadow shadow-[#94a3b8] rounded-md'>
                                <div className='flex flex-col m-4 pr-4 flex-grow'>
                                    <h5><span className='text-[#00a396] text-base'>{session.estado}</span></h5>
                                    <p className='text-[#94a3b8] text-xs'>Fecha: <span className='text-[#89898a]'>{session.fecha}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Hora: <span className='text-[#89898a]'>{session.hora}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Duracion: <span className='text-[#89898a]'>{session.duracion}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Tipo de sesión: <span className='text-[#89898a]'>{session.tipo_sesion}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Observaciones: <span className='text-[#89898a]'>{session.observaciones}</span></p>
                                </div>
                                <div className='flex items-center justify-end pr-4'>
                                    <Link to={`edit/${session.id}`}>
                                        <BorderColorTwoToneIcon className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2' />
                                    </Link>
                                    <DeleteForeverTwoToneIcon 
                                        className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2'
                                        onClick={() => handleOpenDialog(session)}
                                    />
                                </div>
                            </div>
                        );
                    })

                ) : (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        No hay sesiones disponibles asociados al paciente.
                    </div>
                )}
            </div>
            <ConfirmationDialog
                open={dialogOpen}
                title={`¿Estás seguro que deseas borrar esta sesión?`}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
                isProcessing={isDeleting}
                error={deleteError}
            />
        </div>
    );
}