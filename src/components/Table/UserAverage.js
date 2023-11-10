import { useEffect, useState } from "react";
import qs from "qs";
import { Table } from "antd";
import { set } from "date-fns";

const UserAverage = ({ results }) => {
  const [data, setData] = useState();
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      sorter: true,
      width: "20%",
      className: "ant-table-cell-outline", // Apply the custom CSS class
    },

    {
        title: "Total Fuel Consumed in Litres",
        dataIndex: "TotalFuelConsumed",
        render: (text, record) => {
            return `${text} L`
        }
    },
    {
        title: "Total Distance Travelled in KM",
        dataIndex: "TotalDistanceTravelled",
        render: (text, record) => {
            return `${text} KM`
        }
    },
    {
        title: "Average Fuel Consumption",
        dataIndex: "AverageFuelEfficiency",
        render: (text, record) => {
            return `${text} KM/L`
        }
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
  ]
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    
      // console.log(" inside table => ", results);
      setData(results);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    
    
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

export default UserAverage;
