import React from 'react';
import mapboxgl from 'mapbox-gl';

export default class Mapp extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.createMap();
  }

  createMap() {
    var map = window.document.getElementById('map');
    var script = window.document.createElement('script');
    script.type = 'text/javascript';
    script.text = "mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blc2NoZWxsayIsImEiOiJjaXo4bXB2cG8wMHA2MnZxbzNneHlicnZyIn0.K9hcDggIDFrtjjVS8LOXdA';varmap = new mapboxgl.Map({container: 'map',style: 'mapbox://styles/mapbox/satellite-streets-v10',minZoom: 3.5,maxZoom: 20,center: [-96, 38],});";
    map.appendChild(script);
  }

  render() {
    return (
      <div id='map' style={{width:'1300px', height:'700px'}}></div>
    )
  }
}
