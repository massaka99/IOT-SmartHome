import React from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = ({ open, message, severity = 'info', onClose, duration = 6000 }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <MuiAlert 
        elevation={6} 
        variant="filled" 
        severity={severity} 
        onClose={onClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;