import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Grid, Divider, Form, Button, Header, Label, Icon, Message, Popup, Menu } from 'semantic-ui-react'
import moment from 'moment'
import PlacesAutocomplete from 'react-places-autocomplete'

import Calendar from './Calendar'

class RendezVous extends Component {
  constructor (props) {
    super(props)

    this.state = {
      dateSelected: null,
      mode: 'date',
      showForm: false,
      errorName: false,
      errorPhone: false,
      errorAdresse: false,
      errorMessage: [],
      eventsList: props.eventsList,
      showModal: false,
      showModalMobile: false,
      fromSend: false,
      selectTime: false,
      timeSelected: null,
      hoursDisplay: props.data.hoursDisplay,
      formCompleted: false,
      formFisrtName: '',
      formLastName: '',
      formPhone: '',
      formEmail: null,
      address: '',
      selectAddress: false,
      distanceValider: props.distanceValider
    }

    this.showModal = this.showModal.bind(this)
    this.resetData = this.resetData.bind(this)
    this.validForm = this.validForm.bind(this)
    this.selectTime = this.selectTime.bind(this)
    this.selectedTime = this.selectedTime.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.backToDate = this.backToDate.bind(this)
    this.backToHour = this.backToHour.bind(this)
    this.resetChangeDate = this.resetChangeDate.bind(this)
    this.completForm = this.completForm.bind(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.eventsList !== this.props.eventsList) {
      this.setState({eventsList: nextProps.eventsList})
    } else if (nextProps.distanceValider !== this.props.distanceValider) {
      this.setState({distanceValider: nextProps.distanceValider})
      if (!nextProps.distanceValider) {
        this.setState({formCompleted: false})
      }
    }

    if (
      nextState.formFirstName !== '' &&
      nextState.formLastName !== '' &&
      nextState.formPhone !== '' &&
      nextState.distanceValider &&
      !nextState.formCompleted
    ) {
      this.setState({formCompleted: true})
    }
    return true
  }

  showModal () {
    this.setState({showModal: true})
  }

  resetData () {
    this.setState({
      dateSelected: null,
      showModal: false,
      showModalMobile: false,
      showForm: false,
      mode: 'date',
      selectTime: false,
      hoursDisplay: [
        {hour: 13, minute: 30, display: true},
        {hour: 15, minute: 0, display: true},
        {hour: 16, minute: 30, display: true},
        {hour: 18, minute: 0, display: true}
      ]
    })
    this.props.resetModal()
  }

  validForm () {
    var name = this.state.formFirstName + ' ' + this.state.formLastName
    var phone = this.state.formPhone
    var adresse = this.state.address
    var dateSelected = this.state.dateSelected

    var data = {
      name: name,
      phone: phone,
      adresse: adresse,
      dateSelected: dateSelected.format()
    }

    this.props.addRdv(data)
    this.setState({fromSend: true})
  }

  selectTime (date) {
    var eventsList = this.state.eventsList
    var hoursDisplay = this.state.hoursDisplay
    eventsList.map((event) => {
      var dateEventStart = moment(event.start)
      var dateEventEnd = moment(event.end)
      if (date.format('MMMM Do YYYY') === dateEventStart.format('MMMM Do YYYY')) {
        hoursDisplay.map((time, i) => {
          if (dateEventStart.hour() === time.hour) {
            if (dateEventStart.minute() === time.minute) {
              hoursDisplay[i].display = false
            } else if (dateEventStart.minute() > time.minute) {
              hoursDisplay[i].display = false
            } else {
              if (i !== 0) {
                hoursDisplay[i - 1].display = false
              }
              hoursDisplay[i].display = false
            }
          } else if (dateEventStart.hour() > time.hour &&
            dateEventStart.hour() - time.hour === 1 &&
            dateEventStart.hour() < hoursDisplay[hoursDisplay.length - 1].hour) {
            hoursDisplay[i].display = false
            if (dateEventEnd.hour() === hoursDisplay[i + 1].hour) {
              hoursDisplay[i + 1].display = false
            }
          } else if (dateEventStart.hour() > hoursDisplay[hoursDisplay.length - 1].hour && dateEventStart.minute() < 30) {
            hoursDisplay[hoursDisplay.length - 1].display = false
          }
        })
      }

      if (date.day() === 2) {
        hoursDisplay[3].display = false
      }
    })

    var firstHour = hoursDisplay.find((item) => {
      return item.display === true
    })

    if (firstHour) {
      date.hour(firstHour.hour)
      date.minute(firstHour.minute)
    }

    this.setState({
      selectTime: true,
      dateSelected: firstHour ? date : null,
      timeSelected: firstHour,
      hoursDisplay: hoursDisplay
    })
  }

