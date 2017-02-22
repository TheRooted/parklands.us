import React from 'react';
import MapboxMap from 'react-mapboxmap';



export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  var Master = React.createClass({
    render: function() {
      return (
        <div className="container">
          <MapboxMap
            mapId="mapbox.comic"
            zoomControl={false}
            center={[59.907433, 30.299848]} zoom={17}
            onMapCreated={this._onMapCreated}/>
        </div>
      );
    },
    _onMapCreated: function(map, L) {
      var marker = new L.Marker(new L.LatLng(59.907433, 30.299848));
      map.addLayer(marker);
    }
  });

  render() {
    return (
      <Master />
    )
  }
}

 
