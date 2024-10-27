import React, { useEffect } from 'react';
import ReadMoreText from './ReadMoreText';
import { MapPin } from 'lucide-react';
import { formatDateRange } from '../utils/dateUtils';

const Sidebar = ({ eventData, onClose, isOpen, map }) => {
  useEffect(() => {
    if (isOpen) {
      map.scrollWheelZoom.disable(); // Disable scroll wheel zoom when sidebar is open
      document.querySelector('.overlay-panel').addEventListener('wheel', (e) => {
        e.stopPropagation();
      });
    } else {
      map.scrollWheelZoom.enable(); // Enable scroll wheel zoom when sidebar is closed
    }
  }, [isOpen, map]);

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <h1>{eventData.name}</h1>
      <h3>{eventData.host}</h3>
      <ReadMoreText text={eventData.description} maxLength={100} />

      <h3 className="flex items-center gap-6 font-semibold" style={{ fontSize: '16px', marginBottom: '10px' }}>
        <MapPin size={16} className="pr-3" style={{ paddingRight: '5px' }} />
        {eventData.location}
      </h3>
      <p>{formatDateRange(new Date(eventData.start), new Date(eventData.end))}</p>

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
};

export default Sidebar;
