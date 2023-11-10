import { useEffect, useState } from "react";
import qs from "qs";
import { Table } from "antd";
import { set } from "date-fns";

const VehcileLogTable = ({ results }) => {
  const [data, setData] = useState();
  const [columns, setColumns] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    if (results?.length) {
      setData(results);
      setLoading(false);
      if (results[0].VehiModel) {
        setColumns([
          {
            title: "Name",
            dataIndex: "Name",
            sorter: true,
            width: "20%",
            className: "ant-table-cell-outline", // Apply the custom CSS class
          },
          {
            title: "Email",
            dataIndex: "Email",
            className: "ant-table-cell-outline", // Apply the custom CSS class
          },
          {
            title: "Phone",
            dataIndex: "Mobile",
            className: "ant-table-cell-outline", // Apply the custom CSS class
          },
          {
            title: "Vehicle Brand",
            dataIndex: "Vehicle",
          },
          {
            title: "Vehicle Model",
            dataIndex: "VehiModel",
          },
          {
            title: "Vehicle Number",
            dataIndex: "VehiNumber",
          },
          {
            title: "Fuel Type",
            dataIndex: "FuelType",
          },
        ]);
      } else {
        setColumns([
          {
            title: "Name",
            dataIndex: "Name",
            sorter: true,
            width: "20%",
            className: "ant-table-cell-outline", // Apply the custom CSS class
          },
          {
            title: "Email",
            dataIndex: "Email",
            className: "ant-table-cell-outline", // Apply the custom CSS class
          },
          {
            title: "Phone",
            dataIndex: "Mobile",
            className: "ant-table-cell-outline", // Apply the custom CSS class
          },
        ]);
      }
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    }
  }, [results]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      rowKey={(record) => record}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default VehcileLogTable;
