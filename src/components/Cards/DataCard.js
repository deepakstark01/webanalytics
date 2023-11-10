import React from "react";
import Circulardata from "./Circulardata";
import { Statistic } from 'antd';
const DataCard = ({ color, tag, percent, total }) => {

  return (
    <div className="text-black block max-w-sm p-6 m-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:borde  r-gray-700 dark:hover:bg-gray-700">
      <div className="md:flex">

        <div className="md:flex-shrink-0">
          <Circulardata color={color} percent={percent} />
        </div>

       
        <div className="p-8 flex flex-col">
          <div className={`uppercase tracking-wide text-sm  font-semibold`}>
            {tag} 
          </div>
          <div className="text-center w-full">

          <Statistic  value={total} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DataCard;
