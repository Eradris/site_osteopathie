import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Visibility, Dimmer, Loader } from 'semantic-ui-react'
import { socketConnect } from 'socket.io-react'
import HeaderSite from './Header'
import InfoPratique from './InfoPratique'
import Presentation from './Presentation'
import Formation from './Formation'
import ChampsAction from './ChampsAction'
import Pourquoi from './Pourquoi'
import Consultation from './Consultation'
import Footer from './Footer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      socket: props.socket,
      eventsList: [],
      showModalRdv: false,
      message: '',
      fixeMenu: false,
      calculations: {
        bottomVisible: false
      },
      eventAdded: false,
      distanceValider: null
    }

    this.state.socket.on('response', response => this.takeAction(response))
    this.takeAction = this.takeAction.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.resetModal = this.resetModal.bind(this)
  }

  componentWillMount () {
    this.state.socket.emit('action', {'type': 'getEvents'})
    this.getData()
  }

  takeAction (response) {
    if (response.type === 'eventsList') {
      let eventsConvert = response.data.map((event) => {
        let start = new Date(event.start)
        let end = new Date(event.end)
        let title = event.title
        let eventConvert = {start: start, end: end, title: title}
        return eventConvert
      })
      this.setState({eventsList: eventsConvert})
    }

    if (response.type === 'addEvent') {
      if (!response.success) {
        this.setState({eventAdded: false})
      } else {
        this.setState({eventAdded: true})
      }
    }

    if (response.type === 'testDistance') {
      if (!response.success) {
        this.setState({distanceValider: false})
      } else {
        if (response.data[0].distance.value > 20000) {
          this.setState({distanceValider: false})
        } else {
          this.setState({distanceValider: true})
        }
      }
    }

    if (response.type === 'getData') {
      switch (response.dataType) {
        case 'champs_action' :
          this.setState({champs_action: response.data})
          break
        case 'consultation' :
          this.setState({consultation: response.data})
          break
        case 'formation' :
          this.setState({formation: response.data})
          break
        case 'information' :
          this.setState({information: response.data})
          break
        case 'pourquoi' :
          this.setState({pourquoi: response.data})
          break
        case 'presentation' :
          this.setState({presentation: response.data})
          break
      }
    }
  }

  getData () {
    this.state.socket.emit('action', {'type': 'getData', 'dataType': 'champs_action'})
    this.state.socket.emit('action', {'type': 'getData', 'dataType': 'consultation'})
    this.state.socket.emit('action', {'type': 'getData', 'dataType': 'formation'})
    this.state.socket.emit('action', {'type': 'getData', 'dataType': 'information'})
    this.state.socket.emit('action', {'type': 'getData', 'dataType': 'pourquoi'})
    this.state.socket.emit('action', {'type': 'getData', 'dataType': 'presentation'})
  }

  addRdv (data) {
    this.state.socket.emit('action', {'type': 'createEvent', 'data': data})
  }

  handleUpdate (e, { calculations }) {
    if (!this.state.calculations.bottomPassed && this.state.fixeMenu !== false) {
      this.setState({fixeMenu: false, calculations})
    } else if (this.state.calculations.bottomPassed && this.state.fixeMenu !== true) {
      this.setState({fixeMenu: true, calculations})
    } else {
      this.setState({ calculations })
    }
  }

  resetModal () {
    this.setState({eventAdded: false})
    this.state.socket.emit('action', {'type': 'getEvents'})
  }

  render () {
    if (
      !this.state.champs_action ||
      !this.state.consultation ||
      !this.state.formation ||
      !this.state.information ||
      !this.state.pourquoi ||
      !this.state.presentation
    ) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )
    } else {
      return (
        <Grid textAlign='center'>
          <Visibility onUpdate={this.handleUpdate} style={{width: '100%'}}>
            <HeaderSite fixeMenu={this.state.fixeMenu} />
            <InfoPratique
              data={this.state.information}
              distanceValider={this.state.distanceValider}
              socket={this.state.socket}
              eventAdded={this.state.eventAdded}
              resetModal={this.resetModal}
              typeRow='rowOne'
              addRdv={(data) => this.addRdv(data)}
              eventsList={this.state.eventsList}
            />
          </Visibility>
          <Formation data={this.state.formation} typeRow='rowTwo' />
          <Presentation data={this.state.presentation} typeRow='rowOne' />
          <ChampsAction data={this.state.champs_action} typeRow='rowTwo' />
          <Pourquoi data={this.state.pourquoi} typeRow='rowOne' />
          <Consultation data={this.state.consultation} typeRow='rowTwo' />
          <Footer typeRow='footer' />
        </Grid>
      )
    }
  }
}

App.propTypes = {
  socket: PropTypes.object
}

export default socketConnect(App)
