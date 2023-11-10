import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Select,
  SimpleGrid,
  Stat,
  StatArrow,
} from "@chakra-ui/react"; // Import Chakra UI components
// import Lottie from "lottie-react";
import { useState, useEffect } from "react";
import DateFilter from "../components/AndroidData";
import VisitTable from "../components/Table/VisitTable";
import ScreenCard from "../components/MostVisit/ScreenCard";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import MostVisted from "../components/MostVisit/MostVisited";
import loadingAnim from "../lotties/loader.json";
import LoadingComponent from "../components/Loader";
import EventTable from "../components/Table/eventTable";
import { requestOption } from "../components/cookieUtils";
import { apiurl } from "./url";
// import DatePicker from "react-datepicker";
interface User {
  Email: string;
  FullName: string;
  Intro: string;
  Mobile: string;
  about: string;
  age: string;
  gender: string;
  occupation: string;
  qualification: string;
}

interface VisitDataEntry {
  dates: string[];
  visit_count: number[];
  users: User[];
}

interface VisitData {
  [key: string]: VisitDataEntry;
}

const Actions = () => {
  const [users, setUser] = useState<User[]>([]);
  const [VisitData, setVisitData] = useState<VisitData | null>(null);
  const [ScreenData, setScreenData] = useState<any[]>([]);

  useEffect(() => {
    setSelectedOption("automartz_product_search");
    fetch(`${apiurl}/event`, requestOption("GET"))
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Unauthorized") {
          alert("Please log in");
          window.location.href = "/login";
        } else {
          setVisitData(data["visit"]);
          setScreenData(data["screen"]);
          // console.log("data => ", data);

          console.log("screen ", ScreenData);
          console.log("event ", VisitData);
          // setUser(data["visit"]["automartz_product_search"]["users"]);
          // setSelectedOption("automartz_product_search");
        }
      });
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const [topScreens, setTopScreens] = useState<
    Array<{ screen: string; sum: number }>
  >([]);
  const [EventScreens, setEventScreens] = useState<
    Array<{ screen: string; sum: number }>
  >([]);
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (VisitData !== null) {
      setUser(VisitData[selectedValue].users);
    }
    setSelectedOption(selectedValue);
  };

  function updateSelectedDatesAndFilterData(
    startDate: string,
    endDate: string,
    dateData: string[],
    countData: number[]
  ) {
    const startIndex = dateData.indexOf(startDate);
    const endIndex = dateData.indexOf(endDate) + 1;

    const filteredDateData = dateData.slice(startIndex, endIndex);
    const filteredCountData = countData.slice(startIndex, endIndex);

    return { filteredDateData, filteredCountData };
  }
  
  // Inside your component
  const dateData = VisitData?.[selectedOption]?.dates || [];
  const countData = VisitData?.[selectedOption]?.visit_count || [];
  const [selectedStartDate, setSelectedStartDate] = useState(dateData[0]);
  const [selectedEndDate, setSelectedEndDate] = useState(
    dateData[dateData.length - 1]
    );

    
   


    useEffect(() => {
      let maxDateDataLength = 0;
      let screenWithMaxDateData = "";
    
      // Iterate through the available screen options
      for (const option in VisitData) {
        if (Object.hasOwnProperty.call(VisitData, option)) {
          const optionData = VisitData[option];
          const optionDateData = optionData?.dates || [];
    
          // Check if this option has a longer dateData array
          if (optionDateData.length > maxDateDataLength) {
            maxDateDataLength = optionDateData.length;
            screenWithMaxDateData = option;
          }
        }
      }
    
      // Set the screen with the maximum dateData length as the selected option
      setSelectedOption(screenWithMaxDateData);
    }, [VisitData]);

    useEffect(() => {
      setSelectedStartDate(dateData[0]);
      setSelectedEndDate(dateData[dateData.length - 1]);
      getMostVisited(ScreenData);
    }, [dateData]);
    
  const { filteredDateData, filteredCountData } =
  updateSelectedDatesAndFilterData(
    selectedStartDate,
    selectedEndDate,
    dateData,
    countData
  );
  useEffect(() => {
    // Ensure VisitData is available and selectedOption is set
    if (VisitData && selectedOption) {
      getMostVisited(ScreenData);
    }
  }, [VisitData, selectedOption, selectedStartDate, selectedEndDate]);
  

