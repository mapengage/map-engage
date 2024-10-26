import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import buildings from './data/building_locations.json';

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
  iconSize: [32, 32], // Adjust size of the icon as needed
  iconAnchor: [16, 32], // Anchor the icon's bottom to its location
  popupAnchor: [0, -32] // Position the popup above the icon
});

// LocationMarker component to display user's location and a nearby destination marker
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 15 })
      .on('locationfound', (e) => {
        const currentPos = e.latlng;
        setPosition(currentPos);

        // building destination
        const destination = buildings.buildings.find(building => building.name === 'Atkins Library');

        // Set the destination location close to current location
        const destinationPos = {
          lat: destination.latitude,
          lng: destination.longitude
        };
        setDestination(destinationPos);

        // Center map on user’s location
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
      
      {/* Destination marker with custom pin icon */}
      {destination && (
        <Marker position={destination} icon={destinationIcon}>
          <Popup>Destination</Popup>
        </Marker>
      )}
    </>
  );
};

function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
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
