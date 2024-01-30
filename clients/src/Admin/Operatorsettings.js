import React, { useState, useEffect } from "react";
import NavbarOne from "../NavbarOne";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

import './All.css'


function Operatorsettings() {

    let counter = 1
    const [tripdata, setTripdata] = useState([])
    const [refresh, setFresh] = useState(0)



    useEffect(() => {
        fetch('http://localhost:2222/tripview').then((res) =>
            res.json()).then((result) => setTripdata(result))
    }, [refresh])

    let oppcounter = 1
    const [oppdata, setOppdata] = useState([])

    useEffect(() => {
        fetch('http://localhost:2222/operatorview').then((res) =>
            res.json()).then((result) => setOppdata(result))
    }, [refresh])


    const oppDelete = (iD) => {

        let param = {
            id: iD
        }

        fetch('http://localhost:2222/operatordelete', {
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









    return (

        <>
            <NavbarOne />

            <div id="Trips" className="transparent-table-container">
                <Link to="/">
                    <button
                        type="button"
                        style={{ marginTop: "-138px", marginLeft: "1500px", position: "absolute", zIndex: 5 }}
                        className="btn btn-outline-primary"
                    >
                        LOGOUT
                    </button>
                </Link>

                {/* First Set of Tables */}
                <table className="table table-dark">
                    <thead>
                        <th>
                            <h3 style={{ fontFamily: 'Times New Roman, serif',backgroundColor:"black" }}>
                                Add New Operator Here, Please use the + icon on the right to add new operator
                                <Link to='/addoperator' style={{ marginLeft: "600px" }}>
                                    <IoIosAddCircle />
                                </Link>
                            </h3>
                        </th>
                    </thead>
                </table>

                <table class="tbone">
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">EMAIL</th>
                            <th className="text-center">PASSWORD</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {oppdata.map((values) => (
                            <tr>
                                <td className="text-center">{oppcounter++}</td>
                                <td className="text-center">{values.oppmail}</td>
                                <td className="text-center">{values.password}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        style={{backgroundColor:"black"}}
                                        onClick={() => oppDelete(values._id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to='/updateoperator' state={{ id: values._id }} >
                                        <button type="button" className="btn btn-dark" style={{backgroundColor:"black"}} >Update</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Second Set of Tables */}
                <table className="table table-dark">
                    <thead>
                        <th>
                            <h3 style={{ fontFamily: 'Times New Roman, serif' }}>
                                Add Your Trip Here, Please use the + icon on the right to add your Trip
                                <Link to='/tripsadding' style={{ marginLeft: "700px" }}>
                                    <IoIosAddCircle />
                                </Link>
                            </h3>
                        </th>
                    </thead>
                </table>

                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Bus ID</th>
                            <th className="text-center">operatorname</th>
                            <th className="text-center">contactnumber</th>
                            <th className="text-center">Source</th>
                            <th className="text-center">Destination</th>
                            <th className="text-center">Next Stop</th>
                            <th className="text-center">Departure Time</th>
                            <th className="text-center">Arrival Time</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tripdata.map((values) => (
                            <tr>
                                <td className="text-center">{counter++}</td>
                                <td className="text-center">{values.busid}</td>
                                <td className="text-center">{values.operatorname}</td>
                                <td className="text-center">{values.contactnumber}</td>
                                <td className="text-center">{values.source}</td>
                                <td className="text-center">{values.destination}</td>
                                <td className="text-center">{values.nextstop}</td>
                                <td className="text-center">{values.departuretime}</td>
                                <td className="text-center">{values.arrivaltime}</td>
                                <td className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-dark"
                                        onClick={() => tripDelete(values._id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to='/tripupdate' state={{ id: values._id }} >
                                        <button type="button" className="btn btn-dark">Update</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}



export default Operatorsettings