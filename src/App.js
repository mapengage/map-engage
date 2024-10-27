import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import './App.css';
import events from './data/events.json';
import ReadMoreText from './components/ReadMoreText.js';
events = events.concat(
  {
    "name": "Japan Summer Program 2025",
    "start": "2025-05-17T00:00:00+00:00",
    "end": "2025-06-15T00:00:00+00:00",
    "name": "Tokyo Studio, Japan",
    "lat": 35.64126013351904, 
    "lng": 139.60309040974118,
    "url": "https://coaa.charlotte.edu/architecture/study-abroad/japan-summer-program/",
    "description": "The Japan Summer Program is a study abroad experience for architecture students, featuring visits to architectural sites, including Tokyo and World Expo 2025 in Osaka. Led by Professor Chris Jarrett, the program includes coursework, site visits, and collaborations with Meiji University."
    },
    {
      "name": "Kyoto Summer Study Program 2025",
      "start": "2025-06-20T00:00:00+00:00",
      "end": "2025-07-20T00:00:00+00:00",
      "location": "Kyoto Cultural Exchange, Japan",
      "lat": 35.011564, 
      "lng": 135.768149,
      "url": "https://coaa.charlotte.edu/architecture/study-abroad/kyoto-summer-program/",
      "description": "The Kyoto Summer Study Program offers students an immersive experience in Japanese culture, history, and architecture. Led by Professor Aiko Yamamoto, the program includes coursework, visits to historic temples, gardens, and traditional Kyoto neighborhoods, as well as workshops in Japanese design practices and collaborations with Kyoto University."
  }
  ,
  {
    "name": "Eiffel Tower Visit Experience 2025",
    "start": "2025-07-10T09:00:00+00:00",
    "end": "2025-07-10T17:00:00+00:00",
    "location": "Eiffel Tower, Paris, France",
    "lat": 48.8584830111012, 
    "lng": 2.2949962805797743,
    "url": "https://www.toureiffel.paris/en",
    "description": "Join us for a guided exploration of the iconic Eiffel Tower, where we’ll learn about its history, design, and cultural significance. This event includes a tour of the tower's various levels, insights into Parisian architecture, and panoramic views of the city. Perfect for architecture and history enthusiasts alike."
  }
);


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
// BurgerSide component to show event details or menu options
const BurgerSide = ({ eventData, isOpen, onClose }) => (
  <div className={`burger-side ${isOpen ? 'burger-side-open' : ''}`}>
    <button className="burgerclosebtn" onClick={onClose}>X</button>
    {eventData ? (
      <>
        <h3>{eventData.name}</h3>
        <p>{eventData.description}</p>
        <button
          onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${eventData.lat},${eventData.lng}`, '_blank')}
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
      </>
    ) : (
      <p>Select an event to see details</p>
    )}
  </div>
);
// Sidebar component to show event details
const Sidebar = ({ eventData, onClose, isOpen }) => (
  <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
    <button className="close-btn" onClick={onClose}>X</button>
    <h1>{eventData.name}</h1>
    <h3>{eventData.host}</h3>
    <ReadMoreText text={eventData.description} maxLength={100} />

    
    <h3>{eventData.location}</h3>

    <p>{ formatDateRange(new Date(eventData.start), new Date(eventData.end))}</p>

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
    setPosition(studentUnionCoords);
    map.setView(studentUnionCoords, 17);
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsSidebarOpen(true);
  };
  const getCurrentLocation = () => {
    map.locate({ setView: true, maxZoom: 17 })
      .on('locationfound', (e) => {
        setPosition(e.latlng);
        map.setView(e.latlng, 17);
      })
      .on('locationerror', (e) => {
        alert(`Location access denied: ${e.message}`);
      });
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
      <button
        onClick={getCurrentLocation}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        Current Location
      </button>
    </>
  );
};

const BurgerMenu = ({ onToggle }) => (
  <button
    onClick={onToggle}
    className="burger-menu"
  >
    ☰
  </button>
);
function App() {
  const [isBurgerSideOpen, setIsBurgerSideOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsBurgerSideOpen(true);
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[35.307, -80.735]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LocationMarker onEventSelect={handleEventClick} />
      </MapContainer>

      <BurgerMenu onToggle={() => setIsBurgerSideOpen((prev) => !prev)} />

      <BurgerSide
        eventData={selectedEvent}
        isOpen={isBurgerSideOpen}
        onClose={() => setIsBurgerSideOpen(false)}
      />
    </div>
  );
}

function formatDateRange(startDate, endDate) {
  // Helper function to format hours and minutes
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // convert to 12-hour format and handle midnight
    return `${hours}:${minutes} ${ampm}`;
  };

  // Format the date (month/day)
  const month = startDate.getMonth() + 1; // getMonth() is zero-based
  const day = startDate.getDate();

  // Format the time ranges
  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  // Combine to the desired format
  return `${month}/${day} ${startTime} to ${endTime}`;
}

export default App;
