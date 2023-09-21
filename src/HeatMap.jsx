import React, { useEffect, useState } from 'react'
// import { Map } from '@googlemaps/react-wrapper'
import GoogleMapReact from 'google-map-react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import Marker from './Marker';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

const HeatMap = ({versionData}) => {
    console.log('HeatMap data', versionData)

    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [center, setCenter] = useState()

    useEffect(()=>{
        console.log('update version data');
    if (versionData.length > 0) {
        console.log('update version data2', versionData[0].latitude);

        setCenter({
            lat: versionData[0].latitude,
            lng: versionData[0].longitude
            },
            )
    }
    }, [versionData])

    //   const coordinatesArray = [
    //     { id: 1, lat: 31.7683, lng: 35.2137, root_cause: 'spike' },
    //     { id: 2, lat: 31.7663, lng: 35.2147, root_cause: 'drop' },
    //   ];
    
      const handleMarkerHover = (id, rootCause) => {
        setHoveredMarker({ id, rootCause });
      };
    
      const handleMarkerLeave = () => {
        setHoveredMarker(null);
      };    
    
  return (
    <div style={{ height: '60vh', margin: '20px' }}>
    {center &&
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyC-3auqDxFmY_x-SzCOB8akiNwZm6V_zcI" }}
      center={center}
      defaultZoom={15}
    >
      {/* <AnyReactComponent
        lat={31.7683}
        lng={35.2137}
        text={<DirectionsCarFilledIcon style={{ color: 'red',  textShadow: '2px 2px 4px black'}}/>}
      /> */}
        {versionData.map((coordObj) => (
          <Marker
            eventID={coordObj.object_id}
            lat={coordObj.latitude}
            lng={coordObj.longitude}
            rootCause={coordObj.root_cause}
            onMouseOver={() => handleMarkerHover(coordObj.id, coordObj.root_cause)}
            onMouseOut={handleMarkerLeave}
            isHovered={hoveredMarker && hoveredMarker.id === coordObj.id}
          />
        ))}

    </GoogleMapReact>
    }
    {/* {hoveredMarker && (
        <div className="tooltip">
          <p>ID: {hoveredMarker.id}</p>
          <p>Root Cause: {hoveredMarker.rootCause}</p>
        </div>
      )} */}
  </div>

    // <div>
    //     <Map apiKey="AIzaSyC-3auqDxFmY_x-SzCOB8akiNwZm6V_zcI" />
    // </div>
  )
}

export default HeatMap