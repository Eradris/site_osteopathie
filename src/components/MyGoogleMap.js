import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps'

class MyMapComponent extends Component {
  render () {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 48.6181582, lng: 2.0460836 }}
      >
        {this.props.isMarkerShown && <Marker position={{ lat: 48.6181582, lng: 2.0460836 }} title='Forges-les-bains' options={{primaryColor: '#5884a5'}} />}
        <Circle
          defaultCenter={{lat: 48.6181582, lng: 2.0460836}}
          radius={12500}
          visible
          strokeColor='#FF0000'
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor='#FF0000'
          fillOpacity={0.35}
        />
      </GoogleMap>
    )
  }
}

MyMapComponent.propTypes = {
  isMarkerShown: PropTypes.bool
}

export default withScriptjs(withGoogleMap(MyMapComponent))
