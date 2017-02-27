import React from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default class Mapp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    var context = this;

    axios.get('/api/parklocations')
    .then(function (res) {
      var features = [];
      var data = res.data;
      
      for (var i = 1; i < data.length - 1; i++) {
        var name = '';
        var coordinates = [data[i].long, data[i].lat];
        var splitName = data[i].name.split(/[–\s]/);

        for (var j = 0; j < splitName.length; j++) {
          name += splitName[j][0].toUpperCase() + splitName[j].slice(1) + ' ';
        }
        
        features.push({
            "type": "Feature",
            "properties": {
              "description": name,
              "icon": "star"
          },
          "geometry": {
            "type": "Point",
            "coordinates": coordinates
          }
        });
      }
      // console.log('features', features);
      context.setState({locationData: features})
      context.createMap();
    });
  }

  componentWillMount() {
    const context = this;
    axios.get('/api/parklocations')
    .then(function (res) {
      console.log('locations res is', res)
    });
  }

  stringScript() {
    var context = this;
    var text = mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blc2NoZWxsayIsImEiOiJjaXo4bXB2cG8wMHA2MnZxbzNneHlicnZyIn0.K9hcDggIDFrtjjVS8LOXdA';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [-96, 39.5],
      minZoom: 3.5,
      maxZoom: 20
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
            "features": context.state.locationData
            // "features": [{
            //   "type": "Feature",
            //   "properties": {
            //     "description": "Yosemite National Park",
            //     "icon": "star"
            // },
            // "geometry": {
            //   "type": "Point",
            //   "coordinates": [-119.5383, 37.8651]
            // }
            // }]
          }
        },
        "layout": {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        }
      });
    });

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mousemove', function(e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['parks'] });
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

      if (!features.length) {
        popup.remove();
        return;
      }

      var feature = features[0];

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);
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
      <div id='map' style={{width:'99vw', height:'70vh'}}></div>
    )
  }
}
