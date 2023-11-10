
import React from "react";
import { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { requestOption } from "../../cookieUtils";
import { apiurl } from "../../../page/url";


function BarChart ()  {
  const [userCity, setUserCity] = useState({});
  useEffect(() => {
  
    fetch(`${apiurl}/userCity`, requestOption("GET"))
    .then(res => res.json())
    .then(data => {
      setUserCity(data);
});
}, []);
  const labels = userCity["cities"]
  // console.log("data => ",labels);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Users Per City",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: userCity["userCounts"],
      },
    ], 
  };
  
  return (
    <div>
      <Bar data={data}  />
    </div>
  );
};

export default BarChart;