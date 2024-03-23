import React, { useEffect, useState } from "react";
import "./model.css"; // Import the CSS file

function LocationModal({ closeModal, trip }) {
  const [stops, setStops] = useState([""]);

  useEffect(() => {
    // Initialize the map
    const mapOptions = {
      center: { lat: 0, lng: 0 }, // Default center
      zoom: 15, // Adjust the zoom level as needed
    };
    const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          map.setCenter(userLocation);
          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="modal display-block">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">BUS ID</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{trip && trip.busid}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">OPERATOR NAME</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{trip && trip.operatorname}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">CONTACT NUMBER</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{trip && trip.contactnumber}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">SOURCE</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{trip && trip.source}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">DESTINATION</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{trip && trip.destination}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">DEPARTURE TIME</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{trip && trip.departuretime}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">ARRIVAL TIME</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{trip && trip.arrivaltime}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-7">
                    <p className="mb-0">STOPS</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      <div className="stops-wrapper">
                        {trip && trip.stops && (
                          <span>
                            {trip.stops.map((stop, stopIndex) => (
                              <span key={stopIndex}>
                                {stopIndex > 0 && ", "} {/* Add comma for all stops except the first one */}
                                {stop}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div id="map" className="map-container" ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationModal;
