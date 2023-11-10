// ./components/PieChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
const PieChart = ({verfification}) => {
console.log(verfification)
const options = {
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          if (label) {
            const dataset = context.dataset.data;
            const value = dataset[context.dataIndex];
            const total = dataset.reduce((acc, data) => acc + data, 0);
            const percentage = ((value * 100) / total).toFixed(2) + '%';
            return `${label}: ${value} (${percentage})`;
          }
          return null;
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    legend: {
      labels: {
        generateLabels: (chart) => {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i) => {
              const dataset = data.datasets[0];
              const value = dataset.data[i];
              const total = dataset.data.reduce((acc, data) => acc + data, 0);
              const percentage = ((value * 100) / total).toFixed(2) + '%';
              return {
                text: `${label}: ${value} (${percentage})`,
                fillStyle: dataset.backgroundColor[i],
                hidden: isNaN(dataset.data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                lineCap: 'round',
                lineDash: [],
                lineDashOffset: 0,
                lineJoin: 'round',
                lineWidth: 1,
                strokeStyle: dataset.borderColor[i],
                pointStyle: undefined,
                rotation: 0,
              };
            });
          }
          return [];
        },
      },
    },
  },
};
const data = {
  labels: ["Mobile Verified", "Email Verified", "Not Verified"],
  datasets: [{
      data: verfification,
      backgroundColor: [
          'rgba(54, 162, 235, 0.5)',  // Blue color with transparency
          'rgba(75, 192, 192, 0.5)',  // Green color with transparency
          'rgba(255, 99, 132, 0.5)',  // Red color with transparency
      ],
      borderColor: [
          'rgba(54, 162, 235, 1)',    // Blue color
          'rgba(75, 192, 192, 1)',    // Green color
          'rgba(255, 99, 132, 1)',    // Red color
      ],
      borderWidth: 1
  }]
};
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};
export default PieChart;