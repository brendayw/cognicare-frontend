import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { softDeleteProfesional } from '../profesional/forms/softDeleteProfesional';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import styles from '../../styles/settings/DesactivarSolapa.module.css';

export default function DesactivarSolapa( { profesional, onProfesionalDeleted }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [profesionalToDelete, setProfesionalToDelete] = useState(null);
    const navigate = useNavigate();
    
    const handleOpenDialog = (profesional) => {
        setProfesionalToDelete(profesional);
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
            await softDeleteProfesional(profesionalToDelete?.id, token);

            onProfesionalDeleted?.(profesionalToDelete.id);
            handleCloseDialog();
            localStorage.removeItem('token');
            navigate('/');

        } catch (error) {
            setDeleteError(error.message);
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div id="deactivateSolapa" className={`${styles.solapa} ${styles.solapa_deactivate}`}>
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
                onClick={() => handleOpenDialog(profesional)}
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