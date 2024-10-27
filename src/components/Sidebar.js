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

      <div style={{ marginBottom: '10px' }}>
        <h3 className="flex items-center font-semibold" style={{ fontSize: '16px', margin: '10px 0 0 0' }}>
          <MapPin size={16} className="pr-3" style={{ marginRight: '2px' }} />
          {eventData.location}
        </h3>
        <p style={{ fontSize: '16px', margin: '8px 0 0 0', color: '#333', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          <img 
            src={`${process.env.PUBLIC_URL}/images/clock.ico`} 
            alt="Clock Icon" 
            style={{ width: '16px', height: '16px', marginRight: '5px' }} 
          />
          {formatDateRange(new Date(eventData.start), new Date(eventData.end))}
        </p>
      </div>

      {/* Moved Niner Engage link above calendar links but below time */}
      <p style={{ fontSize: '16px', display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif', color: '#333', fontWeight: 'bold' }}>
        <img 
          src={`${process.env.PUBLIC_URL}/ninerEngageLogo.ico`} 
          alt="Niner Engage Logo" 
          style={{ width: '24px', height: '24px', marginRight: '8px' }} 
        />
        <a href={eventData.url} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'bold' }}>
          Niner Engage Link
        </a>
      </p>

      <p style={{ fontSize: '16px', display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif', color: '#333', fontWeight: 'bold' }}>
        <img 
          src={`${process.env.PUBLIC_URL}/images/gcal.ico`} 
          alt="Google Calendar Icon" 
          style={{ width: '24px', height: '24px', marginRight: '8px' }} 
        />
        <a href={eventData.gcal} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'bold' }}>Add to Google Calendar</a>
      </p>
      <p style={{ fontSize: '16px', display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif', color: '#333', fontWeight: 'bold' }}>
        <img 
          src={`${process.env.PUBLIC_URL}/images/ical.ico`} 
          alt="iCal Icon" 
          style={{ width: '24px', height: '24px', marginRight: '8px' }} 
        />
        <a href={eventData.ical} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'bold' }}>Add to Outlook or iCal</a>
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
            cursor: 'pointer',
          }}
        >
          Navigate
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
