import React, { useState, useEffect } from "react";
import "./Latest.css"; // Import CSS for styling
import moment from "moment"; // Import moment library for time calculations

function Latest() {
    const [userdata, setUserdata] = useState([]);
    const [tripdata, setTripdata] = useState([]);
    const [latestUserEmail, setLatestUserEmail] = useState("");
    const [latestTripBusID, setLatestTripBusID] = useState("");
    const [oppname, setOppname] = useState("");
    const [oppdata, setOppdata] = useState([]);
    const [latestOperatorEmail, setLatestOperatorEmail] = useState("");
    const [runningBusID, setRunningBusID] = useState("");
    


    useEffect(() => {
        fetch('http://localhost:2222/userview')
            .then((res) => res.json())
            .then((result) => {
                setUserdata(result);
                if (result.length > 0) {
                    const latestUser = result[result.length - 1];
                    setLatestUserEmail(latestUser.usermail);
                }
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:2222/tripview')
            .then((res) => res.json())
            .then((result) => {
                setTripdata(result);
                if (result.length > 0) {
                    const latestTrip = result[result.length - 1];
                    setLatestTripBusID(latestTrip.busid);
                    const oppname = result[result.length - 1];
                    setOppname(oppname.operatorname)
                }
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:2222/operatorview')
            .then((res) => res.json())
            .then((result) => {
                setOppdata(result);
                if (result.length > 0) {
                    const latestOperator = result[result.length - 1];
                    setLatestOperatorEmail(latestOperator.oppmail);
                }
            });
    }, []);

    useEffect(() => {
        const currentTime = moment();
        const runningBuses = tripdata.filter(trip => {
            const departureTime = moment(trip.departuretime, "HH:mm:ss");
            const arrivalTime = moment(trip.arrivaltime, "HH:mm:ss");
            return currentTime.isBetween(departureTime, arrivalTime) && trip.status !== 0;
        });
        const runningBusIDs = runningBuses.map(bus => bus.busid);
        if (runningBusIDs.length > 0) {
            setRunningBusID(runningBusIDs.join(", "));
        } else {
            setRunningBusID("No buses running");
        }
    }, [tripdata]);
    
    
    
    return (
        <div className="latest-container">
            <table className="latest-table">
                <tbody>
                    <tr>
                        <td className="label">LATEST BUS ADDED</td>
                        <td>{oppname},{latestTripBusID}</td>
                    </tr>
                    <tr>
                        <td className="label">LATEST USER</td>
                        <td>{latestUserEmail}</td>
                    </tr>
                    <tr>
                        <td className="label">LATEST OPERATOR</td>
                        <td>{latestOperatorEmail}</td>
                    </tr>
                    <tr>
                        <td className="label">RUNNING BUS</td>
                        <td>{runningBusID}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Latest;
