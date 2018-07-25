import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Divider } from 'semantic-ui-react'
import Parser from 'html-react-parser'

class Presentation extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: props.data.title,
      content: props.data.content
    }
  }

  render () {
    return (
      <Grid.Row id='presentation' className={this.props.typeRow}>
        <Grid centered>
          <Grid.Column only='computer tablet' textAlign='justified' width={10}>
            <Divider hidden />
            <Divider hidden />
            <Header as='h1' textAlign='center'>{Parser(this.state.title)}</Header>
            <Divider horizontal className='custom'> O </Divider>
            <Divider hidden />
            <Grid centered>
              <Grid.Column textAlign='center' width={15}>
                {Parser(this.state.content)}
              </Grid.Column>
            </Grid>
            <Divider hidden />
            <Divider hidden />
          </Grid.Column>
          <Grid.Column only='mobile' textAlign='justified' width={16}>
            <Divider hidden />
            <Header as='h1' textAlign='center'>{Parser(this.state.title)}</Header>
            <Divider horizontal className='customMobile'> O </Divider>
            <Divider hidden />
            <Grid centered>
              <Grid.Column textAlign='center' width={16}>
                {Parser(this.state.content)}
              </Grid.Column>
            </Grid>
            <Divider hidden />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

Presentation.propTypes = {
  data: PropTypes.object,
  typeRow: PropTypes.string
}

export default Presentation
