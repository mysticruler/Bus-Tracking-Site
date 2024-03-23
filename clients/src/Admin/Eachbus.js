import React, { useState, useEffect } from "react";
import "./each.css"
import { Link, useLocation } from "react-router-dom";
import Bus from '../bus.jpg'




function Eachbus() {

    const location = useLocation();
    const [busid, setBusid] = useState('');
    const [image, setImage] = useState('');
    const [operatorname, setOperatorname] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [departuretime, setDeparturetime] = useState('');
    const [arrivaltime, setArrivaltime] = useState('');
    const [stops, setStops] = useState([""]);
    const [status, setStatus] = useState(0)
    const isActive = status === 1;




    useEffect(() => {
        let params = {
            id: location.state.id
        };
        fetch('http://localhost:2222/tripedit', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);

            setBusid(result.busid);
            setImage(result.image);
            setOperatorname(result.operatorname);
            setContactnumber(result.contactnumber);
            setSource(result.source);
            setDestination(result.destination);
            setDeparturetime(result.departuretime);
            setArrivaltime(result.arrivaltime);
            setStops(result.stops)
            setStatus(parseInt(result.status));
        });
    }, [location.state.id]);






    return (

        <>
            <img src={Bus} alt="logo" style={{ width: '100%', height: '100vh', position: "absolute" }} />
            <div id="bbb">
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">
                        <div className="row" id="joo">
                            <div className="col" >
                                <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4" style={{ marginLeft: "15px", marginTop: "20px" }}>
                                    <ol className="breadcrumb mb-0" >
                                        <Link to='/operatorsettings'><button type="button" className="btn btn-outline-primary ms-1">BACK</button></Link>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src={image} alt=" is here" width="350" height="500" style={{ objectFit: "contain" }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">BUS ID</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{busid}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">OPERATOR NAME</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{operatorname}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">CONTACT NUMBER</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{contactnumber}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">SOURCE</p>
                                            </div>

                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{source}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">DESTINATION</p>
                                            </div>
                                            <div className="col-sm-7">
                                                <p className="text-muted mb-0">{destination}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">DEPARTURE TIME</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{departuretime}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">ARRIVAL TIME</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{arrivaltime}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <p className="mb-0">CLICK TO VIEW STOPS</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">
                                                    <div className="stops-wrapper">
                                                        {stops && (
                                                            <select className="form-select" onchange="toggleStops(this)">
                                                                <option value="" selected disabled>STOPS</option>
                                                                {stops.map((stop, stopIndex) => (
                                                                    <option key={stopIndex} value={stop} disabled>{stop}</option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-sm-7">
                                                            <p className="mb-0">BUS STATUS</p>
                                                        </div>
                                                        <div className="col-sm-9">
                                                            <p className={`text-muted mb-0 ${isActive ? 'active' : 'inactive'}`}>
                                                                {isActive ? 'Active' : 'Inactive'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>




        </>
    )
}



export default Eachbus