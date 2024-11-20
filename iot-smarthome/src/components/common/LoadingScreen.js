import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default LoadingScreen; 