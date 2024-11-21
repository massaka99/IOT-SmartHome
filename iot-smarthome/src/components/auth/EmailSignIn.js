import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box,
  Alert,
  Typography,
  Link 
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { validators } from '../../utils/validation';
import { SessionManager } from '../../utils/sessionManager';

const EmailSignIn = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const emailCheck = validators.email(email);
    const passwordCheck = validators.password(password);

    if (!emailCheck.isValid) {
      setError(emailCheck.message);
      return;
    }

    if (!passwordCheck.isValid) {
      setError(passwordCheck.message);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await SessionManager.initSession();
    } catch (error) {
      setError(error.message);
      console.error('Sign in error:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        Sign In
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link
            component="button"
            variant="body2"
            onClick={onToggleMode}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default EmailSignIn; 