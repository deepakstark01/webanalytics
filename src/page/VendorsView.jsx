import React, { useEffect, useState } from "react";
import { Card, Button, List } from "antd";
import { requestOption } from "../components/cookieUtils";
import { apiurl } from "./url";
const VendorsView = () => {
  const [vehicleGroup, setVehicleGroup] = useState({});
  const [expandedVendors, setExpandedVendors] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTableVisible, setTableVisibility] = useState(false);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch(`${apiurl}/vendroview`, requestOption("GET"))
      .then((res) => res.json())
      .then((data) => {
        setVehicleGroup(data);
      });
  }, []);

  const toggleVendorExpansion = (vendor) => {
    setTableVisibility(!isTableVisible);
    setExpandedVendors({
      ...expandedVendors,
      [vendor]: !expandedVendors[vendor],
    });
  };
  const toggleVmodelExpansion = (Vmodel) => {
   
    console.log(Vmodel);
  };
  

  const vendorNames = Object.keys(vehicleGroup);

  return (
    <div className="content-wrapper">
      <div className="container mt-4">
        <div className="col-12 text-center fixed top-12 left-12 w-full bg-white z-10 py-2 shadow-md">
          <span className="text-xl">Vendor</span>
        </div>
        <div className="row flex-none mt-16">
          {vendorNames.map((VendorName) => (
            <div className="col-lg-4 " key={VendorName}>
              <Card
                bordered={true}
                className=" border-green-300 border-8 mb-4"
                title={`${VendorName}`}
                onClick={() => toggleVendorExpansion(VendorName)}
              >
                {vehicleGroup[VendorName].CountVmodel}

                {expandedVendors[VendorName] && (
                  <>
                    

                    {Object.keys(vehicleGroup[VendorName]).map((Vmodel) =>
                      Vmodel !== "CountVmodel" ? (  
                        <Card
                          key={Vmodel}
                          title={`${Vmodel}  ${vehicleGroup[VendorName][Vmodel].CountData}`}
                          onClick={() => toggleVmodelExpansion(Vmodel)} // Pass Vmodel as the argument
                        >
                          { ( // Check if the card is expanded
                            <table className="table-fixed w-full">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Phone</th>
                                  <th>Vendor seen date</th>
                                  <th>Vtype</th>
                                  <th>Vbrand</th>
                                  <th>Vmodel</th>
                                </tr>
                              </thead>
                              <tbody>
                                {vehicleGroup[VendorName][Vmodel].Data.map(
                                  (item) => (
                                    <tr key={item.Phone}>
                                      <td>{item.Name}</td>
                                      <td>{item.Phone}</td>
                                      <td>{item.TimeStamp}</td>
                                      <td>{item.Vtype}</td>
                                      <td>{item.Vbrand}</td>
                                      <td>{item.Vmodel}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          )}
                        </Card>
                      ) : null
                    )}
                  </>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorsView;
