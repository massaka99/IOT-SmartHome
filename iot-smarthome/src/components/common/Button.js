import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, variant = 'contained', ...props }) => {
  return (
    <MuiButton
      variant={variant}
      sx={{
        textTransform: 'none',
        borderRadius: 2,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;