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

// LocationMarker component to handle user location
const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 15 })
      .on('locationfound', (e) => {
        setPosition(e.latlng);
        map.setView(e.latlng, 15);
      })
      .on('locationerror', (e) => {
        setError(e.message);
        alert(e.message);
      });
  }, [map]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here!</Popup>
    </Marker>
  ) : null;
};

const OSMMap = () => {
  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className="w-full h-full"
      >
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default OSMMap;