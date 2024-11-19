import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Navigation from './Navigation';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Smart Home Monitor
        </Typography>
        <Navigation />
      </Toolbar>
    </AppBar>
  );
};

export default Header;