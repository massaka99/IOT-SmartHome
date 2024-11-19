import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#4caf50',
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Dashboard />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;