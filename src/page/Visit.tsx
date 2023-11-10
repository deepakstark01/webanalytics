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
import { useState, useEffect } from "react";
import VisitTable from "../components/Table/VisitTable";
import ScreenCard from "../components/MostVisit/ScreenCard";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import MostVisted from "../components/MostVisit/MostVisited";
import LoadingComponent from "../components/Loader";
import loadingAnim from "../lotties/loader.json";
import AndroidData from "../components/AndroidData";
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

const Visit = () => {
  const [users, setUser] = useState<User[]>([]);
  const [VisitData, setVisitData] = useState<VisitData | null>(null);
  const [ScreenData, setScreenData] = useState<any[]>([]);

  useEffect(() => {
    setSelectedOption("home");
    fetch(`${apiurl}/visits`, requestOption("GET"))
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          alert("Please log in");
          window.location.href = "/login";
        } else {
          setVisitData(data["visit"]);
          setScreenData(data["screen"]);
          setUser(data["visit"]["Home"]["users"]);
          setSelectedOption("Home");
        }
      });
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  const [topScreens, setTopScreens] = useState<
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

  const { filteredDateData, filteredCountData } =
    updateSelectedDatesAndFilterData(
      selectedStartDate,
      selectedEndDate,
      dateData,
      countData
    );

  useEffect(() => {
    setSelectedStartDate(dateData[0]);
    setSelectedEndDate(dateData[dateData.length - 1]);
    getMostVisited(ScreenData);
  }, [dateData]);

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
          // countData
        );
        const sum: number = resultval.filteredCountData?.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        screensWithSums.push({ screen: selectVal, sum: sum });
      }
    }
    screensWithSums.sort((a, b) => b.sum - a.sum);
    setTopScreens(screensWithSums.slice(0, 10));
    return topScreens;
  }

  useEffect(() => {
    getMostVisited(ScreenData);
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div>
      <div className="content-wrapper ">
        {VisitData?.[selectedOption] ? (
          <div className="container-fluid mt-4">
            Clicks
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

                {VisitData?.[selectedOption] && (
                  <AndroidData
                    dateData={filteredDateData}
                    countData={filteredCountData}
                    selectedOption={selectedOption}
                    label={selectedOption}
                  />
                )}
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
                  Top Most Click Screen
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

              <p className="mt-0.1">Please wait a few seconds...</p>
            </div>
          </div>
        )}
        <Box>
          <VisitTable users={users} filename={selectedOption} />
        </Box>
      </div>
    </div>
  );
};

export default Visit;
