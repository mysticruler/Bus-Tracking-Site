import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarOne from "../NavbarOne";
import busoppImage from './busopp.jpg'
import bususerImage from './bususer.jpg'
import './All.css'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';


function Admin() {

    return (
        <>
            <NavbarOne />
            <div className="admin">
                <table>
                    <tr>
                        <td>

                            <MDBCard class="tableone">
                                <MDBCardImage src={busoppImage} position='top' style={{ height: "300px", width: "250px" }} />
                                <MDBCardBody>
                                    <Link to="/operatorsettings"> <button class="btn btn-secondary">VIEW OPERATOR SETTINGS</button></Link>
                                </MDBCardBody>
                            </MDBCard>

                        </td>
                        <td class="tabletwo">

                            <MDBCard class="tabletwo">
                                <MDBCardImage src={bususerImage} position='top' style={{ height: "300px", width: "250px" }} />
                                <MDBCardBody>
                                    <Link to="/usersettings"> <button class="btn btn-secondary">VIEW USER SETTINGS</button></Link>
                                </MDBCardBody>
                            </MDBCard>
                        </td>
                    </tr>
                </table>




            </div>
        </>
    )
}


export default Admin