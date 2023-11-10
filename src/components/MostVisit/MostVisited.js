import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Stat, StatNumber, StatArrow } from "@chakra-ui/react";

function MostVisited({ topVisit }) {
  return (
    <Box boxShadow={3} borderRadius={8}>
      <Card>
        <CardContent>
          {topVisit.map((screenData, index) => (
            <div
              className="flex-none flex justify-between items-center"
              key={index}
            >
              <Typography component="div">
                <span>{index + 1}</span> {/* Display index */}
                <span className="ml-2">{screenData.screen}</span>{" "}
                {/* Display screen name */}
              </Typography>
              <div className="flex items-center">
                <Stat>
                  <StatArrow type="increase" />
                  <StatNumber>{screenData.sum}</StatNumber>
                </Stat>
              </div>
            </div>
          ))}
        </CardContent>
        {/* <CardActions>
          <Button size="small">See More</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}

export default MostVisited;
