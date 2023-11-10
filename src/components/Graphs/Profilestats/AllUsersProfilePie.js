import React from "react";
import { Bar, Pie } from "react-chartjs-2";

const AllUsersProfilePie = ({ profiledata }) => {
    // profiledata =profiledata['profdata'];
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


  // Pie chart options
  const pieOptions = {
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
            //   return `${label}: ${value} (${percentage})`;
              return `${label}:  (${percentage})`;
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
                //   text: `${label}: ${value} (${percentage})`,
                  text: `${label}: ${percentage}`,
                  pointStyle: 'circle',
                  fillStyle: dataset.backgroundColor[i],
                  hidden: isNaN(dataset.data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                  lineCap: 'round',
                  lineDash: [],
                  lineDashOffset: 0,
                  lineJoin: 'round',
                  lineWidth: 1,
                  strokeStyle: dataset.borderColor[i],
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
  const handleButtonClick = (label) => {
    // Add your action logic here based on the clicked label
    console.log(`Button clicked for label: ${label}`);
  };

  const getTotalCount = () => {
    return profiledata['profileCount'].reduce((acc, data) => acc + data, 0);
  };
  return (
   <>

        <Pie data={data} options={pieOptions} />

      {/* <Pie data={data} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {data.labels.map((label, index) => (
          <button
            key={index}
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              margin: '0 4px',
              cursor: 'pointer',
            }}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        ))}
      </div> */}
    </>
  );
};

export default AllUsersProfilePie;
