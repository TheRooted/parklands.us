import React from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default class Mapp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      parkObjects: null
    };
  }

  componentWillMount() {
    var context = this;

    // Retrieve all park information
    axios.get('/api/parklocations')
    .then((res) => {
      var parkObjects = [];
      var parkLink;
      var name;
      var linkName;
      var splitName;
      
      for (var i = 0; i < res.data.length; i++) {
        // Convert to displayable name
        name = '';
        splitName = res.data[i].name.split(/[–\s]/);
        for (var j = 0; j < splitName.length; j++) {
          name += splitName[j][0].toUpperCase() + splitName[j].slice(1) + ' ';
        }
        // Create park name endpoint
        linkName = res.data[i].name;
        linkName = linkName.split(' ');
        linkName = linkName.join('%20');
        
        // Create park link HTML
        parkLink = "<a href=\"park/" + linkName + "\">" + name + "</a>";

        // Create a park object
        var parkObj = {
          id: res.data[i].id,
          name: name,
          parkLink: parkLink,
          linkName: linkName,
          coordinates: [res.data[i].long, res.data[i].lat],
          ratingDescription: "Have you been here?"
        }

        // Push completed park object into parkObjects array
        parkObjects.push(parkObj);
        context.setState({ parkObjects: parkObjects })
      }
    });
  }

  componentDidMount() {
    var context = this;
    var ratings = [];
    var features = [];

    axios.get('/api/session')
    .then((res) => {
      if (res.data) {
        context.setState({ userId: res.data.id });
      }

      axios.get('/api/simpleRating', {
        params: {
          userId: res.data.id
        }
      })
      .then(function(results) {
        for (var j = 0; j < results.data.length; j++) {
          var ratingObj = {
            parkId: results.data[j].parkId,
            rating: results.data[j].ratingVal
          }
          ratings.push(ratingObj);
        }

        // Run through each parkObject
        for (var k = 0; k < context.state.parkObjects.length; k++) {
          for (var l = 0; l < ratings.length; l++) {
            // If user has rated that park, add the rating to the parkObject
            if (ratings[l].parkId === context.state.parkObjects[k].id) {
              context.state.parkObjects[k].rating = ratings[l].rating;
              context.state.parkObjects[k].ratingDescription = "You gave this park " + ratings[l].rating + " stars!";
            }
          }
          features.push({
            "type": "Feature",
            "properties": {
              "description": context.state.parkObjects[k].parkLink + "\n" + context.state.parkObjects[k].ratingDescription,
              "icon": "triangle"
            },
            "geometry": {
              "type": "Point",
              "coordinates": context.state.parkObjects[k].coordinates
            }
          });
        }
      });
      // Set component state and create map
      // Fill features array with map layer script for each park
      context.setState({locationData: features});
      context.createMap();
    });

  }

  // Specify map styles and script that adds 
  // park locations layer once map is loaded
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
      // Add a map layer showing the parks
      map.addLayer({
        "id": "parks",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": context.state.locationData
          }
        },
        "layout": {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        }
      });
    });

    // Create a popup, but don't add it to the map yet
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
      // based on the park found
      popup.setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.description)
        .addTo(map);
    });
  }

  // Stringify and attach map script; insert script in DOM
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
