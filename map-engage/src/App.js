import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import './App.css';
import events from './data/events.json';
// Fix for default marker icon in react-leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for the event markers
const eventIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Sidebar component to show event details
const Sidebar = ({ eventData, onClose, isOpen }) => (
  <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
    <button className="close-btn" onClick={onClose}>X</button>
    <h3>{eventData.eventName}</h3>
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

// EventMarkers component to place multiple event markers on the map
const EventMarkers = ({ events, onEventClick }) => (
  <>
    {events.map((event, index) => (
      <Marker
        key={index}
        position={[event.lat, event.lng]}
        icon={eventIcon}
        eventHandlers={{
          click: () => onEventClick(event)
        }}
      />
    ))}
  </>
);
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const map = useMap();
  const studentUnionCoords = { lat: 35.30881988721451, lng: -80.73359802880277}; 

  useEffect(() => {
    /*map.locate({ setView: true, maxZoom: 15 })
      .on('locationfound', (e) => {
        setPosition(e.latlng);
        map.setView(e.latlng, 15);
      })
      .on('locationerror', (e) => {
        alert(`Location access denied: ${e.message}`);
      });
  }, [map]);*/
    setPosition(studentUnionCoords);
    map.setView(studentUnionCoords, 15);
  }, [map]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsSidebarOpen(true);
  };

  return (
    <>
      {/* User's current location marker */}
      {position && (
        <Marker position={position}>
          {/* Optional popup or custom icon */}
        </Marker>
      )}

      {/* Render markers for each event */}
      <EventMarkers events={events} onEventClick={handleEventClick} />

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
  const worldBounds = [
    [-90, -180], // Southwest corner
    [90, 180],   // Northeast corner
  ];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[35.307, -80.735]}
        zoom={2} // Starting zoom
        minZoom={2} // Prevents zooming out too far
        maxZoom={18} // Adjust based on your needs
        maxBounds={worldBounds}
        maxBoundsViscosity={1.0} // Ensures the map "bounces" back when attempting to pan outside bounds
        style={{ height: '100%', width: '100%' }}
      >
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
