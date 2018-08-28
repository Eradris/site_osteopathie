import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Divider, Segment } from 'semantic-ui-react'
import Parser from 'html-react-parser'

class Formation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: props.data.title,
      content: props.data.content
    }
  }

  render () {
    return (
      <Grid.Row id='formation' className={this.props.typeRow}>
        <Grid centered style={{width: '100%'}}>
          <Grid.Column textAlign='center' only='computer tablet' width={10}>
            <Divider hidden />
            <Divider hidden />
            <Header as='h1' textAlign='center' className='customHeaderTow'>{Parser(this.state.title)}</Header>
            <Divider horizontal className='customDividerTow'> O </Divider>
            <Divider hidden />
            <Segment raised className='custom' >
              {Parser(this.state.content)}
            </Segment>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </Grid.Column>
          <Grid.Column textAlign='center' only='mobile' width={16}>
            <Divider hidden />
            <Header as='h1' textAlign='center' className='customHeaderTow'>{Parser(this.state.title)}</Header>
            <Divider horizontal className='customDividerTowMobile'> O </Divider>
            <Divider hidden />
            <Segment raised className='custom'>
              {Parser(this.state.content)}
            </Segment>
            <Divider hidden />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

Formation.propTypes = {
  data: PropTypes.object,
  typeRow: PropTypes.string
}

export default Formation
