import React, { useEffect, useState } from "react";
// import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from "../components/Cards/Card";
import FuelHistory from "../components/Graphs/Fuel/Fuel";
import FuelHour from "../components/Graphs/Fuel/FuelHour";
import DataCard from "../components/Cards/DataCard";
import { BsFillFuelPumpFill } from "react-icons/bs";
import VehcileLogTable from "../components/Table/VehcileLogTable";
import UserAverage from "../components/Table/UserAverage";
import DatePicker from "../components/calender/DatePicker";
import RadioCheckYear from "../components/radio/RadioCheckYear";
import { getCookie, requestOption } from "../components/cookieUtils";
import { apiurl } from "./url";
interface User {
  Email: string;
  Name: string;
  Intro: string;
  Mobile: string;
  about: string;
  age: string;
  gender: string;
  occupation: string;
  qualification: string;
}

interface Data {
  countRegisterd: number;
  countNotRegister: number;
  notRegistered: User[];
  Registered: User[];
  fuelTrip:User[];
}
const UserVehicleLog = () => {
  const [data, setData] = useState<Data | null>(null);
  const [activeSection, setActiveSection] = useState("registered");
  const [selectedValue, setSelectedValue] = useState<Boolean>(true); 
  
  function fetchDataAndSetData(targetMonth: number, targetYear: number, yearlyFlag: Boolean ) {
    const apiUrl = `${apiurl}/getuservehiclelog?target_month=${targetMonth}&target_year=${targetYear}&yearlyFlag=${yearlyFlag}`;
    
    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`,
        'Content-Type': 'application/json',
        'access-control-allow-credentials': 'true',
        Referer: 'https://automartz.vercel.app/',
        Origin: 'https://automartz.vercel.app',
        Connection: 'keep-alive'
      }
    })
      .then(response => {
        const data = response.data;
        
        if (data.detail) {
          alert("Please log in");
          window.location.href = "/login";
        }
        console.log("on Fetch time data =>", data);
        setData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  
  
  //  function fetchDataAndSetData(targetMonth: number, targetYear: number, yearlyFlag: Boolean ) {
    
  //     fetch(`${apiurl}/getuservehiclelog?target_month=${targetMonth}&target_year=${targetYear}&yearlyFlag=${yearlyFlag}`, requestOption("GET"))
  //     .then((res) => res.json())
  //     .then((data) => {

  //       if (data.detail) {
  //         alert("Please log in");
  //         window.location.href = "/login";
  //       }
  //       console.log("on Fetch time   data =>", data);
  //       setData(data);
  //     })
      
  // }
  // async function fetchDataAndSetData(targetMonth: number, targetYear: number, yearlyFlag: Boolean ) {
  //   try {
  //     const response = await  fetch(`${apiurl}/getuservehiclelog?target_month=${targetMonth}&target_year=${targetYear}&yearlyFlag=${yearlyFlag}`, requestOption("GET"));
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       if (errorData.message === "Unauthorized") {
  //         alert("Please log in");
  //         window.location.href = "/login";
  //       }
  //     } else {
  //       const data = await response.json();
  //       // console.log("on Fetch time   data =>", data);
  //       setData(data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      console.log(selectedDate.toString());
      const myDate = new Date(selectedDate.toString());
      const targetMonth = myDate.getMonth() + 1; // Adjust for zero-based month
      const targetYear = myDate.getFullYear();
      console.log("targetMonth", targetMonth, "targetYear", targetYear);
      fetchDataAndSetData(targetMonth, targetYear, false);
      // console.log("inside handel date change  data => ", data);
    }
  };
  const handelonRadioChange = (selectedVal: Boolean) => {
      
      setSelectedValue(selectedVal);
      console.log(selectedValue);
  };
  
  useEffect(() => {
    const today = new Date();
    const currentMonth= today.getMonth() + 1;
    const currentYear = today.getFullYear(); 
    console.log("currentMonth", currentMonth, "currentYear", currentYear);  
    fetchDataAndSetData(currentMonth,currentYear,selectedValue);
  }, [selectedValue]);

  const toggleSection = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div>
      <div className="content-wrapper mb-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <Card title="Fuel history" Cardicon={BsFillFuelPumpFill}>
                <FuelHistory />
              </Card>
            </div>
          </div>
          <div className="container mx-auto ">
           
              <div >
                <div >
                <h1>Fuel and Trip Users</h1>
                <div className="flex">

                <DatePicker onDateChange={handleDateChange} />
                <RadioCheckYear onRadioChange={handelonRadioChange}/>
                </div>
                </div>

                <UserAverage  results={data?.fuelTrip || []} />
              </div>
         
          </div>
          <div>
            <h1 className="decoration-2">Vehicle Log</h1>
            <div className="flex m-2">
              <div className="hover:rounded-lg hover:cursor-pointer hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..." onClick={() => toggleSection("registered")}>
                <DataCard
                  tag="Registered Users"
                  color="green"
                  percent={(
                    ((data?.countRegisterd || 0) /
                      ((data?.countRegisterd || 0) +
                        (data?.countNotRegister || 0))) *
                    100
                  ).toFixed(2)}
                  total={data?.countRegisterd || 0}
                />
              </div>
              <div className= "hover:rounded-lg hover:cursor-pointer hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ..." onClick={() => toggleSection("not-registered")} >
                <DataCard
                  tag="Not Registered"
                  color="red"
                  percent={(
                    ((data?.countNotRegister || 0) /
                      ((data?.countRegisterd || 0) +
                        (data?.countNotRegister || 0))) *
                      100 || 0
                  ).toFixed(2)}
                  total={data?.countNotRegister || 0}
                />
              </div>
            </div>
          </div>
          <div className="container mx-auto ">
            {activeSection === "registered" && (
              <div>
                <h1>Registered Users</h1>
                <VehcileLogTable results={data?.Registered} />
              </div>
            )}
            {activeSection === "not-registered" && (
              <div>
                <h1>Not Registered Users</h1>
                <VehcileLogTable results={data?.notRegistered} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVehicleLog;
