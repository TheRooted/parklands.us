// import React from 'react';
// import axios from 'axios';
// import sort from './../sort.js';

// export default class VisitedPark extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visitedPark: []
//     };
//   }

//   componentWillMount() {
//     const context = this;
//     axios.get('/api/session')
//     .then(function (res){
//       var userId = res.data.id;
//       axios.get('/api/visitedpark', {
//         params: {
//           userId: userId
//         }
//       })
//       .then(function (response) {
//         console.log('data iss ',response.data);
//         var sortedRes = sort(response.data, 'activity');
//         context.setState({
//           visitedPark: sortedRes
//         });
//       });

//     });
//   }

//   render () {
//     return (
//       <ul>
//         {
//           this.state.visitedPark.map((park, i) =>
//             <li className="visitedPark">{park.description}</li>
//           )
//         }
//       </ul>
//     );
//   }
// }
