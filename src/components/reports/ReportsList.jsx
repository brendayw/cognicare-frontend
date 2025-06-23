import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { softDeleteReport } from './forms/softDeleteReport.jsx';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import ConfirmationDialog from '../ui/ConfirmationDialog.jsx';
import styles from '../../styles/patients/lists/PatientsProfileLists.module.css';

export default function ReportsList({ reports, error, onReportDeleted }) {
    const { id: patientId } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);

    const handleOpenDialog = (report) => {
        setReportToDelete(report);
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
            await softDeleteReport(reportToDelete.id, token);
                
            onReportDeleted?.(reportToDelete.id);
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
                {reports.length > 0 ? (
                    reports.map((report) => {
                        return (
                            <div key={report.id} className='w-[90%] flex shadow shadow-[#94a3b8] rounded-md m-2'>
                                <div className='flex flex-col m-4 pr-4 flex-grow'>
                                    <h5> <span className='text-[#b36ed8] text-base'>{report.evaluacion?.nombre_evaluacion}</span></h5>
                                    <p className='text-[#94a3b8] text-xs'>Tipo de evaluación: <span className='text-[#89898a]'>{report.tipo_reporte}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Descripcion: <span className='text-[#89898a]'>{report.descripcion}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Fecha: <span className='text-[#89898a]'>{report.fecha_reporte}</span></p>

                                    <Link to={report.archivo} 
                                        className='text-[#b36ed8] text-xs hover:text-[#424884] ' target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ver reporte
                                    </Link>

                                </div>
                                <div className='flex items-center justify-end pr-4'>
                                    <Link to={`edit/${report.id}`}>
                                        <BorderColorTwoToneIcon className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2'/>
                                    </Link>
                                    <DeleteForeverTwoToneIcon 
                                        className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2'
                                        onClick={() => handleOpenDialog(report)}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        No hay reportes disponibles asociados al paciente.
                    </div>
                )} 
            </div>
            <ConfirmationDialog
                open={dialogOpen}
                title={`¿Estás seguro que deseas borrar este reporte?`}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
                isProcessing={isDeleting}
                error={deleteError}
            />
        </div>
    );
}