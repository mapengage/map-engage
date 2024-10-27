import React from 'react';
import EventMarkers from './EventMarkers';

const BurgerSide = ({ 
  eventData, 
  isOpen, 
  onClose, 
  filterNextWeekEvents, 
  filterTodayEvents, 
  filterTomorrowEvents 
}) => (
  <div className={`burger-side ${isOpen ? 'burger-side-open' : ''}`} style={{ left: 0 }}>
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
      <p></p>
    )}

    {/* Icon above buttons */}
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="Event Icon" style={{ width: '150px' }} />
    </div>
    <p>Select an event to see details.</p>
    {/* List of additional buttons */}
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <button onClick={filterTodayEvents} style={{
        padding: '8px 12px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Today's Events
      </button>

      <button onClick={filterTomorrowEvents} style={{
        padding: '8px 12px',
        background: '#ffc107', // Yellow color for tomorrow's events
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Tomorrow's Events
      </button>

      <button onClick={filterNextWeekEvents} style={{
        padding: '8px 12px',
        background: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Show Next Week's Events
      </button>
    </div>
  </div>
);

export default BurgerSide;
