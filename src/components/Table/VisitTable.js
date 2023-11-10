import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import "./VisitTable.css";
import { downloadExcel } from "./eventTable";
function TableProf({ users , filename }) {
  const [Data, setFilledData] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const allAttributes = [
    // 'ProfileImage',
    "FullName",
    "Email",
    "TimeStamp",
    "TimeSpent",
  ];

  const columns = allAttributes.map((attribute) => ({
    id: `column-${attribute}`, // Assigning a unique ID to each column
    name: attribute,
    selector: (row) => row[attribute],
    sortable: true,
  }));

  useEffect(() => {
    if (users) {
      // console.log(users)
      setFilledData(users);
    }
  }, [users]);

  return (
    <>
      <div>
        <DataTable
          columns={columns}
          data={Data}
          striped
          responsive
          highlightOnHover
          pagination
        />

        <button
          class="mb-8 ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded inline-flex items-center"
          onClick={() => downloadExcel(columns, Data,filename)}
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>Download Excel</span>
        </button>
      </div>
    </>
  );
}

export default TableProf;
