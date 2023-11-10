import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import "./VisitTable.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Table, Input, Button, Space } from "antd";
const { Search } = Input;
export const downloadExcel = (columns, Data, filename) => {
  // Extract data for the specified columns
  console.log({columns});
  console.log({Data});
  const filteredData = Data.map((item) => {
    const filteredItem = {};
    columns.forEach((column) => {
      // If the column selector is a function, call it to get the data
      if (typeof column.selector === 'function') {
        filteredItem[column.name] = column.selector(item);
      } else {
        filteredItem[column.name] = item[column.selector];
      }
    });
    return filteredItem;
  });
  // Create an Excel worksheet and workbook
  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Trigger the download
  XLSX.writeFile(workbook, filename+'.xlsx');
};
function EventTable({ users, selectedOp }) {
  const [Data, setFilledData] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (value) => {
    const filtered = users.filter((user) =>
      user.FullName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const allAttributes = [
    // 'ProfileImage',
    "FullName",
    "TimeStamp",
    "Email",
    "Phone",
    // 'TimeSpent'
  ];

  const columns = allAttributes.map((attribute) => ({
    id: `column-${attribute}`,
    name: attribute,
    selector: (row) => {
      if (attribute === "Event") {
        if (row.Event.automartz_seller_name) {
          return `${row.Event.automartz_looking_for} ${row.Event.automartz_seller_name}`;
        } else if (row.Event.timeSpent && row.Event.event_name) {
          return `Time Spent: ${row.Event.timeSpent}, Event Name: ${row.Event.event_name}`;
        } else {
          return "Data missing";
        }
      }
      return row[attribute];
    },
    sortable: true,
  }));

  const event = users[0]?.Event; // Assuming 'users' is an array, get the event from the first user as an example

  if (event) {
    if (event.timeSpent || event.event_name) {
      columns.push(
        {
          id: "column-timeSpent",
          name: "Time Spent",
          key: "Time Spent",
          selector: (row) => row.Event.timeSpent,
          sortable: true,
        },
        {
          id: "column-eventName",
          name: "Event Name",
          key: "event_name",
          selector: (row) => {
            if (row.Event.automartz_looking_for) {
              return `${row.Event.automartz_looking_for} ${row.Event.automartz_seller_name}`;
            } else if (row.Event.automartz_seller_name) {
              return `${row.Event.automartz_seller_name}`;
            } else {
              return row.Event.event_name;
            }
          },
          sortable: true,
        }
      );
    }

    if (event.automartz_seller_id) {
      columns.push({
        id: "column-automartz_seller_name",
        name: "Seller Name",
        key: "seller_name",
        selector: (row) => row.Event.automartz_seller_name,
        sortable: true,
      });
    }

    if (event.automartz_looking_for) {
      columns.push({
        id: "column-automartz_looking_for",
        name: "Looking For",
        key: "looking_for",
        selector: (row) => row.Event.automartz_looking_for,
        sortable: true,
      });
    }
   

    columns.push({
      id: "column-product-category",
      name: "Product Category",
      key: "product_category",
      selector: (row) => row.Event.product_category,
      sortable: true,
    });

    // if (event.product_query) {
      columns.push({
        id: "column-product-query",
        name: "Product Query",
        key: "product_query",
        selector: (row) => row.Event.product_query,
        sortable: true,
      });
    // }

    if (event.brand) {
      columns.push({
        id: "column-brand",
        name: "Brand",
        key: "brand",
        selector: (row) => row.Event.brand.join(", "),
        sortable: true,
      });
    }
    if (event.model) {
      columns.push({
        id: "column-model",
        name: "Model",
        key: "model",
        selector: (row) => row.Event.model.join(", "),
        sortable: true,
      });
    }
    if (event.vtype) {
      columns.push({
        id: "column-vtype",
        name: "VType",
        key: "vtype",
        selector: (row) => row.Event.vtype,
        sortable: true,
      });
    }
    if (event.ftype) {
      columns.push({
        id: "column-ftype",
        name: "ftype",
        selector: (row) => row.Event.ftype.join(", "),
        sortable: true,
      });
    }
  }
  useEffect(() => {
    if (users) {
      // console.log(users)
      setFilledData(users);
    }
  }, );
 
  



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
      <button class= "mb-8 ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>downloadExcel(columns, Data,selectedOp)}>Download Excel</button>
      </div>

    </>
  );
}
export default EventTable;
