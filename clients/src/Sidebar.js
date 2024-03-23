import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import Logo from './renker.png'

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);











  return (


    <>
      <nav id="Navbar" class="navbar navbar-expand-lg navbar-dark " style={{ position: "fixed", left: "0", right: "0", zIndex: "1" }}>
        <div class="container-fluid" id="yoyo">
          <Link to="/"> <img src={Logo} alt="logo" style={{ width: "200px", marginLeft: "0", marginRight: "10px", marginTop: "0px", position: "relative" }} /></Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <button className="nav-link active" aria-current="page">Home</button>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page">Link</button>
              </li>

              <li className="nav-item">
                <button className="nav-link" disabled>Disabled</button>
              </li> */}
            </ul>
            {/* <ul style={{ marginRight: "75px", color: "white" }} class="navbar-nav dropdown">
              <Link to="/"> <button type="button" className="btn btn-outline-primary">LOGOUT</button></Link>
            </ul> */}
          </div>
        </div>
      </nav>





      <nav className={sidebar ? "sidebar active" : "sidebar"} style={{ position: "fixed", zIndex: "1" }}>
        <button className="hamburger" type="button" onClick={showSidebar}>
          <div></div>
        </button>
        <ul onClick={showSidebar}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/operatorsettings">Operators</Link></li>
          <li><Link to="/usersettings">USERS</Link></li>
        </ul>
      </nav>






    </>
  );
}

export default Sidebar;