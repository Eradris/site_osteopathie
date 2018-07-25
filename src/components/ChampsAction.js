import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Divider } from 'semantic-ui-react'
import Parser from 'html-react-parser'

import Item from './Item'

class ChampsAction extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: props.data.title,
      content: props.data.content,
      champsActions: props.data.champsActions,
      name: props.data.champsActions.name,
      symptome: props.data.champsActions.symptome,
      visible: true
    }

    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (name) {
    this.state.champsActions.map((item) => {
      if (item.name === name) {
        if (this.state.visible) {
          this.setState({visible: false})
          setTimeout(() => {
            this.setState({
              name: name,
              symptome: item.symptome,
              visible: true
            })
          }, 600)
        } else {
          this.setState({
            name: name,
            symptome: item.symptome,
            visible: true
          })
        }
      }
    })
  }

  render () {
    return (
      <Grid.Row id='champsAction' className={this.props.typeRow + ' champsAction'}>
        <Grid centered>
          <Grid.Column only='computer tablet' textAlign='center' width={15}>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Grid centered>
              <Grid.Column textAlign='center' width={8}>
                <Header as='h1' textAlign='center' className='customHeaderTow'>{Parser(this.state.title)}</Header>
                <Divider horizontal className='customDividerTow'> O </Divider>
                <Divider hidden />
                {Parser(this.state.content)}
                <Divider hidden />
              </Grid.Column>
            </Grid>
            <Grid centered>
              <Grid.Column width={15}>
                <Grid centered celled='internally' columns={3}>
                  <Grid.Row>
                    {
                      this.state.champsActions.map((item, id) => {
                        if (id < 3) {
                          return (
                            <Item
                              color='white'
                              circular
                              key={id}
                              id={id}
                              isImage
                              img={item.img}
                              name={item.name}
                              description={item.symptome}
                            />
                          )
                        }
                      })
                    }
                  </Grid.Row>
                  <Grid.Row>
                    {
                      this.state.champsActions.map((item, id) => {
                        if (id >= 3) {
                          return (
                            <Item
                              color='white'
                              circular
                              key={id}
                              id={id}
                              isImage
                              img={item.img}
                              name={item.name}
                              description={item.symptome}
                            />
                          )
                        }
                      })
                    }
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </Grid.Column>
          <Grid.Column only='mobile' textAlign='center' width={15}>
            <Divider hidden />
            <Grid centered>
              <Grid.Column textAlign='center' width={15}>
                <Header as='h1' textAlign='center' className='customHeaderTow'>{Parser(this.state.title)}</Header>
                <Divider horizontal className='customDividerTowMobile'> O </Divider>
                <Divider hidden />
                {Parser(this.state.content)}
                <Divider hidden />
              </Grid.Column>
            </Grid>
            <Grid stackable centered>
              {
                this.state.champsActions.map((item, id) => {
                  return (
                    <Item
                      color='white'
                      circular
                      mobile
                      key={id}
                      id={id}
                      isImage
                      img={item.img}
                      name={item.name}
                      description={item.symptome}
                    />
                  )
                })
              }
            </Grid>
            <Divider hidden />
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }
}

ChampsAction.propTypes = {
  data: PropTypes.object,
  typeRow: PropTypes.string
}

export default ChampsAction
