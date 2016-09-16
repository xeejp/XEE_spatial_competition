import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chart from 'shared/Chart.js'

import { fetchContents } from './actions'

const mapStateToProps = ({}) => ({
})

const Result = ({}) => (
  <div>
    <Chart />
  </div>
)

export default connect()(Result)
