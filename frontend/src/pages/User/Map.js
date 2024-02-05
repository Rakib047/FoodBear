import React, { useState,useRef, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

const GoogleMap = () => {
  const [showModal, setShowModal] = useState(false);
  const [latitude,setLatitude]=useState("")
  const [longitude,setLongitude]=useState("")
  const apiKey = "AIzaSyBzg7NzFmIXnrDx_ectt8aYFtfsTcvuSq0"
  const markerRef = useRef(null)

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const handleMarkerDragEnd = () => {
    if (markerRef.current) {
      const newLatLng = markerRef.current.getPosition(); // Get new position
      setLatitude(newLatLng.lat()); // Update latitude state
      setLongitude(newLatLng.lng());
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