useEffect(() => {
  // Log topScreens whenever it changes
  console.log(topScreens);
}, [topScreens]);

function getMostVisited(screenlist: string[]) {
  const screensWithSums: Array<{ screen: string; sum: number }> = [];

  for (let index = 0; index < screenlist.length; index++) {
    const selectVal: string = screenlist[index];
    const visitDates = VisitData?.[selectVal]?.dates;
    const visitCount = VisitData?.[selectVal]?.visit_count;

    if (visitDates !== undefined && visitCount !== undefined) {
      const resultval = updateSelectedDatesAndFilterData(
        selectedStartDate,
        selectedEndDate,
        visitDates,
        visitCount
      );
     
      const sum: number = resultval.filteredCountData?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      screensWithSums.push({ screen: selectVal, sum: sum });
      console.log(selectVal, " = ",  resultval.filteredCountData);
    }
  }

  screensWithSums.sort((a, b) => b.sum - a.sum);
  setTopScreens(screensWithSums.slice(0, 10));
}

useEffect(() => {
  // Ensure VisitData is available and selectedOption is set
  if (VisitData && selectedOption) {
    getMostVisited(ScreenData);
  }
}, [VisitData, selectedOption, selectedStartDate, selectedEndDate]);
  return (
    <div>
      <div className="content-wrapper ">
        {VisitData?.[selectedOption] ? (
          <div className="container-fluid mt-4">
            Events
            <Box>
              Android Screens
              <Select value={selectedOption} onChange={handleOptionChange}>
                {ScreenData.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Box>
            <div className="row flex-none ">
              <div className="col-lg-8">
                <Box display={"flex"}>
                  <Box display={"flex"} marginRight={"2"}>
                    <Button
                      marginRight={"2"}
                      onClick={() => setSelectedStartDate(dateData?.[0])}
                    >
                      Pick Start Date
                    </Button>
                    <Select
                      value={selectedStartDate}
                      onChange={(e) => {
                        setSelectedStartDate(e.target.value);
                      }} // Move the state update here
                    >
                      {dateData?.map((date) => (
                        <option key={date}>{date}</option>
                      ))}
                    </Select>
                  </Box>
                  <Box display={"flex"}>
                    <Button
                      marginRight={"2"}
                      onClick={() =>
                        setSelectedEndDate(dateData?.[dateData.length - 1])
                      }
                    >
                      Pick End Date
                    </Button>
                    <Select
                      value={selectedEndDate}
                      onChange={(e) => setSelectedEndDate(e.target.value)} // Move the state update here
                    >
                      {dateData?.map((date) => (
                        <option key={date}>{date}</option>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <div className="row">
                  
                  {topScreens.map((screen, index) => (
                    
                    <div
                      key={index}
                      className="col-4 bg-blue-300 rounded-lg p-2 w-64 h-48 mt-2"
                    >
                      <ScreenCard
                        visitCount={
                          // VisitData?.[selectedOption]?.visit_count[
                          //   VisitData?.[selectedOption]?.visit_count.length - 1
                          // ]
                          screen.sum
                        }
                        screenTitle={screen.screen} // Use the screen title from screensWithSums
                        cardTitle={""}
                      />
                    </div>
                  ))}


                  
                </div>

                {/* {VisitData?.[selectedOption] && (
                  <DateFilter
                    dateData={filteredDateData}
                    countData={filteredCountData}
                    selectedOption={selectedOption}
                    label={selectedOption}
                  />
                )} */}
              </div>
              <div>
                <div className="bg-yellow-300 rounded-lg p-2 w-64 h-36 mt-2">
                  <ScreenCard
                    visitCount={
                      VisitData?.[selectedOption]?.visit_count[
                        VisitData?.[selectedOption]?.visit_count.length - 1
                      ]
                    }
                    screenTitle={selectedOption}
                    cardTitle={"Users click today"}
                  />
                </div>
                <div className="mt-2">
                  Top Most Event Screen
                  <div className="bg-green-300 rounded-lg p-2  mt-2">
                    <div className="overflow-auto w-64 h-48 ">
                      <MostVisted
                        topVisit={topScreens}
                        // cardTitle={"Most visted Screen"}
                      />
                    </div>
                  </div>
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
        
        <Box>
          <EventTable users={users} selectedOp={selectedOption}/>
        </Box>
      </div>
    </div>
  );
};

export default Actions;
