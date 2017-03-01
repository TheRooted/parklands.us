import React from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default class ParkMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      long: null,
      lat: null
    }
  }

  componentWillReceiveProps(nextProps) {
    var name = '';
    var splitName = nextProps.park.name.split(/[–\s]/);

    for (var i = 0; i < splitName.length; i++) {
      name += splitName[i][0].toUpperCase() + splitName[i].slice(1);
    }
    this.setState({ 
      name: name,
      long: nextProps.park.long,
      lat: nextProps.park.lat
    })
    this.createMap();
  }

  stringScript() {
    var name = this.state.name;
    var long = this.state.long;
    var lat = this.state.lat;

    var text = mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blc2NoZWxsayIsImEiOiJjaXo4bXB2cG8wMHA2MnZxbzNneHlicnZyIn0.K9hcDggIDFrtjjVS8LOXdA';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [long, lat],
      zoom: 4,
      minZoom: 1,
      maxZoom: 40
    });

    map.on('load', function() {

      // Add a layer showing the places.
      map.addLayer({
        "id": "parks",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "properties": {
                "description": name,
                "icon": "star"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [long, lat]
            }
          }]
          }
        },
        "layout": {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        }
      });
    });
  }

  // function to find coordinates of park

  createMap() {
    var map = window.document.getElementById('map');
    var script = window.document.createElement('script');
    script.type = 'text/javascript';
    script.text = JSON.stringify(this.stringScript());
    map.parentNode.insertBefore(script, map.nextSibling);
  }

  render() {
    return (
      <div id="map" style={{width:'240px', height:'240px', float:'left', marginRight:'14px', marginBottom:'5px', borderRadius:'5px'}}></div>
    )
  }
}
