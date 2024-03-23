import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Link,useNavigate } from "react-router-dom";

import './user.css'
import Sidebar from "../Sidebar";


function Usersettings() {


    const [userdata, setUserdata] = useState([])
    const [refresh, setFresh] = useState(0)

    const [pickupCity, setPickupCity] = useState("");
    const [dropCity, setDropCity] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const redirect = useNavigate();

    const handleSearch = () => {
        const pickupCityLower = pickupCity.toLowerCase();
        const dropCityLower = dropCity.toLowerCase();

        fetch(`http://localhost:2222/tripsearch?pickupCity=${pickupCityLower}&dropCity=${dropCityLower}`)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data);
            })
            .catch(error => console.error("Error searching trips:", error));
    };




    useEffect(() => {
        fetch('http://localhost:2222/userview').then((res) =>
            res.json()).then((result) => setUserdata(result))
    }, [refresh])




    const userDelete = (iD) => {

        let param = {
            id: iD
        }

        fetch('http://localhost:2222/userdelete', {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/jon'
            },
            body: JSON.stringify(param)
        }).then((res) =>
            res.json()).then((deleted) => {
                console.log(deleted)
                setFresh(prev => prev + 1)
            })


    }
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
            <div className="app">
                <div  style={{ display: "flex", flexDirection: "column", gap: "20px" ,...blurStyle}}>
                    <div className="transparent-table-container" style={{width:"95%", marginLeft:"45px" }}>

                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>
                                        <h3 style={{ fontFamily: 'Times New Roman, serif' }}>
                                            Add New Users Here, Please use the + icon on the right to add new user
                                            <Link to='/adduser' style={{ marginLeft: "570px" }}>
                                                <IoIosAddCircle />
                                            </Link>
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <table className="tbone">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">EMAIL</th>
                                    <th className="text-center">PASSWORD</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userdata.map((values, index) => (
                                    <tr key={values._id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{values.usermail}</td>
                                        <td className="text-center">{values.password}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                style={{ backgroundColor: "black" }}
                                                onClick={() => userDelete(values._id)}
                                            >
                                                Delete
                                            </button>
                                            <Link to='/updateuser' state={{ id: values._id }} >
                                                <button type="button" className="btn btn-dark" style={{ backgroundColor: "black" }} >Update</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="transparent-table-container" style={{width:"95%", marginLeft:"45px", marginTop:"-30px" }}>
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>
                                        <h3 style={{}}>
                                            FIND YOUR TRIP HERE
                                           
                                        </h3>
                                    </th>
                                </tr>
                            </thead>
                        </table>

                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">Bus ID</th>
                                    <th className="text-center">Bus Image</th>
                                    <th className="text-center">Operator Name</th>
                                    <th className="text-center">Contact Number</th>
                                    <th className="text-center">Source</th>
                                    <th className="text-center">Destination</th>
                                    <th className="text-center">Departure Time</th>
                                    <th className="text-center">Arrival Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((trip, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{trip.busid}</td>
                                        <td className="text-center"><img src={trip.image} alt="BUS COMES HERE" className="square-image" width="100" height="100" /></td>
                                        <td className="text-center">{trip.operatorname}</td>
                                        <td className="text-center">{trip.contactnumber}</td>
                                        <td className="text-center">{trip.stops[0]}</td>
                                        <td className="text-center">{trip.destination}</td>
                                        <td className="text-center">{trip.departuretime}</td>
                                        <td className="text-center">{trip.arrivaltime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="input-group mb-3">
                            <label style={{ marginRight: "10px", marginTop: "22px", color: "white" }}>Search Your Trip Here</label>
                            <section className="search-sec">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <input
                                                type="text"
                                                className="form-control search-slt"
                                                placeholder="Enter Pickup City"
                                                value={pickupCity}
                                                onChange={(e) => setPickupCity(e.target.value)}
                                                style={{ width: "500px" }}
                                            />
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                            <input
                                                type="text"
                                                className="form-control search-slt"
                                                placeholder="Enter Drop City"
                                                value={dropCity}
                                                onChange={(e) => setDropCity(e.target.value)}
                                            />
                                        </div>
                                        <button type="button" style={{ width: "200px" }} className="btn btn-danger wrn-btn" onClick={handleSearch}>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}



export default Usersettings