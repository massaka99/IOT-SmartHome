import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Something went wrong
          </Typography>
          <Button 
            onClick={() => window.location.reload()}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Reload Page
          </Button>
        </Paper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
