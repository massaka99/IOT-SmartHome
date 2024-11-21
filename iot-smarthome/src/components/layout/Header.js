import React from 'react';
import { AppBar, Toolbar, useTheme } from '@mui/material';
import Navigation from './Navigation';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      elevation={2}
      sx={{
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(45deg, #1a237e 30%, #283593 90%)'
          : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
      }}
    >
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        padding: { xs: 1, sm: 2 },
      }}>
        <Navigation />
      </Toolbar>
    </AppBar>
  );
};

export default Header;