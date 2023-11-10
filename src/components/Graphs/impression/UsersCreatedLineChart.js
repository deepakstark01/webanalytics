// ./components/LineChart.js

import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";



const LineChart = ({existing_u, new_u, labels, existing_u_count, new_u_count}) => {

  const data =  {
        labels: labels,
        datasets: [{
            label: "User Created Accounts",
            backgroundColor: "rgba(54, 162, 235, 1)", // Blue color
            borderColor: "rgba(54, 162, 235, 1)",
            data:   existing_u_count,
        }
      ],
    }
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;