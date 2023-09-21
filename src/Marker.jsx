import React, { useState } from 'react'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';


const Marker = ({ lat, lng, eventID, rootCause }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <DirectionsCarFilledIcon style={{ color: isHovered ? 'maroon' : 'red', cursor: 'pointer'}} />
        {isHovered && (
          <div className="toolTip">
            <p>ID: {eventID}</p>
            <p>Root Cause: {rootCause}</p>
          </div>
        )}
      </div>
    );
  };
  
export default Marker