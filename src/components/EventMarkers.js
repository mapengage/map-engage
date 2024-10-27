import React from 'react';
import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';

// Custom icon for the event markers
const eventIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1673/1673188.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const EventMarkers = ({ events, onEventClick, filterStartDate, filterEndDate }) => (
  <>
    {events
    .filter(events => {
      return (
        new Date(events.start) >= new Date(filterStartDate) &&
        new Date(events.end) <= new Date(filterEndDate)
    )
    })
    .map((event, index) => (
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

export default EventMarkers;
