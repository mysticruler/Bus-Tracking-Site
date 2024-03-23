import React from "react";
import { Link } from "react-router-dom"
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Logo from './renker.png'
import Bus from './bus.jpg'


function Navbar() {




    return (

        <>

            <nav id="Navbar" class="navbar navbar-expand-lg navbar-dark " style={{ position: "fixed", left: "0", right: "0", zIndex: "5" }}>
                <div class="container-fluid">
                    <Link to="/"> <img src={Logo} style={{ width: "200px", marginLeft: "0", marginRight: "10px", marginTop: "0px", position: "relative" }} alt="link" /></Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li> */}
                        </ul>
                        <ul style={{ marginRight: "75px", color: "white" }} class="navbar-nav dropdown">
                            <label class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                LOGIN
                            </label>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to='/adminlogin' style={{ textDecoration: 'none' }}><a className="dropdown-item">Admin Login</a></Link></li>
                                <li><Link to='/operatorlogin' style={{ textDecoration: 'none' }}><a className="dropdown-item">Operator Login</a></Link></li>
                                <li><Link to='/userlogin' style={{ textDecoration: 'none' }}><a class="dropdown-item" >User Login</a></Link></li>
                            </ul>
                        </ul>

                    </div>
                </div>
            </nav>
            <div class="container">
                <div class="ticker">
                    <div class="title"><h5>ALERT</h5></div>
                    <div class="news-content">
                        <marquee>
                            Site maintenance ahead, the site will not be available on February 30, 2024. Sorry for the inconvenience
                        </marquee>
                    </div>
                </div>
            </div>



            <img src={Bus} style={{ width: '100%', height: '100vh' }} alt="bus" />

            <div id="ren">
                <p className="renk">RENKER</p>
                <div className="waviy">
                    <span style={{ '--i': 1 }}>Y</span>
                    <span style={{ '--i': 2 }}>o</span>
                    <span style={{ '--i': 3 }}>u</span>
                    <span style={{ '--i': 4 }}>r</span>
                    <span style={{ '--i': 5 }}>&nbsp;</span>
                    <span style={{ '--i': 6 }}>O</span>
                    <span style={{ '--i': 7 }}>n</span>
                    <span style={{ '--i': 8 }}>e</span>
                    <span style={{ '--i': 9 }}>&nbsp;</span>
                    <span style={{ '--i': 10 }}>T</span>
                    <span style={{ '--i': 11 }}>i</span>
                    <span style={{ '--i': 12 }}>m</span>
                    <span style={{ '--i': 13 }}>e</span>
                    <span style={{ '--i': 14 }}>&nbsp;</span>
                    <span style={{ '--i': 15 }}>B</span>
                    <span style={{ '--i': 16 }}>u</span>
                    <span style={{ '--i': 17 }}>s</span>
                    <span style={{ '--i': 18 }}>&nbsp;</span>
                    <span style={{ '--i': 19 }}>T</span>
                    <span style={{ '--i': 20 }}>r</span>
                    <span style={{ '--i': 21 }}>a</span>
                    <span style={{ '--i': 22 }}>c</span>
                    <span style={{ '--i': 23 }}>k</span>
                    <span style={{ '--i': 24 }}>i</span>
                    <span style={{ '--i': 25 }}>n</span>
                    <span style={{ '--i': 26 }}>g</span>
                    <span style={{ '--i': 27 }}>&nbsp;</span>
                    <span style={{ '--i': 28 }}>S</span>
                    <span style={{ '--i': 29 }}>o</span>
                    <span style={{ '--i': 30 }}>l</span>
                    <span style={{ '--i': 31 }}>u</span>
                    <span style={{ '--i': 32 }}>t</span>
                    <span style={{ '--i': 33 }}>i</span>
                    <span style={{ '--i': 34 }}>o</span>
                    <span style={{ '--i': 35 }}>n</span>
                </div>
            </div>



        </>
    );
}

export default Navbar;
