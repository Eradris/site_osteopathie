import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider, Header, Image, Icon } from 'semantic-ui-react'
import Parser from 'html-react-parser'

class Item extends Component {
  render () {
    return (
      <Grid.Column textAlign='center' width={this.props.mobile ? 15 : null} className={(this.props.id % 2 !== 0 && this.props.mobile) ? 'printBgPourquoi' : ''}>
        { this.props.mobile && this.props.isIcon && this.props.id === 0 && <Divider hidden /> }
        { this.props.mobile && !this.props.isIcon && <Divider hidden /> }
        {
          this.props.isImage && <Image
            centered
            circular={this.props.circular}
            size='small' src={Parser(this.props.img)}
          />
        }
        { this.props.isImage && <Divider hidden /> }
        {
          this.props.isImage && <Header
            style={this.props.color ? {color: this.props.color} : {}}
            as='h2'
          >
            {Parser(this.props.name.replace('<p>', '').replace('</p>', ''))}
          </Header>
        }
        {
          this.props.isIcon && <Header as='h2' icon>
            <Icon name={Parser(this.props.icon)} />
            {Parser(this.props.name.replace('<p>', '').replace('</p>', ''))}
          </Header>
        }
        <Divider hidden />
        {Parser(this.props.description)}
        { this.props.mobile && this.props.isIcon && <Divider hidden /> }
        { this.props.mobile && <Divider hidden /> }
        { this.props.mobile && this.props.arrayLength - 1 === this.props.id && <Divider hidden /> }
      </Grid.Column>
    )
  }
}

Item.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.number,
  arrayLength: PropTypes.number,
  isImage: PropTypes.bool,
  mobile: PropTypes.bool,
  circular: PropTypes.bool,
  isIcon: PropTypes.bool
}

export default Item
