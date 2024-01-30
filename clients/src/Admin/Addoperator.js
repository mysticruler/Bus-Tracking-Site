import React, { useState, useEffect } from "react";
import Navbar from "../Navbar"
import { Link, useNavigate } from "react-router-dom";

import './All.css'


function Addoperator() {

    const redirect = useNavigate()
    const [oppmail, setOppmail] = useState('')
    const [password, setPassword] = useState('')

    const addOpp = (e) => {
        
        e.preventDefault()
        redirect('/operatorsettings')
        let operator = {
            oppmail: oppmail,
            password: password


        }

        fetch('http://localhost:2222/operatorregister', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(operator)
        }).then((res) => res.json()).then((out) => {
            console.log(out);
            redirect('/adminlogin')
        })
        

    }









    return (

        <>

            <Navbar />
            <div className="tripsadding">
                <form method="post" style={{ width: "1000px" }} onSubmit={addOpp}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">OPERATOR MAIL</label>
                        <input className="form-control" name="oppmail" onChange={(e) => setOppmail(e.target.value)} />
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



export default Addoperator