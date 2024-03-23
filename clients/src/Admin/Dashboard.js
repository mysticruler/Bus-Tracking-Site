import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
// import "../Sidebar.css";
import "./dash.css"
import gs from '../gs.png'
import sb from '../sb.png'
import us from '../us.png'
import op from '../op.png'
import Sidebar from "../Sidebar";
import Dashgraph from "./Dashgraph";
import Latest from "./Latest";

function Dashboard() {

  const [totalCount, setTotalCount] = useState(null);
  const [totalusersCount, setTotalusersCount] = useState(null);
  const [totaloperatorsCount, setTotaloperatorsCount] = useState(null);
  const [totalActive, setTotalactive] = useState();
  const redirect = useNavigate();


  useEffect(() => {
    fetch('http://localhost:2222/tripcount')
      .then(response => response.json())
      .then(data => {

        const { totalCount } = data;
        setTotalCount(totalCount);
      })
      ;
  }, []);

  useEffect(() => {
    fetch('http://localhost:2222/userscount')
      .then(response => response.json())
      .then(data => {

        const { totalusersCount } = data;
        setTotalusersCount(totalusersCount);
      })
      ;
  }, []);

  useEffect(() => {
    fetch('http://localhost:2222/operatorscount')
      .then(response => response.json())
      .then(data => {

        const { totaloperatorsCount } = data;
        setTotaloperatorsCount(totaloperatorsCount);
      })
      ;
  }, []);


  fetch('http://localhost:2222/tripactive')
    .then(response => response.json())
    .then(data => {

      const statusValues = data.map(trip => trip.status);
      const sum = statusValues.reduce((acc, cur) => acc + cur, 0);
      setTotalactive(sum)
    })

  const handleLogout = () => {
    localStorage.clear();
    redirect("/adminlogin")
  }


  const blurStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(17px)',
    WebkitBackdropFilter: 'blur(17px)', // For Safari support
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    
  };
  return (


    <>
      <Sidebar />
      <button type="button" style={{ marginTop: "10px", marginLeft: "1550px", position: "absolute", zIndex: 8 }} className="btn btn-outline-primary" onClick={handleLogout}>
        LOGOUT
      </button>
      <div>
      <div className="app">
        <div style={blurStyle}  >
          <div className="content-wrapper" style={{ width: "95%", height:"100%", marginLeft: "45px" }}>
            <div className="container-fluid" style ={{height:"100%"}}>
              <div className="row ">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
                  <div className="inforide blur-background"style ={{height:"100%"}}>
                    <div className="row "style ={{height:"100%"}}>
                      <div className="col-lg-3 col-md-4 col-sm-4 col-4 rideone " >
                        <img src={sb} style={{ border: "10px" }} alt="icon" />
                      </div>
                      <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                        <h4 style={{color:"white"}}>TOTAL BUSES</h4>
                        <h2 style={{color:"white"}}>{totalCount}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
                  <div className="inforide blur-background"style ={{height:"100%"}}>
                    <div className="row"style ={{height:"100%"}}>
                      <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridetwo">
                        <img src={gs} alt="icon" />
                      </div>
                      <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                        <h4 style={{color:"white"}}>TOTAL ACTIVE BUSES</h4>
                        <h2 style={{color:"white"}}>{totalActive}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
                  <div className="inforide blur-background">
                    <div className="row">
                      <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridethree">
                        <img src={us} alt="icon" />
                      </div>
                      <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty">
                        <h4 style={{color:"white"}}>TOTAL USERS</h4>
                        <h2 style={{color:"white"}}>{totalusersCount}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4">
                  <div className="inforide blur-background">
                    <div className="row">
                      <div className="col-lg-3 col-md-4 col-sm-4 col-4 ridefour">
                        <img src={op} alt="icon" />
                      </div>
                      <div className="col-lg-9 col-md-8 col-sm-8 col-8 fontsty" >
                        <h4 style={{color:"white"}}>TOTAL OPERATORS</h4>
                        <h2 style={{color:"white"}}>{totaloperatorsCount}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div><div style={{paddingBottom:"54.5px"}}></div>
        </div>
      </div>
      <div class="graph">
        <Dashgraph />
      </div>

      <div class="latest">
        <Latest />
      </div>
      </div>




    </>
  );
}

export default Dashboard