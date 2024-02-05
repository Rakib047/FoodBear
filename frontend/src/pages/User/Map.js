import React, { useState,useRef, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const GoogleMap = () => {
  const [showModal, setShowModal] = useState(false);
  const [latitude,setLatitude]=useState("")
  const [longitude,setLongitude]=useState("")
  const apiKey = "AIzaSyBzg7NzFmIXnrDx_ectt8aYFtfsTcvuSq0"
  const markerRef = useRef(null)
  const [locationName, setLocationName] = useState("");

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getLocationName = async (lat, lng) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const { results } = response.data;
      if (results && results.length > 0) {
        setLocationName(results[0].formatted_address);
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };


  const handleMarkerDragEnd = () => {
    if (markerRef.current) {
      const newLatLng = markerRef.current.getPosition(); // Get new position
      setLatitude(newLatLng.lat()); // Update latitude state
      setLongitude(newLatLng.lng());
      getLocationName(newLatLng.lat(), newLatLng.lng());

      console.log(newLatLng)
    }
  };

  const handleApiLoaded = (map, maps) => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        markerRef.current = new maps.Marker({
            position: center,
            map,
            title: 'You are here!',
            draggable: true // Make the marker draggable
          });
          markerRef.current.addListener('dragend', handleMarkerDragEnd);
          map.panTo(center);
          getLocationName(center.lat, center.lng);
      });
    }
  };

//   useEffect(() => {
//     const marker = markerRef.current;
//     if (marker) {
//         console.log("here----")
//       marker.addListener('dragend', handleMarkerDragEnd);
//       return () => {
//         marker.removeListener('dragend', handleMarkerDragEnd);
//       };
//     }
//   }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Map Modal
      </Button>
      <p>{latitude}</p>
      <p>{longitude}</p>
      <p>{locationName}</p>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Google Map Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '400px', width: '100%' }}>
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: apiKey }}
              defaultCenter={{ lat: 0, lng: 0 }}
              defaultZoom={11}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GoogleMap;
