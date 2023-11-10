
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Userpageintercation = ({existing_u, new_u, labels, existing_u_count, new_u_count}) => {
 
  const data = {
    labels: labels,
    datasets: [
      {
        label: "User Created Accounts",
        backgroundColor: "rgba(54, 162, 235, 1)", // Blue color
        borderColor: "rgba(54, 162, 235, 1)",
        data: existing_u_count,
      },
      // {
      //   label: "New Visitors",
      //   backgroundColor: "rgba(75, 192, 192, 1)", // Green color
      //   borderColor: "rgba(75, 192, 192, 1)",
      //   data:new_u_count,
      // },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default Userpageintercation;
