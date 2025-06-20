import React, { useContext, useEffect } from 'react';
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
import './styles/global.css';
import './styles/themes/light.css';
import './styles/themes/dark.css';
import './styles/components/Login.css';
import './styles/layouts/Layout.css';
import Home from './pages/Home';
import ErrorBoundary from './components/common/ErrorBoundary';
import { SessionManager } from './utils/sessionManager';


const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const checkUserSession = async () => {
      if (user && !SessionManager.checkSession()) {
        try {
          await SessionManager.refreshSession();
        } catch (error) {
          SessionManager.clearSession();
          Navigate('/login');
        }
      }
    };

    checkUserSession();
    const interval = setInterval(checkUserSession, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" replace /> : <Login />
        } />
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Home />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
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
    </ErrorBoundary>
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