import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { downloadExcel } from "./eventTable";
function TableProf({ users, filename }) {
  const [Data, setFilledData] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const allAttributes = [
    // 'ProfileImage',
    "FullName",
    "Email",
    "Mobile",
    "gender",
    "age",
    "about",
    "Intro",
    "qualification",
    "occupation",
  ];
  // const columns = allAttributes.map(attribute => ({
  //   name: attribute,
  //   selector: row => row[attribute], // Assuming the data keys are in lowercase
  //   sortable: true,
  // }));

  const columns = allAttributes.map((attribute) => ({
    id: `column-${attribute}`, // Assigning a unique ID to each column
    name: attribute,
    selector: (row) => row[attribute],
    sortable: true,
  }));

  const FiltterValue = [
    "ProfileImage",
    "FullName",
    "Email",
    "Mobile",
    "gender",
    "age",
    "about",
    "Intro",
    "qualification",
    "occupation",
    "Address",
    "City",
    "State",
    "Pincode",
  ];
  useEffect(() => {
    if (users) {
      setFilledData(users);
      // setIncompleteFilledData(users["IncompleteFilled"]);
    }
  }, [users]);

  const [selectedIndex, setSelectedIndex] = useState(1); // Setting default index to 1
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  // Handler function to update the selected index
  const handleAttributeToggle = (index) => {
    setSelectedIndex(index);
    setSelectedAttribute(FiltterValue[index]);
  };

  const dropdownStyles = {
    primary: {
      backgroundColor: "#0062cc", // Customize the color for the "primary" dropdown
    },
    secondary: {
      backgroundColor: "green", // Customize the color for the "secondary" dropdown
    },
    // Add more styles for other dropdowns if needed
  };
  return (
    <>
      <div className="flex">
        <Dropdown as={ButtonGroup} className="mb-3">
          <Dropdown.Toggle
            variant="primary"
            style={dropdownStyles.primary}
            id="dropdown-attributes"
          >
            {/* {selectedAttribute ? `${selectedAttribute} (Index: ${selectedIndex})` : 'Select Attributes'} */}
            {selectedAttribute ? `${selectedAttribute}` : "Select Attributes"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {FiltterValue.map((attribute, index) => (
              <Dropdown.Item
                key={attribute}
                onClick={() => handleAttributeToggle(index)}
              >
                {selectedAttributes.includes(attribute) ? (
                  <>&#9745;</>
                ) : (
                  <>&#9744;</>
                )}{" "}
                {attribute}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <button
          class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded inline-flex items-center"
          onClick={() =>
            downloadExcel(
              columns,
              Data[FiltterValue[selectedIndex]],
              filename + "-" + selectedAttribute + ".xlsx"
            )
          }
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

      <div>
        <DataTable
          columns={columns}
          data={Data[FiltterValue[selectedIndex]]}
          striped
          responsive
          highlightOnHover
          pagination
          className="dataTable"
        />
      </div>
    </>
  );
}

export default TableProf;
