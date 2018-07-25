import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Divider } from 'semantic-ui-react'
import Parser from 'html-react-parser'

import Item from './Item'

class Pourquoi extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: props.data.title,
      content: props.data.content,
      pourquoi: props.data.pourquoi
    }
  }

  render () {
    return (
      <Grid.Row id='pourquoi' className={this.props.typeRow}>
        <Grid centered>
          <Grid.Column only='computer tablet' textAlign='center' width={15}>
            <Divider hidden />
            <Divider hidden />
            <Grid centered>
              <Grid.Column textAlign='center' width={8}>
                <Header as='h1' textAlign='center'>{Parser(this.state.title)}</Header>
                <Divider horizontal className='custom'> O </Divider>
                <Divider hidden />
                {Parser(this.state.content)}
                <Divider hidden />
                <Divider hidden />
              </Grid.Column>
            </Grid>
            <Grid stackable columns='equal' centered>
              <Grid.Row>
                {
                  this.state.pourquoi.map((item, id) => {
                    return (
                      <Item
                        key={id}
                        id={id}
                        isImage
                        img={item.img}
                        name={item.name}
                        description={item.description}
                      />
                    )
                  })
                }
              </Grid.Row>
            </Grid>
            <Divider hidden />
            <Divider hidden />
          </Grid.Column>
          <Grid.Column only='mobile' textAlign='center' width={16}>
            <Divider hidden />
            <Header as='h1'>{Parser(this.state.title)}</Header>
            <Divider horizontal className='customMobile'> O </Divider>
            <Divider hidden />
            {Parser(this.state.content)}
            <Divider hidden />
            <Divider hidden />
            <Grid centered>
              <Grid.Row>
                {
                  this.state.pourquoi.map((item, id) => {
                    return (
                      <Item
                        mobile
                        key={id}
                        id={id}
                        isImage
                        img={item.img}
                        name={item.name}
                        description={item.description}
                      />
                    )
                  })
                }
              </Grid.Row>
            </Grid>
            <Divider hidden />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

Pourquoi.propTypes = {
  data: PropTypes.object,
  typeRow: PropTypes.string
}

export default Pourquoi
