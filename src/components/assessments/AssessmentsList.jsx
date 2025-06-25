import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { softDeleteAssessment } from './forms/softDeleteAssessment';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import ConfirmationDialog from '../ui/ConfirmationDialog.jsx';
import styles from '../../styles/patients/lists/PatientsProfileLists.module.css';

export default function AssessmentsList({ assessments, error, onAssessmentDeleted }) {
    const { id: patientId } = useParams();
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [assessmentToDelete, setAssessmentToDelete] = useState(null);

    const handleOpenDialog = (assessment) => {
        setAssessmentToDelete(assessment);
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
            await softDeleteAssessment(assessmentToDelete.id, token);
            onAssessmentDeleted?.(assessmentToDelete.id);
            handleCloseDialog();
        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    if (error) {
        return (
            <div>
                <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
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
                {assessments.length > 0 ? (
                assessments.map((assessment) => {
                    return (
                        <div key={assessment.id} className='w-[90%] flex shadow shadow-[#94a3b8] rounded-md'>
                            <div className='flex flex-col m-4 pr-4 flex-grow'>
                                <h5> <span className='text-[#b36ed8] text-base'>{assessment.nombre_evaluacion}</span></h5>
                                <p className='text-[#94a3b8] text-xs'>Tipo de evaluación: <span className='text-[#89898a]'>{assessment.tipo_evaluacion}</span></p>
                                <p className='text-[#94a3b8] text-xs'>Fecha: <span className='text-[#89898a]'>{assessment.fecha_evaluacion}</span></p>
                                <p className='text-[#94a3b8] text-xs'>Resultado: <span className='text-[#89898a]'>{assessment.resultado}</span></p>
                                <p className='text-[#94a3b8] text-xs'>Observaciones: <span className='text-[#89898a]'>{assessment.observaciones}</span></p>
                            </div>
                            <div className='flex items-center justify-end pr-4'>
                                <Link to={`edit/${assessment.id}`}>
                                    <BorderColorTwoToneIcon className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2' />
                                </Link>
                                <DeleteForeverTwoToneIcon 
                                    className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2' 
                                    onClick={() => handleOpenDialog(assessment)}
                                />
                            </div>
                            <ConfirmationDialog
                                open={dialogOpen}
                                title={`¿Estás seguro que deseas borrar "${assessmentToDelete?.nombre_evaluacion}"?`}
                                onClose={handleCloseDialog}
                                onConfirm={handleConfirmDelete}
                                isProcessing={isDeleting}
                                error={deleteError}
                            />
                        </div>
                    );
                })
            ) : (
                <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    No hay evaluaciones asociados al paciente.
                </div>
            )} 
            </div>
        </div>
  );
};