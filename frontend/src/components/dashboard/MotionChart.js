import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Box, IconButton, Tooltip, CircularProgress } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { format } from 'date-fns';
import './ChartConfig';

const MotionChart = ({ data, title, timeRange, loading }) => {
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
        y: d.status === "Motion detected" ? 1 : 0
      })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      stepped: true,
      tension: 0
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
          label: (context) => context.parsed.y === 1 ? 'Motion Detected' : 'No Motion',
          title: (tooltipItems) => {
            return format(tooltipItems[0].parsed.x, 'PPpp');
          }
        }
      },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
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
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return value === 1 ? 'Active' : 'Inactive';
          }
        },
        title: {
          display: true,
          text: 'Motion Status'
        }
      }
    }
  };

  return (
    <Box sx={{ position: 'relative', height: 400 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}>
            <Tooltip title="Reset Zoom">
              <IconButton onClick={handleResetZoom} size="small">
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Line ref={chartRef} options={options} data={chartData} />
        </>
      )}
    </Box>
  );
};

export default MotionChart; 