import React from "react";
import { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { requestOption } from "../../cookieUtils";
import { apiurl } from "../../../page/url";

function FuelHistory ()  {
    const [fuelhistory,setfuelHistory] = useState({});
    useEffect(() => {
      fetch(`${apiurl}/vehiclefuel`, requestOption("GET"))
      .then(res => res.json())
      .then(data => {
        if (data.detail) {
          alert("Please log in session exipred");
          window.location.href = "/login";
        } 
        // console.log(data);
        setfuelHistory(data);
        // console.log("vehicle", fuelhistory);
  });
  }, []);
    const options={
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Number of Users',
          },
        },
      },
      animation: {
        animateScale: true,
        animateRotate: true
    },
      plugins: {
        title: {
          display: true,
          text: 'Number of Users Actively Refueling by Hour',
        },
      },
    };
    const data = {
      labels: fuelhistory["daylabel"],
      datasets: [
        {
          label: "Users Actively Refueling by Day Stats",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: fuelhistory["fueluser"],
        },
      ], 
    };
    
    return (
      <div>
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default FuelHistory;