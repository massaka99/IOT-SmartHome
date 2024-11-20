import React, { useState } from 'react';
import { 
  Container, Button, Typography, Paper, Box,
  TextField, Alert, Tab, Tabs
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import MicrosoftIcon from '@mui/icons-material/Window';
import PhoneIcon from '@mui/icons-material/Phone';
import { signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, microsoftProvider } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EmailSignUp from '../components/auth/EmailSignUp';
import EmailSignIn from '../components/auth/EmailSignIn';

const Login = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState('social');
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isEmailSignIn, setIsEmailSignIn] = useState(true);

  const handleSocialSignIn = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: () => {
        }
      });
    }
  };

  const handlePhoneSignIn = async () => {
    try {
      setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth, 
        phoneNumber, 
        window.recaptchaVerifier
      );
      setVerificationId(confirmation.verificationId);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, width: '100%' }}>
        <HomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Smart Home Monitor
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Tabs value={authMethod} onChange={(e, v) => setAuthMethod(v)} sx={{ mb: 3 }}>
          <Tab value="social" label="Social Login" />
          <Tab value="phone" label="Phone" />
          <Tab value="email" label="Email" />
        </Tabs>

        {authMethod === 'social' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialSignIn(googleProvider)}
              fullWidth
            >
              Sign in with Google
            </Button>
            <Button
              variant="contained"
              startIcon={<FacebookIcon />}
              onClick={() => handleSocialSignIn(facebookProvider)}
              fullWidth
            >
              Sign in with Facebook
            </Button>
            <Button
              variant="contained"
              startIcon={<MicrosoftIcon />}
              onClick={() => handleSocialSignIn(microsoftProvider)}
              fullWidth
            >
              Sign in with Microsoft
            </Button>
          </Box>
        )}

        {authMethod === 'phone' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
            />
            <div id="recaptcha-container"></div>
            <Button
              variant="contained"
              onClick={handlePhoneSignIn}
              startIcon={<PhoneIcon />}
              fullWidth
            >
              Verify Phone Number
            </Button>
            {verificationId && (
              <>
                <TextField
                  label="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={() => {/* Handle verification */}}
                  fullWidth
                >
                  Submit Code
                </Button>
              </>
            )}
          </Box>
        )}

        {authMethod === 'email' && (
          isEmailSignIn ? (
            <EmailSignIn onToggleMode={() => setIsEmailSignIn(false)} />
          ) : (
            <EmailSignUp onToggleMode={() => setIsEmailSignIn(true)} />
          )
        )}
      </Paper>
    </Container>
  );
};

export default Login; 