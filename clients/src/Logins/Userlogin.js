import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
} from 'mdb-react-ui-kit';
import './Alllogin.css';
import './User.css';

function Userlogin() {
    const redirect = useNavigate();
    const [usermail, setUsermail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/userlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usermail, password }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login response:', data);

                if (data.status === 'success') {
                    console.log('Login successful');

                    // Store user type in localStorage
                    localStorage.setItem('userType', data.userType);

                    redirect('/findmytrip');
                    window.location.reload()
                } else {
                    console.log('Login failed:', data.message);
                }
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <MDBContainer fluid className="user-login-container">
                    <MDBRow className="d-flex justify-content-center align-items-center h-100">
                        <MDBCol col="12">
                            <MDBCard
                                className="bg-dark text-white my-5 mx-auto"
                                style={{ borderRadius: '1rem', maxWidth: '400px' }}
                            >
                                <button
                                    id="button"
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                >
                                    <Link
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        to="/"
                                    >
                                        {' '}
                                        BACK TO MAIN SCREEN
                                    </Link>
                                </button>

                                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                                    <h2 className="fw-bold mb-2 text-uppercase">User Login</h2>
                                    <p className="text-white-50 mb-5">
                                        Please enter your login and password!
                                    </p>

                                    <MDBInput
                                        type="email"
                                        value={usermail}
                                        onChange={(e) => setUsermail(e.target.value)}
                                        wrapperClass="mb-4 mx-5 w-100"
                                        labelClass="text-white"
                                        label="Email address"
                                        id="formControlLg"
                                        size="lg"
                                    />
                                    <MDBInput
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        wrapperClass="mb-4 mx-5 w-100"
                                        labelClass="text-white"
                                        label="Password"
                                        id="formControlLg"
                                        size="lg"
                                    />

                                    <p className="small mb-3 pb-lg-2">
                                        <a href="#!" className="text-white-50">
                                            Forgot password?
                                        </a>
                                    </p>
                                    <div className="wrap">
                                        <button className="button" type="submit">
                                            Submit
                                        </button>
                                    </div>

                                    <div className="d-flex flex-row mt-3 mb-5">
                                        <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'white' }}>
                                            <MDBIcon fab icon="facebook-f" size="lg" />
                                        </MDBBtn>

                                        <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'white' }}>
                                            <MDBIcon fab icon="twitter" size="lg" />
                                        </MDBBtn>

                                        <MDBBtn tag="a" color="none" className="m-3" style={{ color: 'white' }}>
                                            <MDBIcon fab icon="google" size="lg" />
                                        </MDBBtn>
                                    </div>

                                    <div>
                                        <p className="mb-0">
                                            Don't have an account?{' '}
                                            <Link to="/userregister">
                                                <a
                                                    href="#!"
                                                    style={{ textDecoration: 'underline #222529' }}
                                                    className="text-white-50 fw-bold"
                                                >
                                                    Sign Up
                                                </a>
                                            </Link>
                                        </p>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </form>
        </>
    );
}

export default Userlogin;
