import React from "react";
import { Progress, Space } from "antd";

const Circulardata = ({color, percent}) => {
  return (
    <div>
      {" "}
      <Space wrap>
        <Progress type="dashboard" strokeColor={color} percent={percent} />
      </Space>
    </div>
  );
};

export default Circulardata;
