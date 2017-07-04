import React, { Component, PropTypes } from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";



/**
 * Todo
 */
export class Todo extends Component { // eslint-disable-line react/prefer-stateless-function


  render() {

    const SimpleMapExampleGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      />
    ));


    return (
      <div>My Todo with id: {this.props.match.params.id}

      <SimpleMapExampleGoogleMap
              containerElement={
                <div style={{ height: `100px` }} />
              }
              mapElement={
                <div style={{ height: `100px` }} />
              }
      />

      </div>

    );
  }
}
export default Todo;
