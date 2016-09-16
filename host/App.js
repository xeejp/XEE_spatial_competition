import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions.js'

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from 'shared/Chart.js'
import DemandEditor from './DemandEditor.js'

import throttle from 'react-throttle-render'

const ThrottledChart = throttle(Chart, 200)

const mapStateToProps = ({ dispatch }) => ({
  dispatch,
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
    return (
      <div>
        <PageSteps />
        <Users />
        <ThrottledChart />
        <DemandEditor />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
