import React, { useContext } from 'react';
import { Box, Button, Avatar, Typography, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AuthContext } from '../../context/AuthContext';
import { ColorModeContext } from '../../context/ThemeContext';
import { useTheme } from '@mui/material/styles';
import { auth } from '../../services/firebase';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const isActive = (path) => location.pathname === path;

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
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
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
            onClick={() => auth.signOut()}
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