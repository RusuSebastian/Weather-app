import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.1667,
      lng: 27.6
    },
    zoom: 12
  };

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGPtMPh8siT42dwQiYtOXNukd5KLGbvAU"}}
          center={this.props.center}
          defaultZoom={this.props.zoom}
        >
          
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;