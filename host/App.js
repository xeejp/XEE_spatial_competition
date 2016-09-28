import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions.js'

import PageSteps from './PageSteps.js'
import Users from './Users.js'
import Chart from 'shared/Chart.js'
import DemandEditor from './DemandEditor.js'
import MatchingButton from './MatchingButton.js'
import DownloadButton from './DownloadButton.js'

import throttle from 'react-throttle-render'

const ThrottledChart = throttle(Chart, 200)

const mapStateToProps = ({ dispatch, participants, pairs, game_page }) => ({
  dispatch, participants, pairs, game_page
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
    const { participants, pairs, game_page } = this.props
    return (
      <div>
        <PageSteps />
        <Users />
        <ThrottledChart />
        <DemandEditor />
        <MatchingButton />
        <DownloadButton
          fileName={"spatial_competition.csv"}
          list={[
            ["立地ゲーム"],
            ["実験日", new Date()],
//            ["登録者数", Object.keys(participants).length],
            ["グループ数", Object.keys(pairs).length],
            ["ID"],
          ].concat(
//            Object.keys(participants).map(id => [id])
          )}
          style={{marginLeft: '2%'}}
          disabled={game_page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
