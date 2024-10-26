import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import './App.css'; // Create and import App.css for sidebar styling

// Fix for default marker icon in react-leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for the destination marker
const destinationIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Sidebar component to show event details
const Sidebar = ({ eventData, onClose, isOpen }) => (
  <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
    <button className="close-btn" onClick={onClose}>X</button>
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
  </div>
);

// LocationMarker component to display user's location and a nearby destination marker
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]); 
  const map = useMap();

  // Event data for the destination marker
  const eventData = {
    name: "UNCC Event",
    description: "Join us for an exciting event at UNCC!",
    lat: 35.3084,
    lng: -80.7336
  };
  useEffect(() => {
    fetch("events.json") // Path to JSON file
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error("Error loading event data:", error));
  }, []);

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 15 })
      .on('locationfound', (e) => {
        const currentPos = e.latlng;
        setPosition(currentPos);

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
          {/* Optional popup or custom icon */}
        </Marker>
      )}

      {/* Destination marker with custom pin icon */}
      {destination && (
        <Marker
          position={destination}
          icon={destinationIcon}
          eventHandlers={{
            click: () => setIsSidebarOpen(true)
          }}
        />
      )}

      {/* Render markers for each event */}
      {events.map((event, index) => (
        <Marker
          key={index}
          position={[event.lat, event.lng]}
          icon={destinationIcon}
          eventHandlers={{
            click: () => {
              setSelectedEvent(event);
              setIsSidebarOpen(true);
            }
          }}
        />
      ))}

      {/* Sidebar showing selected event details */}
      {selectedEvent && (
        <Sidebar
          eventData={selectedEvent}
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
        />
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
