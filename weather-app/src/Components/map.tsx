import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '500px',
  height: '100%'
};

interface Map {
    centers:google.maps.LatLng | google.maps.LatLngLiteral | undefined;  
}
function MyComponent({centers}: Map) {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCGPtMPh8siT42dwQiYtOXNukd5KLGbvAU"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centers}
        zoom={10}
      >
     
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)