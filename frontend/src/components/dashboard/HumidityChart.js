import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { format } from 'date-fns';
import './ChartConfig';

const HumidityChart = ({ data, title, timeRange, loading }) => {
  const chartRef = useRef(null);

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  const filteredData = React.useMemo(() => {
    const now = Date.now();
    return data?.filter(d => (now - new Date(d.timestamp).getTime()) <= timeRange) || [];
  }, [data, timeRange]);

  const chartData = {
    datasets: [{
      label: title,
      data: filteredData.map(d => ({
        x: new Date(d.timestamp),
        y: d.value
      })),
      borderColor: '#4caf50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}%`,
          title: (tooltipItems) => {
            return format(tooltipItems[0].parsed.x, 'PPpp');
          }
        }
      },
      zoom: {
        limits: {
          y: { min: 0, max: 100 }
        },
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeRange <= 86400000 ? 'hour' : 'day',
          displayFormats: {
            hour: 'HH:mm',
            day: 'MMM d'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Humidity (%)'
        }
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}>
        <Tooltip title="Reset Zoom">
          <IconButton onClick={handleResetZoom} size="small">
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Line ref={chartRef} options={options} data={chartData} />
    </Box>
  );
};

export default HumidityChart;