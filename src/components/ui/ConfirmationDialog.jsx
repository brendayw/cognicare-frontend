
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
      sx={{
        minWidth: '325px',
        borderRadius: '24px',
        fontFamily: 'montserrat',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      }}
    >
      <DialogTitle 
        id="alert-dialog-title"
        className="bg-[#ffffff] text-[#94a3b8] p-4 border-b border-gray-200 font-medium !text-sm"
      >
        {title}
      </DialogTitle>
      
      {error && (
        <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
          {error}
        </div>
      )}
      
      <DialogActions className="p-4 flex justify-between border-t border-gray-200">
        <Button 
          onClick={onClose}
          disabled={isProcessing}
          className="min-w-[100px] font-montserrat"
          style={{
            color: '#424884',
            borderColor: '#424884',
            borderRadius: '16px',
            fontSize: '12px'
          }}
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          disabled={isProcessing}
          className="min-w-[100px] font-montserrat"
          style={{
            backgroundColor: '#ff6f59',
            color: 'white',
            borderRadius: '16px',
            fontSize: '12px'
          }}
          variant="contained"
          startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isProcessing ? 'Procesando...' : 'Confirmar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}