import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import Navigation from './Navigation';
import HomeIcon from '@mui/icons-material/Home';

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HomeIcon sx={{ fontSize: 28 }} />
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 600,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Smart Home Monitor
          </Typography>
        </Box>
        <Navigation />
      </Toolbar>
    </AppBar>
  );
};

export default Header;