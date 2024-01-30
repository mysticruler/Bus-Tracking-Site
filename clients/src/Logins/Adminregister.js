import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
}
    from 'mdb-react-ui-kit';
import './Alllogin.css'
import './Admin.css'
import { useNavigate } from 'react-router-dom';

function Adminregister() {



    const redirect = useNavigate()
    const [adminmail, setAdminmail] = useState('')
    const [password, setPassword] = useState('')

    const addAdmin = (e) => {

        e.preventDefault()
        redirect('/adminlogin')
        let user = {
            adminmail: adminmail,
            password: password


        }

        fetch('http://localhost:2222/adminregister', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((res) => res.json()).then((out) => {
            console.log(out);
            redirect('/adminlogin')
        })


    }






    return (
        <>
            <form method="post" onSubmit={addAdmin}>
                <MDBContainer fluid className="admin-login-container">

                    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                        <MDBCol col='12'>

                            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                    <h2 className="fw-bold mb-2 text-uppercase">ADMIN SIGNUP</h2>
                                    <p className="text-white-50 mb-5">Please Register Yourself</p>

                                    <MDBInput name="adminmail" onChange={(e) => setAdminmail(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Enter Email address' id='formControlLg' type='email' size="lg" />
                                    <MDBInput name="password" onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Enter Password' id='formControlLg' type='password' size="lg" />


                                    <div class="wrap">
                                        <button class="button">REGISTER</button><Link to='/adminlogin' ><button class="button">Go Back</button></Link>
                                    </div>




                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </form >
        </>
    );
}

export default Adminregister;