import React from 'react';
import { Container, Button, Typography, Paper } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper 
        elevation={4}
        sx={{ 
          p: 6, 
          textAlign: 'center',
          borderRadius: 4,
          width: '100%',
          maxWidth: 400
        }}
      >
        <HomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Smart Home Monitor
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Monitor and control your home environment
        </Typography>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          size="large"
          fullWidth
          sx={{ 
            py: 1.5,
            textTransform: 'none',
            fontSize: '1.1rem'
          }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default Login; 