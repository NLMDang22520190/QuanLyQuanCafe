import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, width = "200px", height = "200px" }) => {
  const totalValue = data.values.reduce((acc, value) => acc + value, 0);
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          'rgba(172, 123, 0, 0.6)',  // Dark Gold
          'rgba(243, 182, 0, 0.6)',  // Golden Yellow
          'rgba(196, 140, 0, 0.6)', 
          'rgba(219, 158, 0, 0.6)',  // Amber // Deep Amber
          'rgba(153, 108, 0, 0.6)',
        ],
        borderColor: 'rgba(255, 255, 255, 0)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: true,
        position: 'right',
      },
    },
  };

  return (<>
    <div className={`items-center h-full`}>
      <Doughnut data={chartData} options={options} width={width} height={height} />
    </div>
  </>

  );
};

export default DoughnutChart;