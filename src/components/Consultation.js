import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Divider, Segment } from 'semantic-ui-react'
import Parser from 'html-react-parser'

import Item from './Item'

class Consultation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: props.data.title,
      subContents: props.data.subContents
    }
  }

  render () {
    return (
      <Grid.Row id='consultation' className={this.props.typeRow}>
        <Grid centered>
          <Grid.Column only='computer tablet' textAlign='justified' width={14}>
            <Divider hidden />
            <Divider hidden />
            <Grid centered>
              <Grid.Column textAlign='center' width={8}>
                <Header as='h1' textAlign='center' className='customHeaderTow'>{Parser(this.state.title)}</Header>
                <Divider className='customDividerTow' horizontal> O </Divider>
                <Divider hidden />
                <Divider hidden />
              </Grid.Column>
            </Grid>
            <Segment className='customConsultation'>
              <Divider hidden />
              <Divider hidden />
              <Grid stackable columns='equal' centered>
                <Grid.Row>
                  {
                    this.state.subContents.map((subContent, id) => {
                      return (
                        <Item
                          key={id}
                          id={id}
                          isIcon
                          icon={subContent.icon}
                          name={subContent.title}
                          description={subContent.content}
                        />
                      )
                    })
                  }
                </Grid.Row>
              </Grid>
              <Divider hidden />
              <Divider hidden />
            </Segment>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </Grid.Column>
          <Grid.Column only='mobile' textAlign='center' width={16}>
            <Divider hidden />
            <Header as='h1' textAlign='center' className='customHeaderTow'>{Parser(this.state.title)}</Header>
            <Divider className='customDividerTowMobile' horizontal> O </Divider>
            <Divider hidden />
            <Divider hidden />
            <Segment className='customConsultation'>
              <Grid centered>
                {
                  this.state.subContents.map((subContent, id) => {
                    return (
                      <Item
                        arrayLength={this.state.subContents.length}
                        mobile
                        key={id}
                        id={id}
                        isIcon
                        icon={subContent.icon}
                        name={subContent.title}
                        description={subContent.content}
                      />
                    )
                  })
                }
              </Grid>
            </Segment>
            <Divider hidden />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

Consultation.propTypes = {
  data: PropTypes.object,
  typeRow: PropTypes.string
}

export default Consultation
