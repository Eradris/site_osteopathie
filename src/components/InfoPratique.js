import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Divider, Icon, Label } from 'semantic-ui-react'
import Parser from 'html-react-parser'

import MyGoogleMap from './MyGoogleMap'
import RendezVous from './RendezVous'

class InfoPratique extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: props.data.title,
      content: props.data.content,
      email: props.data.email,
      phone: props.data.phone
    }
  }

  render () {
    return (
      <Grid.Row id='info' className={this.props.typeRow}>
        <Grid centered>
          <Grid.Column only='computer tablet' width={15}>
            <Grid verticalAlign='middle' centered>
              <Grid.Column verticalAlign='middle' textAlign='center' width={7}>
                <Header as='h1' textAlign='center'>{Parser(this.state.title)}</Header>
                <Divider horizontal className='custom'> O </Divider>
                <Divider hidden />
                {Parser(this.state.content)}
                <Divider hidden />
                <Label color='blue' size='large'>
                  <Icon name='phone' />
                  {Parser(this.state.phone.replace('<p>', '').replace('</p>', ''))}
                </Label>
                <Divider hidden />
                <Label color='blue' size='large'>
                  <Icon name='mail' />
                  {Parser(this.state.email.replace('<p>', '').replace('</p>', ''))}
                </Label>
                <Divider hidden />
                <RendezVous
                  resetModal={() => this.props.resetModal()}
                  addRdv={(slotInfo) => this.props.addRdv(slotInfo)}
                  data={this.props.data}
                  distanceValider={this.props.distanceValider}
                  eventsList={this.props.eventsList}
                  socket={this.props.socket}
                  eventAdded={this.props.eventAdded}
                />
              </Grid.Column>
              <Grid.Column textAlign='center' width={7}>
                <MyGoogleMap
                  isMarkerShown
                  googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCUWbrZU3apEdMpiVQ2A4GvUjX4aYSvmz4&v=3.exp&libraries=geometry,drawing,places'
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={<div style={{ height: '400px' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                />
              </Grid.Column>
            </Grid>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </Grid.Column>
          <Grid.Column only='mobile' width={16}>
            <Grid verticalAlign='middle' centered>
              <Grid.Column textAlign='center' width={16}>
                <Divider hidden />
                <Header as='h1' textAlign='center'>{Parser(this.state.title)}</Header>
                <Divider horizontal className='customMobile'> O </Divider>
                <Divider hidden />
                {Parser(this.state.content)}
                <Divider hidden />
                <Label color='blue' size='large' as='a' href='tel:0646712254'>
                  <Icon name='phone' />
                  {Parser(this.state.phone.replace('<p>', '').replace('</p>', ''))}
                </Label>
                <Divider hidden />
                <Label color='blue' size='large' as='a' href='mailto:alixbraem.osteopathe@gmail.com'>
                  <Icon name='mail' />
                  {Parser(this.state.email.replace('<p>', '').replace('</p>', ''))}
                </Label>
                <Divider hidden />
                <RendezVous
                  resetModal={() => this.props.resetModal()}
                  addRdv={(slotInfo) => this.props.addRdv(slotInfo)}
                  data={this.props.data}
                  distanceValider={this.props.distanceValider}
                  eventsList={this.props.eventsList}
                  socket={this.props.socket}
                  eventAdded={this.props.eventAdded}
                />
                <Divider hidden />
                <Divider hidden />
              </Grid.Column>
              <Grid.Column textAlign='center' width={15}>
                <MyGoogleMap
                  isMarkerShown
                  googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCUWbrZU3apEdMpiVQ2A4GvUjX4aYSvmz4&v=3.exp&libraries=geometry,drawing,places'
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={<div style={{ height: '400px' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                />
              </Grid.Column>
            </Grid>
            <Divider hidden />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

InfoPratique.propTypes = {
  typeRow: PropTypes.string,
  data: PropTypes.object,
  distanceValider: PropTypes.bool,
  eventsList: PropTypes.array,
  resetModal: PropTypes.func,
  addRdv: PropTypes.func,
  socket: PropTypes.object,
  eventAdded: PropTypes.bool
}

export default InfoPratique
