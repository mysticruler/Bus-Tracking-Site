import React, { useState, useEffect } from "react";
import Navbar from "../Navbar"
import { Link, useNavigate } from "react-router-dom";

import './All.css'


function Tripsadding() {

    const redirect = useNavigate()
    const [busid, setBusid] = useState('')
    const [operatorname, setOperatorname] = useState('')
    const [contactnumber, setContactnumber] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [nextstop, setNextstop] = useState('')
    const [departuretime, setDeparturetime] = useState('')
    const [arrivaltime, setArrivaltime] = useState('')






    const addtrip = (e) => {
        redirect('/trips')
        e.preventDefault()

        let Tdata = {
            busid: busid,
            operatorname: operatorname,
            contactnumber: contactnumber,
            source: source,
            destination: destination,
            nextstop: nextstop,
            departuretime: departuretime,
            arrivaltime: arrivaltime


        }

        fetch('http://localhost:2222/tripsadding', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Tdata)
        }).then((res) => res.json()).then((out) => {
            console.log(out);
        })

    }









    return (

        <>

            <Navbar />
            <div className="tripsadding">
                <form method="post" style={{ width: "1000px" }} onSubmit={addtrip}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">BUS ID</label>
                        <input className="form-control" name="busid" onChange={(e) => setBusid(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">OPERATOR NAME</label>
                        <input className="form-control" name="operatorname" onChange={(e) => setOperatorname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">CONTACT NUMBER</label>
                        <input className="form-control" name="contactnumber" onChange={(e) => setContactnumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">SOURCE</label>
                        <input className="form-control" name="source" onChange={(e) => setSource(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">DESTINATION</label>
                        <input className="form-control" name="destination" onChange={(e) => setDestination(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Next Stop</label>
                        <input className="form-control" name="nextstop" onChange={(e) => setNextstop(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">DEPARTURE TIME</label>
                        <input type="time" className="form-control" name="departuretime" onChange={(e) => setDeparturetime(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">ARRIVAL TIME</label>
                        <input type="time" className="form-control" name="arrivaltime" onChange={(e) => setArrivaltime(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>


        </>
    )
}



export default Tripsadding