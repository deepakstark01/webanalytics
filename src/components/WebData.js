import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Select,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react"; // Import your UI components
import Card from "../components/Cards/Card";
import { PiUserListDuotone } from "react-icons/pi";
import VisitLineChart from "../components/Graphs/Analysis/VisitLineChart";
import WebLineChart from "./Graphs/Analysis/WebLineChart";
// const DateFilter = ({ selectedOption, dateData, countData, label }) => {
const WebData = ({
  dateData,
  countData,
  selectedOption,
  label,
  unkownCountdata
}) => {
  return (
    <Box>
      <StatGroup>
        <Stat>
          <StatLabel>{selectedOption} Screen visited</StatLabel>
          <StatNumber>
            {" "}
            {countData?.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )}{" "}
          </StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Events</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
      
        <WebLineChart
          dateLabels={dateData}
          unkownData={unkownCountdata}
          dataCount={countData}
          label={label}
        />
     
    </Box>
  );
};

export default WebData;
