import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmationDialog, softDeleteProfessional } from '../index.jsx';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import styles from '../../styles/settings/DeactivateTab.module.css';

export default function DeactivateTab( { professional, onProfessionalDeleted, isMobile = false, onBack }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [professionalToDelete, setProfessionalToDelete] = useState(null);
    const navigate = useNavigate();
    
    const handleOpenDialog = (professional) => {
        setProfessionalToDelete(professional);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDeleteError(null);
    }

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        setDeleteError(null);

        try {
            const token = localStorage.getItem('token');
            await softDeleteProfessional(professionalToDelete?.id, token);
            onProfessionalDeleted?.(professionalToDelete.id);
            handleCloseDialog();
            localStorage.removeItem('token');
            navigate('/');

        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={`${styles.solapa} ${styles.solapa_deactivate}`}>
            {isMobile && onBack && (
                <div className="mb-4">
                <button
                    onClick={onBack}
                    className="flex items-center text-[#00a396] hover:text-[#008a7a] transition-colors"
                    aria-label="Volver al panel de configuraciones"
                >
                    <ArrowBackIosTwoToneIcon className="cursor-pointer" />
                </button>
                </div>
            )}
            <h3>Desactivar cuenta</h3>
            <div className={styles.container_deactivate}>
                <p className={styles.deactivate_info}>
                    Estas por desactivar tu cuenta como profesional. Al realizar esta acción, si vuelves a ingresar
                    tus datos se habrán perdido.
                </p>
                <p className={styles.info_extra}>
                    Si eliminas la cuenta por error, los datos podrán ser recuperados contactando a servicio técnico.
                </p>
                <p className={styles.info_extra}>
                    Si solo deseas cambiar tus datos personales, dirigete a la solapa Perfil.
                </p>
            </div>
            
            <button
                onClick={() => handleOpenDialog(professional)}
                className={styles.deactivate_btn}
                aria-label="Desactivar cuenta profesional"
                type="button"
            >
                <DeleteForeverTwoToneIcon fontSize="small" />
                <span>Desactivar</span>
            </button>

            <ConfirmationDialog
                open={dialogOpen}
                title={`¿Estás seguro que deseas borrar tu cuenta como profesional?`}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmDelete}
                isProcessing={isDeleting}
                error={deleteError}
            />
        </div>
    );
}