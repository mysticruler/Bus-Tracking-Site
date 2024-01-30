import React, { useState, useEffect } from "react";
import Navbar from "../Navbar"
import { Link, useNavigate, useLocation } from "react-router-dom";

import './All.css'


function Updateuser() {

    const redirect = useNavigate()
    const [usermail, setUsermail] = useState('')
    const [password, setPassword] = useState('')


    const location = useLocation()
    console.log(location);

    const navi = useNavigate()


    useEffect(() => {
        let params = {
            id: location.state.id
        }
        fetch('http://localhost:2222/useredit', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);

            setUsermail(result.usermail)
            setPassword(result.password)




        })
    }, [])


    const updateClick = (e) => {
        e.preventDefault()
        navi('/usersettings')
        let params = {

            id: location.state.id,
            usermail: usermail,
            password: password


        }

        fetch('http://localhost:2222/userupdate', {
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
                        <input className="form-control" name="usermail" value={usermail} onChange={(e) => setUsermail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">OPERATOR NAME</label>
                        <input className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary">Update Operator</button>
                </form>
            </div>


        </>
    )
}



export default Updateuser