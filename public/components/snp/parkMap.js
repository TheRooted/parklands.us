import React from 'react';
import mapboxgl from 'mapbox-gl';

export default class ParkMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createMap();
    this.addLayer();
  }

  stringScript() {
    var text = mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blc2NoZWxsayIsImEiOiJjaXo4bXB2cG8wMHA2MnZxbzNneHlicnZyIn0.K9hcDggIDFrtjjVS8LOXdA';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v10',
      center: [-119.5383, 37.8651],
      minZoom: 6,
      maxZoom: 50
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
                "icon": "star"
            },
            "geometry": {
              "type": "Point",
              "coordinates": [-119.5383, 37.8651]
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
      <div id="map" style={{width:'300px', height:'300px', float:'left', marginRight:'14px', marginBottom:'5px'}}></div>
    )
  }
}
