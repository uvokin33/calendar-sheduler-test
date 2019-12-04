import React from 'react';

const CustomEvent = ({ event }) => (
    <div>
        <div className="event-title">
          {event.description}
        </div>
      </div>
);

export default CustomEvent;