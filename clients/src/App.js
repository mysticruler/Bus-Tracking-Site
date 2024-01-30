
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarOne from "./NavbarOne";
import Admin from "./Admin/Admin";
import Trips from "./Operators/Trips";
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



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/trips' element={<Trips />} />
        <Route path='/tripsadding' element={<Tripsadding />} />
        <Route path='/tripupdate' element={<Tripupdate />} />
        <Route path='/findmytrip' element={<Findmytrip />} />
        <Route path='/userlogin' element={<Userlogin />} />
        <Route path='/userregister' element={<Userregister />} />
        <Route path='/navbarone' element={<NavbarOne />} />
        <Route path='/adminregister' element={<Adminregister />} />
        <Route path='/adminlogin' element={<Adminlogin />} />
        <Route path='/operatorlogin' element={<Operatorlogin />} />
        <Route path='/operatorregister' element={<Operatorregister />} />
        <Route path='/operatorsettings' element={<Operatorsettings />} />
        <Route path='/addoperator' element={<Addoperator />} />
        <Route path='/updateoperator' element={<Updateoperator />} />
        <Route path='/usersettings' element={<Usersettings />} />
        <Route path='/adduser' element={<Adduser />} />
        <Route path='/updateuser' element={<Updateuser />} />


















      </Routes>
    </BrowserRouter>
  );
}

export default App;
