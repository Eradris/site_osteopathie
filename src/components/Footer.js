import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider } from 'semantic-ui-react'

class Footer extends Component {
  render () {
    return (
      <Grid.Row className={this.props.typeRow}>
        <Grid.Column width={10}>
          <Divider hidden />
          Site réalisé par Sébastien BIGORNE
          <Divider hidden />
        </Grid.Column>
      </Grid.Row>
    )
  }
}

Footer.propTypes = {
  typeRow: PropTypes.string
}

export default Footer
