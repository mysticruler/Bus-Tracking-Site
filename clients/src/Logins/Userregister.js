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
import { useNavigate } from 'react-router-dom';

function Userregister() {



    const redirect = useNavigate()
    const [usermail, setUsermail] = useState('')
    const [password, setPassword] = useState('')

    const addUser = (e) => {

        e.preventDefault()
        redirect('/userlogin')
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

            <form method="post" onSubmit={addUser}>
                <MDBContainer fluid className="user-login-container">

                    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                        <MDBCol col='12'>

                            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                                    <h2 className="fw-bold mb-2 text-uppercase">USER SIGNUP</h2>
                                    <p className="text-white-50 mb-5">Please Register Yourself</p>

                                    <MDBInput name="usermail" onChange={(e) => setUsermail(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Enter Email address' id='formControlLg' type='email' size="lg" />
                                    <MDBInput name="password" onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Enter Password' id='formControlLg' type='password' size="lg" />


                                    <div class="wrap">
                                        <button class="button">REGISTER</button><Link to='/userlogin' ><button class="button">Go Back</button></Link>
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

export default Userregister;