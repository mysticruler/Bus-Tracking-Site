import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarOne from "../NavbarOne";
import "./findmytrip.css"; // Import the CSS file
import LocationModal from "./LocationModal"; // Import the LocationModal component

function Findmytrip() {
  const [pickupCity, setPickupCity] = useState("");
  const [dropCity, setDropCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedTrip, setSelectedTrip] = useState(null); // State to store selected trip details
  const redirect = useNavigate();

  const handleSearch = () => {
    const pickupCityLower = pickupCity.toLowerCase();
    const dropCityLower = dropCity.toLowerCase();

    console.log("Searching for trips with pickup city:", pickupCityLower);
    console.log("Searching for trips with drop city:", dropCityLower);

    fetch(`http://localhost:2222/tripsearch?pickupCity=${pickupCityLower}&dropCity=${dropCityLower}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Search results:", data); // Logging fetched data
        setSearchResults(data);
      })
      .catch((error) => console.error("Error searching trips:", error));
  };

  const handleLogout = () => {
    localStorage.clear();
    redirect("/userlogin");
    window.location.reload();
  };

  const showLocation = (index) => {
    setSelectedTrip(searchResults[index]); // Set the selected trip details
    setShowModal(true); // Set showModal to true when button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Set showModal to false to close modal
  };

  return (
    <>
      <NavbarOne />
      <div className="app">
        <div className="transparent-table-container">
          <button
            id="logout"
            type="button"
            className="btn btn-outline-primary logout-btn"
            onClick={handleLogout}
          >
            LOGOUT
          </button>

          <h3 className="find-trip-header">FIND YOUR TRIP HERE</h3>

          <table className="table table-dark">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Bus ID</th>
                <th className="text-center">Bus Image</th>
                <th className="text-center">Operator Name</th>
                <th className="text-center">Contact Number</th>
                <th className="text-center">Source</th>
                <th className="text-center">Destination</th>
                <th className="text-center">Departure Time</th>
                <th className="text-center">Arrival Time</th>
                <th className="text-center">Bus info</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((trip, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{trip.busid}</td>
                  <td className="text-center">
                    <img
                      src={trip.image}
                      alt="BUS COMES HERE"
                      className="bus-image"
                    />
                  </td>
                  <td className="text-center">{trip.operatorname}</td>
                  <td className="text-center">{trip.contactnumber}</td>
                  <td className="text-center">{trip.stops[0]}</td>
                  <td className="text-center">{trip.destination}</td>
                  <td className="text-center">{trip.departuretime}</td>
                  <td className="text-center">{trip.arrivaltime}</td>
                  <td className="text-center">
                    {" "}
                    <button
                      style={{ marginTop: "-7.5px" }}
                      type="button"
                      className="btn btn-dark"
                      onClick={() => showLocation(index)}
                    >
                      Show Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="search-section">
            <label className="search-label">Search Your Trip Here</label>
            <div className="search-inputs">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Enter Pickup City"
                value={pickupCity}
                onChange={(e) => {
                  console.log("Pickup city:", e.target.value); // Logging input value
                  setPickupCity(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Enter Drop City"
                value={dropCity}
                onChange={(e) => {
                  console.log("Drop city:", e.target.value); // Logging input value
                  setDropCity(e.target.value);
                }}
              />
              <button
                type="button"
                className="btn btn-danger search-btn"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for displaying location */}
      {showModal && <LocationModal trip={selectedTrip} closeModal={closeModal} />}
    </>
  );
}

export default Findmytrip;
