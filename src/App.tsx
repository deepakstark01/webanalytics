import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Home from './page/home';
import Navbar from './components/Navbar/Navbar';
import UserVehicleLog from './page/vehicle';
import UserPage from './page/Userpage';
import Login from './page/Login';
import Visit from './page/Visit';
import LogoutPage from './page/Logout';
import Actions from './page/Actions';
import Webvisit from './page/Webvisit';
import Webevent from './page/Webevent';
import VendorsView from './page/VendorsView';

// Custom component to handle Navbar visibility based on the route
function CustomRoutes() {
  const location = useLocation();

  // Define a list of routes where you want to hide the Navbar
  const hideNavbarRoutes = ["/login"];

  // Check if the current route is in the hideNavbarRoutes list
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Render the Navbar only if the current route is not in hideNavbarRoutes */}
      {!hideNavbar && <Navbar />}
      {/* <Navbar /> */}

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/vehiclelog" element={<UserVehicleLog/>} />
        <Route path="/users" element={<UserPage/>} />
        <Route path="/webimpressions" element={<Webvisit/>} />
        <Route path="/androidimpressions" element={<Visit/>} />
        <Route path="/logout" element={<LogoutPage/>} />
        <Route path="/actions" element={<Actions/>} />
        <Route path="/webevents" element={<Webevent/>} />
        <Route path="/vendorsview" element={<VendorsView/>} />
        
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
}

export default App;
