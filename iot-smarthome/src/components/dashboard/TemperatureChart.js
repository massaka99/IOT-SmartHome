import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const TemperatureChart = ({ data, title, timeRange }) => {
  const chartRef = React.useRef();

  const filteredData = React.useMemo(() => {
    const now = Date.now();
    return data.filter(d => (now - new Date(d.timestamp).getTime()) <= timeRange);
  }, [data, timeRange]);

  const chartData = {
    labels: filteredData.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Temperature °C',
      data: filteredData.map(d => d.value),
      borderColor: '#2196f3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const handleExport = () => {
    const base64Image = chartRef.current.toBase64Image();
    const link = document.createElement('a');
    link.download = `temperature-data-${new Date().toISOString()}.png`;
    link.href = base64Image;
    link.click();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}>
        <Tooltip title="Export as PNG">
          <IconButton onClick={handleExport}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          responsive: true,
          animation: {
            duration: 750,
            easing: 'easeInOutQuart'
          },
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: title
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            },
            x: {
              title: {
                display: true,
                text: timeRange > 86400000 ? 'Date/Time' : 'Time'
              }
            }
          }
        }}
      />
    </Box>
  );
};

export default TemperatureChart;