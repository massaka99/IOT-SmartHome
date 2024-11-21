import React, { useState } from 'react';
import { 
  Button, Typography, Paper, Box,
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
import { validators } from '../utils/validation';

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
      const phoneValidation = validators.phoneNumber(phoneNumber);
      if (!phoneValidation.isValid) {
        setError(phoneValidation.message);
        return;
      }

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
    <div className="login-container">
      <Paper className="login-paper" elevation={4}>
        <div className="login-header">
          <HomeIcon className="login-logo" />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Smart Home Monitor
          </Typography>
        </div>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              animation: 'fadeIn 0.3s ease-in'
            }}
          >
            {error}
          </Alert>
        )}

        <Tabs 
          value={authMethod} 
          onChange={(e, v) => setAuthMethod(v)} 
          className="login-tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 48,
              borderRadius: '8px',
              fontWeight: 500
            }
          }}
        >
          <Tab value="social" label="Social Login" />
          <Tab value="phone" label="Phone" />
          <Tab value="email" label="Email" />
        </Tabs>

        {authMethod === 'social' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              className="social-button google-button"
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={() => handleSocialSignIn(googleProvider)}
              fullWidth
            >
              Sign in with Google
            </Button>
            <Button
              className="social-button facebook-button"
              variant="contained"
              startIcon={<FacebookIcon />}
              onClick={() => handleSocialSignIn(facebookProvider)}
              fullWidth
            >
              Sign in with Facebook
            </Button>
            <Button
              className="social-button microsoft-button"
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
    </div>
  );
};

export default Login; 