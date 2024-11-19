import React from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;