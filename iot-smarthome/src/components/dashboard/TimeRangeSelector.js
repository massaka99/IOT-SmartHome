import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
  const timeRanges = [
    { label: '1H', value: 3600000 },
    { label: '6H', value: 21600000 },
    { label: '24H', value: 86400000 },
    { label: '7D', value: 604800000 },
  ];

  return (
    <ButtonGroup variant="outlined" size="small">
      {timeRanges.map(({ label, value }) => (
        <Button
          key={label}
          onClick={() => onRangeChange(value)}
          variant={selectedRange === value ? 'contained' : 'outlined'}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TimeRangeSelector; 