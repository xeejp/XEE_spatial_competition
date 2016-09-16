import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip'
import Snackbar from 'material-ui/Snackbar'

import Finished from './Finished.js'
import During from './During.js'

import {
  getRoleName,
} from 'util/index'

const mapStateToProps = ({
  pair_state, pair_turn,
  point, role,
  game_progress,
}) => ({
  pair_state, pair_turn,
  point, role,
  game_progress,
})

const styles = {
  chip1: {
    margin: 4,
    float: "left"
  },
  chip2: {
    margin: 4,
    float: "right"
  },
  contents: {
    clear: "both"
  }
}

class Respond extends Component {
  renderContents () {
    const { pair_state } = this.props
    switch(pair_state) {
      case "during":
        return <During />
      case "finished":
        return  <Finished />
    }
  }

  render() {
    const {
      pair_state, pair_turn,
      point, role,
      game_progress,
    } = this.props
    return (
      role != null?
        <div>
        { pair_state != "finished"?
            <span>
              <Chip style={styles.chip1}>ターン: {pair_turn} / 2</Chip>
            </span>
          : <Chip style={styles.chip2}>参加者全体の進捗: {Math.round(game_progress)} %</Chip>
        }
        <Chip style={styles.chip2}>ポイント: {point}</Chip>
        <div style={styles.contents}>{this.renderContents()}</div>
        </div>
      :
        <p>参加できませんでした。終了をお待ち下さい。</p>
    )
  }
}

export default connect(mapStateToProps)(Respond)


