// ./components/LineChart.js

import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const WebLineChart = ({dateLabels, dataCount, label,unkownData}) => {
  console.log("unkown", unkownData);
  const data =  {
        labels: dateLabels,
        datasets: [{
            label: label+" Exisinig",
            backgroundColor: "rgba(54, 162, 235, 1)", // Blue color
            borderColor: "rgba(54, 162, 235, 1)",
            data:dataCount,
        }
        , 
        {
            type: 'line',
            label: 'Unkown',
            data: unkownData,
            fill: false,
            backgroundColor: "green",
            borderColor: "#03ac13" // Change the line color here
          }
      ],
    }
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default WebLineChart;