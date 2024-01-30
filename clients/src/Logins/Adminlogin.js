import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import './Alllogin.css'
import './Admin.css'

function Adminlogin() {
    const redirect = useNavigate();
    const [adminmail, setAdminmail] = useState('');
    const [password, setPassword] = useState('');

    const handleadminLogin = async () => {
        try {
            const response = await fetch('http://localhost:2222/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminmail, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login response:', data);

                if (data.status === 'success') {
                    console.log('Login successful');

                    redirect('/Admin');
                } else {
                    console.log('Login failed:', data.message);


                }
            } else {
                console.log('Login failed');

            }
        } catch (error) {
            console.error('Error during login:', error);

        }
    }











    return (
        <><div className="admin-login-container" >
            <form onSubmit={(e) => {
                e.preventDefault();
                handleadminLogin();
            }}>

                <MDBContainer fluid className="admin-login-container" >
                

                    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                        <MDBCol col='12'>

                            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                                <button id="button" type="button" class="btn btn-outline-secondary btn-sm"><Link style={{ textDecoration: 'none', color: "white" }} to='/'> BACK TO MAIN SCREEN</Link></button>
                                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>


                                    <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                    <MDBInput type="email" value={adminmail} onChange={(e) => setAdminmail(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='formControlLg' size="lg" />
                                    <MDBInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' size="lg" />

                                    <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                                    <div class="wrap">
                                        <button class="button" type="submit">Submit</button>
                                    </div>


                                    <div className='d-flex flex-row mt-3 mb-5'>
                                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                            <MDBIcon fab icon='facebook-f' size="lg" />
                                        </MDBBtn>

                                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                            <MDBIcon fab icon='twitter' size="lg" />
                                        </MDBBtn>

                                        <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                                            <MDBIcon fab icon='google' size="lg" />
                                        </MDBBtn>
                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <Link to='/adminregister'>
                                            <a href="#!" style={{ textDecoration: "underline #222529" }} class="text-white-50 fw-bold">Sign Up</a>
                                        </Link></p>

                                    </div>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </form>
            </div>
        </>
    );
}

export default Adminlogin;