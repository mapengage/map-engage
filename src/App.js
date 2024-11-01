import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import './App.css';
import BurgerSide from './components/BurgerSide';
import Sidebar from './components/Sidebar';
import EventMarkers from './components/EventMarkers';
// import LocationMarker from './components/LocationMarker';

import events from './data/events.json';
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
    }
);

// Fix for default marker icon in react-leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const LocationMarker = ({filterDateStart, filterDateEnd}) => {
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
      <EventMarkers 
        events={events} 
        onEventClick={handleEventClick} 
        filterStartDate={filterDateStart} 
        filterEndDate={filterDateEnd}
      />

      {/* Sidebar showing selected event details */}
      {selectedEvent && (
        <Sidebar
          eventData={selectedEvent}
          onClose={() => setIsSidebarOpen(false)}
          isOpen={isSidebarOpen}
          map={map}
        />
      )}
      <button
        onClick={getCurrentLocation}
        style={{
          position: 'absolute',
          bottom: '50px',
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
  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);

  const [isBurgerSideOpen, setIsBurgerSideOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterDateStart, setFilterDateStart] = useState(new Date());
  const [filterDateEnd, setFilterDateEnd] = useState(endOfYear);
  

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsBurgerSideOpen(true);
  };

  const filterNextWeekEvents = () => {
    // Implement this function to filter events for the next week
    //alert('Filtering events for next week');
    const today = new Date();
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - today.getDay()) % 7);
    nextSunday.setHours(0, 0, 0, 0);

    const nextSaturday = new Date(nextSunday);
    nextSaturday.setDate(nextSunday.getDate() + 6);
    nextSaturday.setHours(23, 59, 59, 999);

    setFilterDateStart(nextSunday);
    setFilterDateEnd(nextSaturday);

    //console.log('Filtering events from', nextSunday, 'to', nextSaturday);
  };
  const filterTodayEvents = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Move to the next day
    setFilterDateStart(today);
    setFilterDateEnd(tomorrow);
  };
  const filterTomorrowEvents = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Move to the next day
    //alert("filtering for tomorrow's date", tomorrow);
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1); // Day after tomorrow
    setFilterDateStart(tomorrow);
    setFilterDateEnd(dayAfterTomorrow);
  }
 
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
        <LocationMarker filterDateStart={filterDateStart} filterDateEnd={filterDateEnd} />
      </MapContainer>

      <BurgerMenu onToggle={() => setIsBurgerSideOpen((prev) => !prev)} />

      <BurgerSide
        eventData={selectedEvent}
        isOpen={isBurgerSideOpen}
        onClose={() => setIsBurgerSideOpen(false)}
        filterNextWeekEvents={filterNextWeekEvents}
        filterTodayEvents={filterTodayEvents}
        filterTomorrowEvents={filterTomorrowEvents}
      />
    </div>
  );
}

export default App;
