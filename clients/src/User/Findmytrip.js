import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import NavbarOne from "../NavbarOne";




function Findmytrip() {

  const [info, setInfo] = useState("")
  const [name, setName] = useState('')
  const [operatorname, setOperatorname] = useState('')
  const [cases, setCase] = useState('')

  const navigate = useNavigate();



  const findTrip = () => {

    fetch(`https://disease.sh/v3/covid-19/countries/${info}`)
      .then((res) => res.json())
      .then((data) => {



        setName(data.country)

        console.log(data.country);
      })
  }


  // const handleLogout = () => {
  //   fetch("http://localhost:2222/userlogout", {
  //     method: "POST",
  //     credentials: 'include', 
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Logout response:', data);
  //       if (data.status === 'success') {
  //         console.log('Logout successful');
         
  //       } else {
  //         console.log('Logout failed:', data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error during logout:", error);
  //     });
  // };
  

  // const findTrip = () => {

  //   fetch(`http://localhost:2222/tripsearch/${info}`)
  //     .then((res) => res.json())
  //     .then((data) => {



  //       setName(data.busid)

  //       console.log(data.country);
  //     })
  // }





  return (

    <>
      <NavbarOne />

      <div id="Trips" className="transparent-table-container">
       <Link to="/"> <button type="button" style={{ marginTop: "-138px", marginLeft: "1500px", position: "absolute", zIndex: 5 }} className="btn btn-outline-primary">LOGOUT</button></Link>


        <table className="table table-dark">
          <thead>
            <th>
              <h3 style={{ fontFamily: 'Times New Roman, serif' }}>
                FIND YOUR TRIP HERE
                <Link to='/tripsadding' style={{ marginLeft: "1200px" }}><IoIosAddCircle /></Link>
              </h3>
            </th>
          </thead>
        </table>

        <table className="table table-dark">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Bus ID</th>
              <th className="text-center">operatorname</th>
              <th className="text-center">contactnumber</th>
              <th className="text-center">Source</th>
              <th className="text-center">Destination</th>
              <th className="text-center">Next Stop</th>
              <th className="text-center">Departure Time</th>
              <th className="text-center">Arrival Time</th>
              <th className="text-center">Actions</th>



            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center"></td>
              <td className="text-center"></td>
              <td className="text-center"></td>
              <td className="text-center">{name}</td>
              <td className="text-center">{operatorname}</td>
              <td className="text-center"></td>
              <td className="text-center"></td>
              <td className="text-center"></td>
              <td className="text-center"></td>

              <td className="text-center">{<button type="button" class="btn btn-dark">Delete</button>}
                <Link to='/flightsupdate' >
                  <button type="button" class="btn btn-dark">Update</button></Link></td>


            </tr>

          </tbody>
        </table>

        <table>
          <thead>
            <th>
              <h3 style={{ fontFamily: 'Times New Roman, serif' }}>



                <div className="input-group mb-3">
                  <label style={{ marginRight: "10px" }}>Search Your Trip Here</label>
                  <input type="text" value={info} onChange={(e) => { setInfo(e.target.value) }} className="form-control rounded" />
                  <button type="submit" className="btn btn-primary rounded" onClick={findTrip}>Search</button>
                </div>


              </h3>
            </th>
          </thead>
        </table>
      </div>


    </>
  )
}



export default Findmytrip












