// ./components/LineChart.js

import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const VisitLineChart = ({dateLabels, dataCount, label}) => {

  const data =  {
        labels: dateLabels,
        datasets: [{
            label: label,
            backgroundColor: "rgba(54, 162, 235, 1)", // Blue color
            borderColor: "rgba(54, 162, 235, 1)",
            data:dataCount,
        }
      ],
    }
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default VisitLineChart;