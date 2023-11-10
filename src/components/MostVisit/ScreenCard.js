import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Stat, StatArrow } from "@chakra-ui/react";
function ScreenCard({screenTitle, visitCount, cardTitle}) {
  return (
    <Box boxShadow={3} borderRadius={8}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {cardTitle}
          </Typography>
          <Typography variant="h6" component="div">
            {screenTitle}
          </Typography>

          <Typography variant="h6" >
            <div className="flex-none h6 flex justify-between items-center">
              Impression : {visitCount}
              
              <Stat>
                <StatArrow type="increase" />
              </Stat>
            </div>
          </Typography>
        {/* <CardActions>
          <Button size="small">See More</Button>
        </CardActions> */}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ScreenCard;
