import React, { useState } from "react";
import NavbarOne from "../NavbarOne"
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io"
import { IoMdCloseCircle } from "react-icons/io";

import './All.css'


function Tripsadding() {

    const redirect = useNavigate()
    const [busid, setBusid] = useState('')
    const [image, setImage] = useState('')
    const [operatorname, setOperatorname] = useState('')
    const [contactnumber, setContactnumber] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [departuretime, setDeparturetime] = useState('')
    const [arrivaltime, setArrivaltime] = useState('')
    const [stops, setStops] = useState([""]);
    const oppid = localStorage.getItem('_id');

    




    const addtrip = (e) => {
        e.preventDefault();

        if (!busid || !image || !operatorname || !contactnumber || !source || !destination || !departuretime || !arrivaltime || stops.some(stop => !stop)) {
            alert("Please fill in all fields");
            return;
        }

        const formData = new FormData();
        formData.append("busid", busid);
        formData.append("image", image);
        formData.append("operatorname", operatorname);
        formData.append("contactnumber", contactnumber);
        formData.append("source", source);
        formData.append("destination", destination);
        formData.append("departuretime", departuretime);
        formData.append("arrivaltime", arrivaltime);
        formData.append("oppid", oppid); // Include _id in form data


        stops.forEach((stop, index) => {
            formData.append(`stop${index + 1}`, stop);
        });


        fetch("http://localhost:2222/tripsadding", {
            method: "post",
            body: formData,
        })
            .then((res) => res.json())
            .then((out) => {
                console.log(out);
                redirect("/trips");
            });
    };


    const addStopField = () => {
        setStops([...stops, ""]);
    };

    const handleStopChange = (index, value) => {
        const newStops = [...stops];
        newStops[index] = value;
        setStops(newStops);
    }


    const removeStopField = (indexToRemove) => {
        setStops(stops.filter((stop, index) => index !== indexToRemove));
    };



    return (

        <>

            <NavbarOne />
            <div className="app">
                <div className="tripsadding" style={{ width: '1040px', marginLeft: "300px", marginTop: "100px" }}>
                    <form method="post" style={{ width: "1000px" }} onSubmit={addtrip}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">BUS ID</label>
                            <input className="form-control" name="busid" onChange={(e) => setBusid(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">BUS IMAGE</label>
                            <input className="form-control" type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
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
                            <label htmlFor="exampleInputEmail1">DEPARTURE TIME</label>
                            <input type="time" className="form-control" name="departuretime" onChange={(e) => setDeparturetime(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">ARRIVAL TIME</label>
                            <input type="time" className="form-control" name="arrivaltime" onChange={(e) => setArrivaltime(e.target.value)} />
                        </div>





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
                        <br />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
        </>
    )
}



export default Tripsadding