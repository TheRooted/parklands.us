import React from 'react';

export default class UserTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      userActivity: []
    };
  }

  render() {
    return (
      <div id='map' style='width: 400px; height: 300px;'>
        <script>
        mapboxgl.accessToken = 'pk.eyJ1Ijoic3Blc2NoZWxsayIsImEiOiJjaXo4bXB2cG8wMHA2MnZxbzNneHlicnZyIn0.K9hcDggIDFrtjjVS8LOXdA';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9'
        });
        </script>
      </div>
    );
  }
};