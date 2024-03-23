import React, { useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./Navbar";
import NavbarOne from "./NavbarOne";
import Admin from "./Admin/Admin";
import Tripsadding from "./Operators/Tripadding";
import Tripupdate from "./Operators/Tripupdate";
import Findmytrip from "./User/Findmytrip";
import Userlogin from "./Logins/Userlogin";
import Userregister from "./Logins/Userregister";
import Adminregister from "./Logins/Adminregister";
import Adminlogin from "./Logins/Adminlogin";
import Operatorlogin from "./Logins/Operatorlogin";
import Operatorregister from "./Logins/Operatorregister";
import Operatorsettings from "./Admin/Operatorsettings";
import Addoperator from "./Admin/Addoperator";
import Updateoperator from "./Admin/Updateoperator";
import Usersettings from "./Admin/Usersettings";
import Adduser from "./Admin/Adduser";
import Updateuser from "./Admin/Updateuser";
import Trips from "./Operators/Trips";
import Sidebar from "./Sidebar";
import Dashboard from "./Admin/Dashboard";
import Eachbus from "./Admin/Eachbus";
import Notaccessible from "./Notacessable";
import Dashgraph from "./Admin/Dashgraph";
import Latest from "./Admin/Latest";
import Adminbusadding from "./Admin/Adminbusadding";
import Adminbusupdate from "./Admin/Adminbusupdate";
import LocationModal from "./User/LocationModal";

function App() {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("userType")));
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/userregister" element={<Userregister />} />
        <Route path="/navbarone" element={<NavbarOne />} />
        <Route path="/adminregister" element={<Adminregister />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/operatorlogin" element={<Operatorlogin />} />
        <Route path="/operatorregister" element={<Operatorregister />} />
        <Route path="/notacessable" element={<Notaccessible />} />
        <Route path="/map" element={<LocationModal />} />






        {auth === 3 && (
          <>
            <Route path="/trips" element={<Trips />} />
            <Route path="/tripsadding" element={<Tripsadding />} />
            <Route path="/tripupdate" element={<Tripupdate />} />
          </>
        )}

        {auth === 1 && (
          <Route path="/findmytrip" element={<Findmytrip />} />
        )}

        {auth === 2 && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/eachbus" element={<Eachbus />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/operatorsettings" element={<Operatorsettings />} />
            <Route path="/addoperator" element={<Addoperator />} />
            <Route path="/updateoperator" element={<Updateoperator />} />
            <Route path="/usersettings" element={<Usersettings />} />
            <Route path="/adduser" element={<Adduser />} />
            <Route path="/updateuser" element={<Updateuser />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminaddbus" element={<Adminbusadding />} />
            <Route path="/adminupbus" element={<Adminbusupdate />} />
            <Route path="/dashgraph" element={<Dashgraph />} />
            <Route path="/latest" element={<Latest />} />

          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
