import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions.js'

import Pages from './Pages.js'

const mapStateToProps = ({ dispatch }) => ({
  dispatch
})
class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    return <div>
      <Pages />
    </div>
  }
}

export default connect(mapStateToProps)(App)
