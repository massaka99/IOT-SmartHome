import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Graphs from './pages/Graphs';
import Login from './pages/Login';
import LoadingScreen from './components/common/LoadingScreen';
import PrivateRoute from './components/auth/PrivateRoute';
import { ThemeProviderWrapper } from './context/ThemeContext';


const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/" replace /> : <Login />
      } />
      <Route path="/" element={
        <PrivateRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="/graphs" element={
        <PrivateRoute>
          <Layout>
            <Graphs />
          </Layout>
        </PrivateRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProviderWrapper>
    </AuthProvider>
  );
}

export default App;