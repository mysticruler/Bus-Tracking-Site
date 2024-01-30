import React, { useState, useEffect } from "react";
import Navbar from "../Navbar"
import { Link, useNavigate } from "react-router-dom";

import './All.css'


function Adduser() {

    const redirect = useNavigate()
    const [usermail, setUsermail] = useState('')
    const [password, setPassword] = useState('')

    const addUser = (e) => {
        
        e.preventDefault()
        redirect('/usersettings')
        let user = {
            usermail: usermail,
            password: password


        }

        fetch('http://localhost:2222/userregister', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => res.json()).then((out) => {
            console.log(out);
            redirect('/userlogin')
        })
        

    }










    return (

        <>

            <Navbar />
            <div className="tripsadding">
                <form method="post" style={{ width: "1000px" }} onSubmit={addUser}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">USER MAIL</label>
                        <input className="form-control" name="usermail" onChange={(e) => setUsermail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">PASSWORD</label>
                        <input className="form-control" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>


        </>
    )
}



export default Adduser