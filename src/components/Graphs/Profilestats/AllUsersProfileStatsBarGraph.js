import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const AllUsersProfileStats = ({ profiledata }) => {
  const data = {
    labels: profiledata['profilelabel'],
    datasets: [
      {
        label: "Profile Stats",
        backgroundColor: [
          '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
          '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ],
        borderColor: "rgb(255,255,255)",
        data: profiledata['profileCount'],
      },
    ],
  };

  // Bar chart options 
 
  const  barOptions  = {
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
        animateRotate: true,
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
        position: "top", // Set the legend position to the right of the chart
        align: "start", // Center the legend
      },
    },
  };
 
  return (
    <>
      <div>
        <Bar data={data}  />
      </div>
    </>
  );
};

export default AllUsersProfileStats;
