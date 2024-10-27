import React, { useEffect } from 'react';
import ReadMoreText from './ReadMoreText';
import { MapPin } from 'lucide-react';
import { formatDateRange } from '../utils/dateUtils';

const Sidebar = ({ eventData, onClose, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Enable body scroll
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to reset overflow on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

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

      <p> <a href={eventData.gcal} target="_blank" rel="noopener noreferrer">Google Calendar</a></p>
      <p> <a href={eventData.ical} target="_blank" rel="noopener noreferrer">iCal</a></p>

    </div>
  );
};

export default Sidebar;
