import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

Chart.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const LineChart = ({ data, width = "200px", height = "100px", curveTension = 0.2 }) => {
  const chartData = {
    labels: data.labels, 
    datasets: [
        {
          label: data.period1.label || 'Period 1',
          data: data.period1.values,
          backgroundColor: 'rgba(243, 182, 0, 0.6)', // Amber
          borderColor: 'rgba(243, 182, 0, 1)',       // Amber Border
          borderWidth: 2,
          pointBackgroundColor: 'rgba(243, 182, 0, 1)', // Amber Points
          pointBorderColor: '#fff',
          tension: curveTension,
        },
        {
          label: data.period2.label || 'Period 2',
          data: data.period2.values,
          backgroundColor: 'rgba(211, 211, 211, 0.6)', // Light Gray
          borderColor: 'rgba(169, 169, 169, 1)',       // Dark Gray Border
          borderWidth: 2,
          pointBackgroundColor: 'rgba(169, 169, 169, 1)', // Gray Points
          pointBorderColor: '#fff',
          tension: curveTension,
        },
      ],
      
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: 'Values',
        },
      },
    },
  };

  return (
    <div className={`items-center p-2 h-full`}>
      <Line data={chartData} options={options} width={width} height={height} />
    </div>
  );
};

export default LineChart;
