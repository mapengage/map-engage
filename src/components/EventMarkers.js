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

const EventMarkers = ({ events, onEventClick, filterStartDate, filterEndDate }) => {
  // Convert filter dates to Date objects if necessary
  const startDate = filterStartDate instanceof Date ? filterStartDate : new Date(filterStartDate);
  const endDate = filterEndDate instanceof Date ? filterEndDate : new Date(filterEndDate);
  console.log(isNaN(startDate));
  console.log(isNaN(endDate));
  console.log("Filter Dates:", startDate, endDate);
  console.log("Events to Filter:", events);

  return (
    <>
      {events
        .filter(event => {
          const eventStartDate = new Date(event.start);
          const eventEndDate = new Date(event.end);
          
          // Log each event being filtered
          console.log("Event Start Date:", eventStartDate, "| Event End Date:", eventEndDate);

          // Filter events by comparing start and end dates
          console.log(events.name);
          console.log(eventStartDate.getTime());
          console.log(eventEndDate.getTime());
          console.log(startDate.getTime());
          console.log(endDate.getTime());
          return eventStartDate.getTime() >= startDate.getTime() && eventEndDate.getTime() <= endDate.getTime();
        })
        .map((event, index) => {
          // Ensure that the lat and lng properties are defined
          if (!event.lat || !event.lng) {
            console.warn(`Event ${event.name} is missing coordinates.`);
            return null; // Skip rendering this marker
          }
          
          return (
            <Marker
              key={index}
              position={[event.lat, event.lng]}
              icon={eventIcon}
              eventHandlers={{
                click: () => onEventClick(event),
              }}
            />
          );
        })}
    </>
  );
};

export default EventMarkers;
