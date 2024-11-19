import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

const TimeRangeSelector = ({ selectedRange, onRangeChange }) => {
  const ranges = [
    { label: '1H', value: 3600000 },
    { label: '24H', value: 86400000 },
    { label: '7D', value: 604800000 },
    { label: '30D', value: 2592000000 }
  ];

  return (
    <ButtonGroup size="small" aria-label="time range selector">
      {ranges.map(range => (
        <Button
          key={range.value}
          variant={selectedRange === range.value ? 'contained' : 'outlined'}
          onClick={() => onRangeChange(range.value)}
        >
          {range.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TimeRangeSelector; 