import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider, Icon, Dropdown, Header } from 'semantic-ui-react'

class HeaderSite extends Component {
  constructor (props) {
    super(props)
    this.state = { activeItem: 'home' }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick (name) {
    this.setState({ activeItem: name })
  }

  render () {
    return (
      <Grid.Row>
        <Grid stackable verticalAlign='middle' columns='equal' divided textAlign='center'>
          <Divider hidden />
          <Grid.Row>
            <Grid.Column><div className='logo'>Alix <b>BRAEM</b> OSTÉOPATHE D.O. M.R.O.F.</div></Grid.Column>
            <Grid.Column name='Information' onClick={(name) => this.handleItemClick('Information')} ><a className='header' href='#info'>Informations</a></Grid.Column>
            <Grid.Column name='Formation' onClick={(name) => this.handleItemClick('Formation')} ><a className='header' href='#formation'>Formation</a></Grid.Column>
            <Grid.Column name='Présentation' onClick={(name) => this.handleItemClick('Presentation')} ><a className='header' href='#presentation'>Présentation</a></Grid.Column>
            <Grid.Column name='Champs d Action' onClick={(name) => this.handleItemClick('ChampsAction')} ><a className='header' href='#champsAction'>Champs d'Action</a></Grid.Column>
            <Grid.Column name='Pour quoi ?' onClick={(name) => this.handleItemClick('Pourquoi')} ><a className='header' href='#pourquoi'>Pour quoi?</a></Grid.Column>
            <Grid.Column name='Consultation' onClick={(name) => this.handleItemClick('Consultation')} ><a className='header' href='#consultation'>Consultation</a></Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <div style={this.props.fixeMenu ? {display: 'block'} : {display: 'none'}}>
          <Grid>
            <Grid.Column only='computer tablet'>
              <Grid.Row className='menuHeaderFixe'>
                <Grid verticalAlign='middle' columns='equal' divided textAlign='center'>
                  <Grid.Row>
                    <Grid.Column><div className='logo'>Alix <b>BRAEM</b> OSTÉOPATHE D.O. M.R.O.F.</div></Grid.Column>
                    <Grid.Column name='Information' onClick={(name) => this.handleItemClick('Information')} ><a className='header' href='#info'>Informations</a></Grid.Column>
                    <Grid.Column name='Formation' onClick={(name) => this.handleItemClick('Formation')} ><a className='header' href='#formation'>Formation</a></Grid.Column>
                    <Grid.Column name='Présentation' onClick={(name) => this.handleItemClick('Presentation')} ><a className='header' href='#presentation'>Présentation</a></Grid.Column>
                    <Grid.Column name='Champs d Action' onClick={(name) => this.handleItemClick('ChampsAction')} ><a className='header' href='#champsAction'>Champs d'action</a></Grid.Column>
                    <Grid.Column name='Pour quoi ?' onClick={(name) => this.handleItemClick('Pourquoi')} ><a className='header' href='#pourquoi'>Pour quoi?</a></Grid.Column>
                    <Grid.Column name='Consultation' onClick={(name) => this.handleItemClick('Consultation')} ><a className='header' href='#consultation'>Consultation</a></Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column only='mobile'>
              <Grid.Row textAlign='left' className='menuHeaderFixeMobile'>
                <Dropdown item icon={<Icon name='list layout' size='large' />} inline>
                  <Dropdown.Menu>
                    <Dropdown.Item><div className='logo'>Alix <b>BRAEM</b> OSTÉOPATHE D.O. M.R.O.F.</div></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(name) => this.handleItemClick('Information')} href='#info'><Header>Informations</Header></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(name) => this.handleItemClick('Formation')} href='#formation'><Header>Formation</Header></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(name) => this.handleItemClick('Presentation')} href='#presentation'><Header>Présentation</Header></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(name) => this.handleItemClick('ChampsAction')} href='#champsAction'><Header>Champs d'action</Header></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(name) => this.handleItemClick('Pourquoi')} href='#pourquoi'><Header>Pour quoi ?</Header></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={(name) => this.handleItemClick('Consultation')} href='#consultation'><Header>Consultation</Header></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
      </Grid.Row>
    )
  }
}

HeaderSite.propTypes = {
  fixeMenu: PropTypes.bool
}

export default HeaderSite
