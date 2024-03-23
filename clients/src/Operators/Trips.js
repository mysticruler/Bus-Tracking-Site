import React, { useState, useEffect } from "react";
import NavbarOne from "../NavbarOne";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


import './All.css'


function Trips() {

    let counter = 1
    const [tripdata, setTripdata] = useState([])
    const [refresh, setFresh] = useState(0)
    const redirect = useNavigate();
    
    const oppid = localStorage.getItem('_id');

    useEffect(() => {
        fetch('http://localhost:2222/tripview')
            .then((res) => res.json())
            .then((result) => {
                // Filter trips where oppid matches the localStorage _id
                const filteredTrips = result.filter(trip => trip.oppid === oppid);
                setTripdata(filteredTrips);
            })
    }, [refresh]);


    const tripDelete = (iD) => {

        let param = {
            id: iD
        }

        fetch('http://localhost:2222/tripdelete', {
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

    const toggleTripStatus = (tripId, currentStatus) => {
        const newStatus = currentStatus === 1 ? 0 : 1;
        fetch('http://localhost:2222/tripstatus', {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/jon'
            },
            body: JSON.stringify({ id: tripId, status: newStatus })
        }).then((res) =>
            res.json()).then((updated) => {
                console.log(updated)
                setFresh(prev => prev + 1)
            });
    }





    const handleLogout = () => {
        localStorage.clear();
        redirect("/operatorlogin")
        window.location.reload()
    }




    return (

        <>

            <NavbarOne />
            <div className="app">
                <div className="transparent-table-container" style={{ width: '1603px', marginLeft: "52px" }}>
                    <button type="button" style={{ marginTop: "-108px", marginLeft: "1500px", position: "absolute", zIndex: 5 }} className="btn btn-outline-primary" onClick={handleLogout}>
                        LOGOUT
                    </button>
                    <table className="table table-dark">
                        <thead>
                            <th>
                                <h3 style={{ fontFamily: 'Times New Roman, serif' }}>
                                    Add Your Trip Here, Please use the + icon on the right to add your Trip
                                    <Link to='/tripsadding' style={{ marginLeft: "600px", }}><IoIosAddCircle /></Link>
                                </h3>
                            </th>
                        </thead>
                    </table>


                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Bus ID</th>
                                <th className="text-center">Bus IMAGE</th>
                                <th className="text-center">operatorname</th>
                                <th className="text-center">contactnumber</th>
                                <th className="text-center">Source</th>
                                <th className="text-center">Destination</th>
                                <th className="text-center">STOPS</th>
                                <th className="text-center">Departure Time</th>
                                <th className="text-center">Arrival Time</th>
                                <th className="text-center">BUS STATUS</th>
                                <th className="text-center">Actions</th>



                            </tr>
                        </thead>
                        <tbody>
                            {tripdata.map((values) => {
                                return (
                                    <tr>
                                        <td className="text-center">{counter++}</td>
                                        <td className="text-center">{values.busid}</td>
                                        <td className="text-center"><img src={values.image} alt="BUS COMES HERE" class="rounded-image" width="100" height="100" /></td>
                                        <td className="text-center">{values.operatorname}</td>
                                        <td className="text-center">{values.contactnumber}</td>
                                        <td className="text-center">{values.source}</td>
                                        <td className="text-center">{values.destination} </td>

                                        <td className="text-center">
                                            <div className="stops-wrapper">
                                                {values.stops && (
                                                    <select className="form-select" onchange="toggleStops(this)">
                                                        <option value="" selected disabled>STOPS</option>
                                                        {values.stops.map((stop, stopIndex) => (
                                                            <option key={stopIndex} value={stop} disabled>{stop}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        </td>




                                        <td className="text-center">{values.departuretime}</td>
                                        <td className="text-center">{values.arrivaltime}</td>

                                        <td className="text-center">
                                            <div className="button-wrapper">
                                                <button
                                                    style={{ marginTop: "-7.5px" }}
                                                    type="button"
                                                    className="btn btn-dark"
                                                    onClick={() => toggleTripStatus(values._id, values.status)}>
                                                    {values.status === 1 ? 'Active' : 'Inactive'}
                                                </button>
                                            </div>
                                        </td>


                                        <td className="text-center"><button style={{ marginTop: "-7.5px" }} type="button" class="btn btn-dark" onClick={() => tripDelete(values._id)}>Delete</button> <Link to='/tripupdate' state={{ id: values._id }} > <button style={{ marginTop: "-7.5px" }} type="button" class="btn btn-dark">Update</button></Link></td>


                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}



export default Trips