  selectedTime (time) {
    var date = this.state.dateSelected
    date.hour(time.hour)
    date.minute(time.minute)
    this.setState({
      timeSelected: time,
      dateSelected: date
    })
  }

  onChange (address) {
    this.setState({ address })
  }

  onChangeInput (event, data) {
    switch (data.id) {
      case 'firstName':
        this.setState({formFirstName: data.value})
        break
      case 'lastName':
        this.setState({formLastName: data.value})
        break
      case 'phone':
        this.setState({formPhone: data.value})
        break
      case 'email':
        this.setState({formEmail: data.value})
        break
    }
    if (data.value === '') {
      this.setState({formCompleted: false})
    }
  }

  handleSelect (address, placeId) {
    this.setState({address, placeId, selectAddress: true})
    this.props.socket.emit('action', {'type': 'testDistance', 'data': {address: address}})
  }

  changeDate (date, mode) {
    this.setState({
      dateSelected: date,
      mode: mode
    })
  }

  backToDate () {
    this.setState({
      mode: 'date',
      showForm: false,
      selectTime: false,
      hoursDisplay: [
        {hour: 13, minute: 30, display: true},
        {hour: 15, minute: 0, display: true},
        {hour: 16, minute: 30, display: true},
        {hour: 18, minute: 0, display: true}
      ]
    })
  }

  backToHour () {
    this.setState({
      mode: 'time',
      selectTime: true,
      showForm: false
    })
  }

  resetChangeDate () {
    this.setState({
      mode: 'date',
      dateSelected: null
    })
  }

  completForm () {
    this.setState({showForm: true})
  }

