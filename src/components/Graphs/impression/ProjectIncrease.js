import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";



const ProjectionIncreaseLineChart = ({ labels,  projected_labels,projected_counts}) => {

  const data =  {
    labels: projected_labels,
        datasets: [
        //   {
        //     label: "Users Increasing Percentage",
            
        //     backgroundColor: "rgba(63, 255, 127, 1)", // Green color
        //     borderColor: "rgba(54, 162, 235, 1)",
        //     data:   increase_percentage,
        // },
        {
            label: "Users Projection",
            
            backgroundColor: "rgba(241, 90, 34,1)", // Orange color
            borderColor: "rgba(54, 162, 235, 1)",
            data:   projected_counts,
        }
      ],
    }
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default ProjectionIncreaseLineChart;