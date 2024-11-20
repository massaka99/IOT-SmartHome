import React, { useContext } from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../services/firebase';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
      {user && (
        <>
          <Avatar
            src={user.photoURL}
            alt={user.displayName}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user.displayName}
          </Typography>
          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            color="inherit"
          >
            Logout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Navigation; 