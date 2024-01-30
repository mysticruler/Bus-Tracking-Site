import React from "react";
import { Link } from "react-router-dom"
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Logo from './renker.png'
import Bus from './bus.jpg'



function NavbarOne() {
    

    return (

        <>

            <nav id="Navbar" class="navbar navbar-expand-lg navbar-dark " style={{ position: "fixed", left: "0", right: "0", zIndex: "5" }}>
                <div class="container-fluid">
                    <Link to="/"> <img src={Logo} style={{ width: "200px", marginLeft: "0", marginRight: "10px", marginTop: "0px", position: "relative" }} /></Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <img src={Bus} style={{ width: '100%', height: '100vh' }} />



        </>
    );
}

export default NavbarOne;
