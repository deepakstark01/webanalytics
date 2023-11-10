import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { downloadExcel } from "./eventTable";
import generateAndDownloadExcel from "../../page/Util/generateAndDownloadExcel";

const { Search } = Input;

function CustomTable({ users}) {
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

  
  



  const columns = [
    {
      title: "Name",
      dataIndex: "FullName",
      key: "FullName",
      sorter: (a, b) => a.FullName.localeCompare(b.FullName),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone",
      dataIndex: "Mobile",
      key: "Mobile",
    },
    {
      title: "City",
      dataIndex: ["Address", "City"], // Access the "City" property within the "Address" object
      key: "City",
      sorter: (a, b) => {
        const cityA = (a.Address && a.Address.City) || ""; // Handle null Address or null City
        const cityB = (b.Address && b.Address.City) || ""; // Handle null Address or null City
        return cityA.localeCompare(cityB);
      },
    },
    {
      title: "New/Existing",
      dataIndex: "Type",
      key: "Type",
      filters: [
        { text: "New", value: "New" },
        { text: "Existing", value: "Existing" },
      ],
      onFilter: (value, record) => record.Type === value, // Add filtering function for New/Existing
    },
    {
      title: "Time Stamp",
      dataIndex: "CreatedTimeStamp",
      key: "CreatedTimeStamp",
      sorter: (a, b) => {
        const timestampA = new Date(a.CreatedTimeStamp);
        const timestampB = new Date(b.CreatedTimeStamp);
        return timestampA - timestampB;
      },
      render: (text) => text, // Convert timestamp to UTC string
    },
    {
      title: "Total Points",
      dataIndex: "Tpoints",
      key: "Tpoints",
      sorter: (a, b) => a.Tpoints - b.Tpoints,
    },
  ];

  return (
    <div>
      <Search
        placeholder="Search by Name"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={{
           // Number of items displayed per page
          total: filteredUsers.length, // Total number of items (required for pagination to work)
          showSizeChanger: true, // Show the option to change page size
          showQuickJumper: true, // Allow quick jumping to a specific page
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Display total item count
        }} // You can customize pagination options here
      />
       <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded inline-flex items-center"
          onClick={() =>
            generateAndDownloadExcel(columns, filteredUsers, "accountCreated.xlsx")
            // downloadExcel(columns, filteredUsers, "accountCreatd.xlsx")
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
  );
}

export default CustomTable;
