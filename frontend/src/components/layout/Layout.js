import React, {  } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {!isLoginPage && <Header />}
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;