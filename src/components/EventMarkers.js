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
      console.log("Filtering events ", filterStartDate, filterEndDate);
      console.log('filterStartDate is type of Date:', filterStartDate instanceof Date);
      console.log('filterStartDate is type of String:', filterStartDate instanceof String);
      console.log('Type of filterStartDate:', typeof filterStartDate);

      console.log('events start', events.start)
      console.log('events end', events.end)
      return (

        // to pass filterStartDate as String, use new Date(filterStartDate) so comparison works
        // new Date(events.start) >= new Date('10-27-2024') &&
        // new Date(events.end) <= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        new Date(events.start) >= filterStartDate.filterStartDate &&
        new Date(events.end) <= filterEndDate.filterEndDate
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