  render () {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    const myStyles = {
      autocompleteContainer: {zIndex: 1001}
    }
    return (
      <Modal
        open={this.state.showModal}
        closeIcon={<Icon name='close' onClick={this.resetData} />}
        trigger={
          <Label as='a' color='blue' onClick={this.showModal} size='large'>
            <Icon name='calendar alternate' />
            Rendez-vous
          </Label>
        }
      >
        <Modal.Header>
          <Icon name='calendar alternate' color='blue' />
          Prise de rendez-vous
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid verticalAlign='middle' stackable centered>
              {
                !this.state.showForm && <Grid.Row>
                  <Grid.Column textAlign='center' width={10}>
                    <Grid>
                      <Grid.Row>
                        <Grid.Column textAlign='center'>
                          {
                            this.state.dateSelected && this.state.mode !== 'date' && <Header>
                              <Popup
                                trigger={
                                  <Icon link name='arrow left' color='blue' style={{float: 'left'}} onClick={this.backToDate} />
                                }
                                content='Retourner à la selection du jour'
                              />
                              Horaires disponibles
                            </Header>
                          }
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        {
                          !this.state.selectTime && <Calendar
                            selectTime={this.selectTime}
                            resetChangeDate={this.resetChangeDate}
                            mode={this.state.mode}
                            changeDate={(date, mode) => this.changeDate(date, mode)}
                            addRdv={(slotInfo) => this.props.addRdv(slotInfo)}
                            eventsList={this.state.eventsList}
                            typeRow='rowOne'
                          />
                        }
                        {
                          this.state.selectTime && <Menu fluid vertical>
                            {
                              this.state.hoursDisplay.map((item, key) => {
                                if (item.minute === 0) { item.minute = '00' }
                                if (item.display) {
                                  return (
                                    <Menu.Item key={key} active={this.state.timeSelected === item} onClick={(time) => this.selectedTime(item)}>
                                      {item.hour} : {item.minute}
                                    </Menu.Item>
                                  )
                                } else {
                                  return (
                                    <Menu.Item key={key} active={false} disabled>
                                      {item.hour} : {item.minute}
                                    </Menu.Item>
                                  )
                                }
                              })
                            }
                          </Menu>
                        }
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column textAlign='center' width={5}>
                    <Header>{(this.state.dateSelected) ? this.state.dateSelected.format('LLLL') : ''}</Header>
                    <Button disabled={!this.state.dateSelected} color='blue' onClick={this.completForm}>Valider</Button>
                  </Grid.Column>
                </Grid.Row>
              }
              {
                this.state.showForm && !this.props.eventAdded && <Grid.Row>
                  <Grid.Column textAlign='center' width={10}>
                    <Header>
                      <Popup
                        trigger={<Icon link name='arrow left' color='blue' style={{float: 'left'}} onClick={this.backToHour} />}
                        content='Retourner à la selection du jour'
                      />
                      vous avez pris rdv pour le :
                      <Divider hidden />
                      <Label size='big'>
                        <Icon name='calendar alternate' /> {this.state.dateSelected.format('LLLL')}
                      </Label>
                      <Divider hidden />
                      Pour finaliser le rendez-vous veuillez renseigner les informations suivantes :
                    </Header>
                    <Form
                      onSubmit={this.validForm}
                      error
                      warning={(this.state.distanceValider !== null) ? !this.state.distanceValider : false}
                    >
                      <Form.Group widths='equal'>
                        <Form.Field >
                          <Form.Input
                            label='Prénom'
                            required
                            id='firstName'
                            placeholder='votre prénom'
                            autoComplete='given-name'
                            onChange={this.onChangeInput}
                          />
                        </Form.Field>
                        <Form.Field >
                          <Form.Input
                            label='Nom'
                            required
                            id='lastName'
                            placeholder='votre nom'
                            autoComplete='family-name'
                            onChange={this.onChangeInput}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <Form.Input
                          type='tel'
                          label='Téléphone'
                          required
                          id='phone'
                          autoComplete='tel'
                          placeholder='0605040302'
                          pattern='^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$'
                          onChange={this.onChangeInput}
                        />
                      </Form.Field>
                      <Form.Field required>
                        <label>Adresse</label>
                        <PlacesAutocomplete inputProps={inputProps} autoComplete='address-line1' onSelect={this.handleSelect} styles={myStyles} />
                      </Form.Field>
                      <Button
                        type='submit'
                        disabled={this.state.fromSend || !this.state.formCompleted}
                        loading={this.state.fromSend && !this.props.eventAdded}
                        color='blue'
                      >
                        confirmer le RDV
                      </Button>
                      <Message
                        warning
                        header='Adresse hors secteur'
                        content='Vous habitez malheureusement en dehors de mon secteur d intervention. Cependant vous pouvez me contacter au 06 46 71 22 54 pour trouver un arrangement.'
                      />
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              }
              {
                this.state.showForm && this.props.eventAdded && <Grid.Row>
                  <Grid.Column textAlign='center' width={10}>
                    <Header>
                      Votre rendez-vous du :
                      <Divider hidden />
                      <Label size='big'>
                        <Icon name='calendar' /> {this.state.dateSelected.format('LLLL')}
                      </Label>
                      <Divider hidden />
                      A correctement été pris en compte, je reviendrai vers vous pour confirmation !
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              }
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

RendezVous.propTypes = {
  data: PropTypes.object,
  distanceValider: PropTypes.bool,
  eventsList: PropTypes.array,
  resetModal: PropTypes.func,
  addRdv: PropTypes.func,
  socket: PropTypes.object,
  eventAdded: PropTypes.bool
}

export default RendezVous
