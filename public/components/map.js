import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id='map' style='width: 1300px; height: 700px;'>
        <script>
          mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blc2NoZWxsayIsImEiOiJjaXo4bXB2cG8wMHA2MnZxbzNneHlicnZyIn0.K9hcDggIDFrtjjVS8LOXdA';
          var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-streets-v10',
            minZoom: 3.3,
            center: [-96, 38],

          });
          map.on('load', function() {

              // Add a layer showing the places.
              map.addLayer({
                "id": "places",
                "type": "symbol",
                "source": {
                  "type": "geojson",
                  "data": {
                    "type": "FeatureCollection",
                    "features": [{
                      "type": "Feature",
                      "properties": {
                        "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
                        "icon": "theatre"
                      },
                      "geometry": {
                        "type": "Point",
                        "coordinates": [-77.038659, 38.931567]
                      }
                    }, {
                      "type": "Feature",
                      "properties": {
                        "description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href=\"http://madmens5finale.eventbrite.com/\" target=\"_blank\" title=\"Opens in a new window\">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
                        "icon": "theatre"
                    },
                  "geometry": {
                      "type": "Point",
                      "coordinates": [-77.003168, 38.894651]
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

          // Create a popup, but don't add it to the map yet.
          var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
          });

          map.on('mousemove', function(e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['places'] });
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
        </script>
      </div>
    );
  }
};