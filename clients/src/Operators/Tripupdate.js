import React, { useState, useEffect } from "react";
import Navbar from "../Navbar"
import { Link, useNavigate , useLocation } from "react-router-dom";

import './All.css'


function Tripupdate() {

    const redirect = useNavigate()
    const [busid, setBusid] = useState('')
    const [operatorname, setOperatorname] = useState('')
    const [contactnumber, setContactnumber] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [nextstop, setNextstop] = useState('')
    const [departuretime, setDeparturetime] = useState('')
    const [arrivaltime, setArrivaltime] = useState('')


    const location = useLocation()
    console.log(location);

    const navi = useNavigate()


    useEffect(() => {
        let params = {
            id: location.state.id
        }
        fetch('http://localhost:2222/tripedit', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);

            setBusid(result.busid)
            setOperatorname(result.operatorname)
            setContactnumber(result.contactnumber)
            setSource(result.source)
            setDestination(result.destination)
            setNextstop(result.nextstop)
            setDeparturetime(result.departuretime)
            setArrivaltime(result.arrivaltime)



        })
    }, [])


    const updateClick = (e) => {
        e.preventDefault()
        navi('/trips')
        let params = {

            id:location.state.id,
            busid: busid,
            operatorname: operatorname,
            contactnumber: contactnumber,
            source: source,
            destination: destination,
            nextstop: nextstop,
            departuretime: departuretime,
            arrivaltime: arrivaltime

            
        }

        fetch('http://localhost:2222/tripupdate', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            
        })
    }











    return (

        <>

            <Navbar />
            <div className="tripsadding">
                <form method="post" style={{ width: "1000px" }} onSubmit={updateClick}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">BUS ID</label>
                        <input className="form-control" name="busid" value={busid} onChange={(e) => setBusid(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">OPERATOR NAME</label>
                        <input className="form-control" name="operatorname" value={operatorname} onChange={(e) => setOperatorname(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">CONTACT NUMBER</label>
                        <input className="form-control" name="contactnumber" value={contactnumber} onChange={(e) => setContactnumber(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">SOURCE</label>
                        <input className="form-control" name="source" value={source} onChange={(e) => setSource(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">DESTINATION</label>
                        <input className="form-control" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Next Stop</label>
                        <input className="form-control" name="nextstop"  value={nextstop}  onChange={(e) => setNextstop(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">DEPARTURE TIME</label>
                        <input type="time" className="form-control" name="departuretime" value={departuretime}  onChange={(e) => setDeparturetime(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">ARRIVAL TIME</label>
                        <input type="time" className="form-control" name="arrivaltime" value={arrivaltime} onChange={(e) => setArrivaltime(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Trip</button>
                </form>
            </div>


        </>
    )
}



export default Tripupdate