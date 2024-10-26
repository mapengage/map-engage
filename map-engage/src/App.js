import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon in react-leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for the destination marker
const destinationIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png', // URL to a custom pin icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// LocationMarker component to display user's location and a nearby destination marker
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const map = useMap();

  // Event data for the destination marker
  const eventData = {
    name: "UNCC Event",
    description: "Join us for an exciting event at UNCC!",
    lat: 35.3084, // Replace with destination latitude
    lng: -80.7336 // Replace with destination longitude
  };

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 15 })
      .on('locationfound', (e) => {
        const currentPos = e.latlng;
        setPosition(currentPos);

        // Set the destination location close to current location
        const destinationPos = {
          lat: currentPos.lat + 0.001,
          lng: currentPos.lng + 0.001
        };
        setDestination(destinationPos);

        map.setView(currentPos, 15);
      })
      .on('locationerror', (e) => {
        alert(`Location access denied: ${e.message}`);
      });
  }, [map]);

  return (
    <>
      {/* User's current location marker */}
      {position && (
        <Marker position={position}>
          <Popup>You are here!</Popup>
        </Marker>
      )}

      {/* Destination marker with custom pin icon and popup content */}
      {destination && (
        <Marker position={destination} icon={destinationIcon}>
          <Popup>
            <h3>{eventData.name}</h3>
            <p>{eventData.description}</p>
            <button
              onClick={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${eventData.lat},${eventData.lng}`;
                window.open(url, '_blank');
              }}
              style={{
                padding: '8px 12px',
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Navigate
            </button>
          </Popup>
        </Marker>
      )}
    </>
  );
};

function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[35.307, -80.735]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default App;
