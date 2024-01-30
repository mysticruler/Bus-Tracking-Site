import React, { useState, useEffect } from "react";
import NavbarOne from "../NavbarOne";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import './All.css'


function Usersettings() {

    let counter = 1
    const [userdata, setUserdata] = useState([])
    const [refresh, setFresh] = useState(0)

    const [info, setInfo] = useState("")
    const [name, setName] = useState('')
    const [operatorname, setOperatorname] = useState('')
    const [cases, setCase] = useState('')
    const navigate = useNavigate();
    


    useEffect(() => {
        fetch('http://localhost:2222/userview').then((res) =>
            res.json()).then((result) => setUserdata(result))
    }, [refresh])

    let oppcounter = 1

   

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

                <table className="table table-dark">
                    <thead>
                        <th>
                            <h3 style={{ fontFamily: 'Times New Roman, serif', backgroundColor: "black" }}>
                                Add New Users Here, Please use the + icon on the right to add new user
                                <Link to='/adduser' style={{ marginLeft: "670px" }}>
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
                        {userdata.map((values) => (
                            <tr>
                                <td className="text-center">{oppcounter++}</td>
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


                    <table className="table table-dark">
                        <thead>
                            <th>
                                <h3 style={{ fontFamily: 'Times New Roman, serif' }}>
                                    FIND YOUR TRIP HERE
                                    <Link to='/tripsadding' style={{ marginLeft: "1200px" }}><IoIosAddCircle /></Link>
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
                            <tr>
                                <td className="text-center"></td>
                                <td className="text-center"></td>
                                <td className="text-center"></td>
                                <td className="text-center">{name}</td>
                                <td className="text-center">{operatorname}</td>
                                <td className="text-center"></td>
                                <td className="text-center"></td>
                                <td className="text-center"></td>
                                <td className="text-center"></td>

                                <td className="text-center">{<button type="button" class="btn btn-dark">Delete</button>}
                                    <Link to='/flightsupdate' >
                                        <button type="button" class="btn btn-dark">Update</button></Link></td>


                            </tr>

                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <th>
                                <h3 style={{ fontFamily: 'Times New Roman, serif' }}>



                                    <div className="input-group mb-3">
                                        <label style={{ marginRight: "10px" }}>Search Your Trip Here</label>
                                        <input type="text" value={info} onChange={(e) => { setInfo(e.target.value) }} className="form-control rounded" />
                                        <button type="submit" className="btn btn-primary rounded">Search</button>
                                    </div>


                                </h3>
                            </th>
                        </thead>
                    </table>
                
            </div>
        </>
    )
}



export default Usersettings