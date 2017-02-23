import React from 'react';
import mapboxgl from 'mapbox-gl';

export default class ParkMap extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createMap();
  }

  // function to find coordinates of park

  createMap() {
    var parkMap = window.document.getElementById('parkMap');
    var script = window.document.createElement('script');
    script.type = 'text/javascript';
    script.text = "mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blc2NoZWxsayIsImEiOiJjaXppdmZvaXcwMnYxMzNtazZkb2lnbDBqIn0.Dam1trKbpWhxWdh_5GQVrw'; var parkmap = new mapboxgl.Map({container: 'parkMap', style: 'mapbox://styles/mapbox/satellite-streets-v10', minZoom: 5, maxZoom: 20, center: [-119.5383, 37.8651]});";
    parkMap.appendChild(script);
  }

  render() {
    return (
      <div id="parkMap" style={{width:'300px', height:'300px', float:'left', marginRight:'14px', marginBottom:'5px'}}></div>
    )
  }
}
