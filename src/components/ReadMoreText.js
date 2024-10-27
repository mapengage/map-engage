import React, { useState } from 'react';

const ReadMoreText = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If the text length is within the maxLength, show the full text
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  // Define truncated text based on maxLength
  const truncatedText = text.slice(0, maxLength) + '...';

  // Toggle between full text and truncated text
  return (
    <span>
      {isExpanded ? text : truncatedText}
      <span
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
      >
        {isExpanded ? 'less' : 'more'}
      </span>
    </span>
  );
};

export default ReadMoreText;
