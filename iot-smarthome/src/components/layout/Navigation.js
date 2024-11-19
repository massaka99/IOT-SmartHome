import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        startIcon={<DashboardIcon />}
        onClick={() => navigate('/')}
        color={isActive('/') ? 'primary' : 'inherit'}
        variant={isActive('/') ? 'contained' : 'text'}
      >
        Dashboard
      </Button>
      <Button
        startIcon={<TimelineIcon />}
        onClick={() => navigate('/graphs')}
        color={isActive('/graphs') ? 'primary' : 'inherit'}
        variant={isActive('/graphs') ? 'contained' : 'text'}
      >
        Graphs
      </Button>
      <Button
        startIcon={<SettingsIcon />}
        onClick={() => navigate('/settings')}
        color={isActive('/settings') ? 'primary' : 'inherit'}
        variant={isActive('/settings') ? 'contained' : 'text'}
      >
        Settings
      </Button>
    </Box>
  );
};

export default Navigation; 