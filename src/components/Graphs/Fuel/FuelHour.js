import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

function FuelHour() {
  const [fuelhistory, setFuelHistory] = useState({});
  const [viewType, setViewType] = useState("day"); // "day", "month", or "time"
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const currentDate = new Date(); // Get the current date
    const formattedDate = currentDate.toISOString().slice(0, 10); // Convert to 'YYYY-MM-DD' format

    fetch('/vehiclefuel')
      .then(res => res.json())
      .then(data => {
        
        if (data.message && data.message === "Unauthorized") {
          alert("Please log in");
          window.location.href = "/login";
        } 
        // Ensure the fuelhistory state contains all required properties
        setFuelHistory(prevState => ({
          ...prevState,
          daylabel: data.daylabel || [],     // Empty array if data.daylabel is undefined
          fueluser: data.fueluser || [],     // Empty array if data.fueluser is undefined
          monthlabel: data.monthlabel || [], // Empty array if data.monthlabel is undefined
          fueluser_month: data.fueluser_month || [], // Empty array if data.fueluser_month is undefined
          timelabel: data.timelabel || [],   // Empty array if data.timelabel is undefined
          fueluser_time: data.fueluser_time || [], // Empty array if data.fueluser_time is undefined
        }));
      });
  }, []);

  const fetchFuelData = (date) => {
    const url = date ? `/vehiclefuel?date=${date}` : "/vehiclefuel";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message === "Unauthorized") {
          alert("Please log in");
          window.location.href = "/";
        } 
        setFuelHistory(data);
      });
  };

  // useEffect to fetch data when selectedDate changes
  useEffect(() => {
    if (viewType === "time" && selectedDate) {
      fetchFuelData(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const handleViewChange = (selectedView) => {
    setViewType(selectedView);
    setSelectedDate(null); // Reset selectedDate when changing view
    if (selectedView !== "time") {
      fetchFuelData(); // Fetch data for non-'Time' views
    }
  };

  const getLabels = () => {
    switch (viewType) {
      case "day":
        return fuelhistory.daylabel;
      case "month":
        return fuelhistory.monthlabel;
      case "time":
        return fuelhistory.timelabel;
      default:
        return [];
    }
  };

  const getData = () => {
    switch (viewType) {
      case "day":
        return fuelhistory.fueluser;
      case "month":
        return fuelhistory.fueluser_month;
      case "time":
        return fuelhistory.fueluser_time;
      default:
        return [];
    }
  };

  const options = {
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
    labels: getLabels(),
    datasets: [
      {
        label: "Users Actively Refueling",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: getData(),
      },
    ],
  };

  return (
    <div>
      <div>
        {/* Your buttons for "Day", "Month", and "Time" views */}
        <button onClick={() => handleViewChange("day")} disabled={viewType === "day"}>Day</button>
        <button onClick={() => handleViewChange("month")} disabled={viewType === "month"}>Month</button>
        <button onClick={() => handleViewChange("time")} disabled={viewType === "time"}>Time</button>

        {/* Date picker for "Time" view */}
        {viewType === "time" && (
          <input type="date" onChange={handleDateChange} />
        )}
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default FuelHour;
