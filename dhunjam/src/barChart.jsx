// BarChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ data }) => {
  const options = {
    chart: {
      background: '#030303',
      type: 'bar',
    },
    xaxis: {
      categories: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
      labels: {
        style: {
          colors: '#FFFFFF', // Bar axis label color
        },
      },
      axisTicks: {
        show: false, // Hide axis ticks
      },
      axisBorder: {
        color: '#FFFFFF', // Bar axis color
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FFFFFF', // Bar axis label color
        },
      },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 300,
              color: '#F0C3F1', // Graph bars color
            },
          ],
        },
      },
    },
  };

  return (
    <Chart options={options} series={[{ data }]} type="bar" height={350} />
  );
};

export default BarChart;
