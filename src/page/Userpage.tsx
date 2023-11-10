import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Cards/Card";
import { PiUserListDuotone } from "react-icons/pi";
import AllUsersProfileStats from "../components/Graphs/Profilestats/AllUsersProfileStatsBarGraph";
import NotFilledUser from "../components/Graphs/Profilestats/NotFIlledUser";
import AllUsersProfilePie from "../components/Graphs/Profilestats/AllUsersProfilePie";
import TableProf from "../components/Table/proftables";
import LoadingComponent from "../components/Loader";
import loadingAnim from "../lotties/loader.json";
import { requestOption } from "../components/cookieUtils";
import { apiurl } from "./url";
const UserPage = () => {
  const [userProfileData, setUserProfileData] = useState<any[]>([]);
  const [profPartilydata, setUserPartilydata] = useState<any[]>([]);
  const [profileIncompleted, setProfIncompleteData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${apiurl}/usersprofile`, requestOption("GET"))
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          alert("Please log in");
          window.location.href = "/login";
        }
        // console.log(data);
        else {
          setUserProfileData(data["data"]);
          setUserPartilydata(data["partiallyFilled"]);
          setProfIncompleteData(data["IncompleteFilled"]);
        }
      });
  }, []);

  return (
    <div>
        <div className="content-wrapper">
      {userProfileData?.length!=0? (
        
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <Card
                  title="Users Filled these entry"
                  Cardicon={PiUserListDuotone}
                >
                  <AllUsersProfileStats profiledata={userProfileData} />
                  {/* <AllUsersProfilePie profiledata={userProfileData} />  */}
                </Card>
              </div>
              <div className="col-lg-4">
                <Card title="Users profile stats" Cardicon={PiUserListDuotone}>
                  <AllUsersProfilePie profiledata={userProfileData} />
                </Card>
              </div>
              <div className="card mb-3">
                <div className="card-header">
                  <PiUserListDuotone /> Users
                </div>

                <div className="card-body">
                  <h3>Users Partially Filled Data</h3>
                  <TableProf users={profPartilydata} filename={"partially.xlsx"} />
                </div>
                <div className="card-footer small text-muted">
                  Updated Now few sec ago
                </div>
              </div>

              <div className="col-lg-8">
                <Card
                  title="Incomplete Feilds Profile"
                  Cardicon={PiUserListDuotone}
                >
                  <NotFilledUser profiledata={userProfileData} />
                </Card>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <PiUserListDuotone /> Users
                </div>
                <div className="card-body">
                  <h3>Users Incomplete Data</h3>
                  <TableProf users={profileIncompleted}  filename={"incomplete.xlsx"}/>
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
            <p className="mt-0.1">Please wait a few seconds...</p>
          </div>
        </div>
      )}
      
      </div>
    </div>
  );
};

export default UserPage;
