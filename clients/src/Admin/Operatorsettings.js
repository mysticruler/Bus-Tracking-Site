import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";


import './All.css'
import Sidebar from "../Sidebar";


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
        redirect("/adminlogin")
      }
      const redirect = useNavigate();



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
            <div className="app" >

                <div  className="transparent-table" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start',paddingTop: '60px' , marginLeft:"60px",...blurStyle }}>
                    {tripdata.map((values, index) => (
                        <div className="card" key={index} style={{ width: '240px', height: '300px', margin: '10px', position: 'relative', borderRadius: '8px' }}>
                            <img style={{ height: "calc(100% - 40px)", width: "100%", objectFit: 'cover', borderRadius: '8px 8px 0 0' }} src={values.image} alt={values.busid} />
                            <div className="container" style={{ padding: '10px', position: 'absolute', bottom: '0', left: '0', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '0 0 8px 8px' }}>
                                <h4 style={{ margin: '0', fontSize: '14px' }}><b>{values.busid}</b></h4>
                                <h4 style={{ margin: '5px 0', fontSize: '14px' }}>{values.op}</h4>
                                <h4 style={{ margin: '5px 0', fontSize: '14px' }}>{values.operatorname}</h4>
                                <h4 style={{ margin: '5px 0', fontSize: '14px' }}>{values.contactnumber}</h4>





                                <Link to='/eachbus' state={{ id: values._id }} >  <button className="view-info-btn" style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Info</button></Link>
                                <button
                                    className="btn btn-dark" style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
                                    onClick={() => toggleTripStatus(values._id, values.status)}>
                                    {values.status === 1 ? 'Active' : 'Inactive'}
                                </button>
                                <button className="btn btn-dark" style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: 'black', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }} onClick={() => tripDelete(values._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div id="opptable" style={blurStyle}>
                    <table className="table table-dark"  >
                        <thead>
                            <th>
                                <h3 style={{ fontFamily: 'Times New Roman, serif', backgroundColor: "black",borderRadius:"10px" }}>
                                    Add New Operator Here, Please use the + icon on the right to add new operator
                                    <Link to='/addoperator' style={{ marginLeft: "600px" }}>
                                        <IoIosAddCircle />
                                    </Link>
                                </h3>
                            </th>
                        </thead>
                    </table>
                    <div style={{ marginLeft: '20px', marginRight: '20px' }}>

                    <table class="ttt" style={{width:'1603px', marginLeft:"22px", borderRadius:"10px"}}>
                        <thead >
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">EMAIL</th>
                                <th className="text-center">PASSWORD</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {oppdata.map((values) => (
                                <tr >
                                    <td className="text-center">{oppcounter++}</td>
                                    <td className="text-center">{values.oppmail}</td>
                                    <td className="text-center">{values.password}</td>
                                    <td className="text-center" >
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            style={{ backgroundColor: "black" }}
                                            onClick={() => oppDelete(values._id)}
                                        >
                                            Delete
                                        </button>
                                        <Link to='/updateoperator' state={{ id: values._id }} >
                                            <button type="button" className="btn btn-dark" style={{ backgroundColor: "black" }} >Update</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>

                    {/* Second Set of Tables */}
                    <table className="table table-dark">
                        <thead>
                            <th>
                                <h3 style={{ fontFamily: 'Times New Roman, serif' }}>
                                    Add Your Trip Here, Please use the + icon on the right to add your Trip
                                    <Link to='/adminaddbus' style={{ marginLeft: "700px" }}>
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
                                <th className="text-center">Image</th>
                                <th className="text-center">operatorname</th>
                                <th className="text-center">contactnumber</th>
                                <th className="text-center">Source</th>
                                <th className="text-center">Destination</th>
                                <th className="text-center">STOPS</th>
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
                                    <td className="text-center"><img src={values.image} alt="BUS COMES HERE" class="rounded-image" width="100" height="100" /></td>
                                    <td className="text-center">{values.operatorname}</td>
                                    <td className="text-center">{values.contactnumber}</td>
                                    <td className="text-center">{values.source}</td>
                                    <td className="text-center">{values.destination}</td>
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
                                        <button
                                            type="button"
                                            className="btn btn-dark"
                                            onClick={() => tripDelete(values._id)}
                                        >
                                            Delete
                                        </button>
                                        <Link to='/adminupbus' state={{ id: values._id }} >
                                            <button type="button" className="btn btn-dark">Update</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>

        </>
    )
}



export default Operatorsettings











































































