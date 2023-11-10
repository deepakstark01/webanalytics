import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Cards/Card";
import CustomTable from "../components/Table/UserTable";
import BarChartVisitor from "../components/Graphs/impression/UsersCreated";
import LineChart from "../components/Graphs/impression/UsersCreatedLineChart";
import DonughtUser from "../components/Graphs/UsersVerifcation/DonughtUser";
import UserLocation from "../components/Graphs/userLocation/UserLocation";
import ProjectionIncreaseLineChart from "../components/Graphs/impression/ProjectIncrease";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PiUserListDuotone } from "react-icons/pi";
import { FaUserClock } from "react-icons/fa";
import { VscLocation } from "react-icons/vsc";
import { BiUserCheck } from "react-icons/bi";
import LoadingComponent from "../components/Loader";
import loadingAnim from "../lotties/loader.json";
import { getCookie, requestOption } from "../components/cookieUtils";
import { apiurl } from "./url";

function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [existingUsers, setExistingUsers] = useState<any[]>([]);
  const [newUsers, setNewUsers] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [existingUsersCount, setExistingUsersCount] = useState<any[]>([]);
  const [newUsersCount, setNewUsersCount] = useState<any[]>([]);
  const [VerifiedUsers, setVerifiedUsers] = useState<any[]>([]);
  // const [increase_percentage, setPercentege] = useState<any[]>([]);
  const [projected_labels, setProjected_labels] = useState<any[]>([]);
  const [projected_counts, setProjected_counts] = useState<any[]>([]);
  useEffect(() => {
    const accessToken = getCookie('access_token');
    // console.log(accessToken);
    // const requestOptions : RequestInit =  {
    //   method: 'GET', // or 'POST' or other HTTP methods
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`, // Include your access token
    //     'Content-Type': 'application/json',
    //   },
    //   // credentials: 'include', // Include cookies in the request
    // };
    // const requestOptions = requestOption();
    // fetch(`${apiurl}/getuser`, requestOption("GET"))

    if (!accessToken) {
      alert("Please log in");
      window.location.href = "/login";
    }

    fetch(`${apiurl}/getuser`, requestOption('GET'))
      .then((res) => res.json())
      .then((data) => { 
        if (data.detail) {
          alert("Please log in");
          window.location.href = "/login";
        }
        const {
          existing_users,
          new_users,
          labels,
          existing_users_count,
          new_users_count,
          verificationcounts,
          projected_labels,
          projected_counts,
        } = data;
        setVerifiedUsers(verificationcounts);
        setUsers([...existing_users, ...new_users]);
        setExistingUsers(existing_users);
        setNewUsers(new_users);
        setNewUsers(newUsersCount);
        setLabels(labels);
        setExistingUsersCount(existing_users_count);
        // setPercentege(increase_percentage);
        setProjected_labels(projected_labels);
        setProjected_counts(projected_counts);
      });
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        {users?.length!=0 ? (
          
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <Card
                  title="Users Account created"
                  Cardicon={PiUserListDuotone}
                >
                  <BarChartVisitor
                    existing_u={existingUsers}
                    existing_u_count={existingUsersCount}
                    new_u={newUsers}
                    new_u_count={newUsersCount}
                    labels={labels}
                  />
                  <LineChart
                    existing_u={existingUsers}
                    existing_u_count={existingUsersCount}
                    new_u={newUsers}
                    new_u_count={newUsersCount}
                    labels={labels}
                  />
                </Card>
              </div>
              <div className="col-lg-4">
                <Card title="Users Verification" Cardicon={BiUserCheck}>
                  {<DonughtUser verfification={VerifiedUsers} />}
                </Card>
              </div>
              <div className="col-lg-8">
                <Card
                  title="Bounce Back Users register Projection"
                  Cardicon={PiUserListDuotone}
                >
                  {/* <ProjectionIncreaseLineChart labels={labels} increase_percentage={increase_percentage} projected_labels={projected_labels} projected_counts={projected_counts} /> */}
                  <ProjectionIncreaseLineChart
                    labels={labels}
                    projected_labels={projected_labels}
                    projected_counts={projected_counts}
                  />
                </Card>
              </div>

              <div className="col-lg-8">
                <Card title=" Users City wise" Cardicon={VscLocation}>
                  {<UserLocation />}
                </Card>
              </div>
              <div className="card mb-3">
                <div className="card-header">
                  <FaUserClock /> Users Record
                </div>
                <div className="card-body">
                  <CustomTable users={users} />
                </div>
                <div className="card-footer small text-muted">
                  Updated Now few sec ago
                </div>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="loading-wrapper flex justify-center items-center h-screen">
            <div className="text-center">
              <LoadingComponent animationData={loadingAnim} size={500} />
              <p>Please wait a few seconds...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
