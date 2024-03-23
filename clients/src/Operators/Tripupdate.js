import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io"
import { IoMdCloseCircle } from "react-icons/io";

import './All.css'
import NavbarOne from "../NavbarOne";


function Tripupdate() {

    const redirect = useNavigate();
    const location = useLocation();
    const [busid, setBusid] = useState('');
    const [image, setImage] = useState('');
    const [upimage, setUpimage] = useState('');
    const [operatorname, setOperatorname] = useState('');
    const [contactnumber, setContactnumber] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [departuretime, setDeparturetime] = useState('');
    const [arrivaltime, setArrivaltime] = useState('');
    const [stops, setStops] = useState([""]);

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
            setUpimage(result.image);
            setImage(result.image);
            setOperatorname(result.operatorname);
            setContactnumber(result.contactnumber);
            setSource(result.source);
            setDestination(result.destination);
            setDeparturetime(result.departuretime);
            setArrivaltime(result.arrivaltime);
            setStops(result.stops); // Set stops from the retrieved data
        });
    }, [location.state.id]);

    const updateClick = (e) => {
        e.preventDefault();
        redirect('/trips');

        const formData = new FormData();
        formData.append("id", location.state.id)
        formData.append("busid", busid);
        formData.append("image", image);
        formData.append("operatorname", operatorname);
        formData.append("contactnumber", contactnumber);
        formData.append("source", source);
        formData.append("destination", destination);
        formData.append("departuretime", departuretime);
        formData.append("arrivaltime", arrivaltime);

        stops.forEach((stop, index) => {
            formData.append(`stop${index + 1}`, stop);
        });

        fetch('http://localhost:2222/tripupdate', {
            method: "post",
            body: formData
        }).then((res) => res.json()).then((result) => {
            console.log(result);
        });
    };

    const addStopField = () => {
        setStops([...stops, ""]);
    };

    const handleStopChange = (index, value) => {
        const newStops = [...stops];
        newStops[index] = value;
        setStops(newStops);
    };

    const removeStopField = (indexToRemove) => {
        setStops(stops.filter((stop, index) => index !== indexToRemove));
    }

    return (

        <>

            <NavbarOne />
            <div className="app">
            <div className="tripsupdating"  style={{width:'1040px', marginLeft:"300px", marginTop:"100px",paddingLeft:"20px", paddingBottom:"10px"}}>
                <form method="post" style={{ width: "1000px" }} onSubmit={updateClick}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">BUS ID</label>
                        <input className="form-control" name="busid" value={busid} onChange={(e) => setBusid(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">BUS IMAGE</label>
                        <img src={upimage} alt=" is here" style={{width:"200px", height:"150px", objectFit:"fill"}}p />
                        <input type="file" name="image" className="form-control" onChange={(e) => {
                            setImage(e.target.files[0]);
                            setUpimage(URL.createObjectURL(e.target.files[0]))
                        }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">OPERATOR NAME</label>
                        <input className="form-control" name="operatorname" value={operatorname} onChange={(e) => setOperatorname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">CONTACT NUMBER</label>
                        <input className="form-control" name="contactnumber" value={contactnumber} onChange={(e) => setContactnumber(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">SOURCE</label>
                        <input className="form-control" name="source" value={source} onChange={(e) => setSource(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">DESTINATION</label>
                        <input className="form-control" name="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">DEPARTURE TIME</label>
                        <input type="time" className="form-control" name="departuretime" value={departuretime} onChange={(e) => setDeparturetime(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">ARRIVAL TIME</label>
                        <input type="time" className="form-control" name="arrivaltime" value={arrivaltime} onChange={(e) => setArrivaltime(e.target.value)} />
                    </div>
                    <div className="form-group">
                        {stops.map((stop, index) => (
                            <div className="form-group stop-input" key={index}>
                                <input
                                    className="form-control"
                                    placeholder={`Stop ${index + 1}`}
                                    value={stop}
                                    onChange={(e) => handleStopChange(index, e.target.value)}
                                />
                                {index > 0 && (
                                    <IoMdCloseCircle class="close" onClick={() => removeStopField(index)} />
                                )}
                            </div>
                        ))}

                        <IoMdAddCircle class="add" onClick={addStopField} /><br />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Trip</button>
                </form>
            </div>
</div>

        </>
    )
}



export default Tripupdate