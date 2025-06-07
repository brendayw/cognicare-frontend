import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

export default function ConfirmationDialog({
  open,
  title,
  onClose,
  onConfirm,
  isProcessing,
  error
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      
      {error && (
        <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
          {error}
        </div>
      )}
      
      <DialogActions>
        <Button onClick={onClose} disabled={isProcessing}>
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          disabled={isProcessing}
          color="error"
          startIcon={isProcessing ? <CircularProgress size={20} /> : null}
        >
          {isProcessing ? 'Procesando...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}