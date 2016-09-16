import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chip from 'material-ui/chip';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import DemandTable from 'shared/DemandTable.js'
import { getRoleName } from 'util/index.js'

import { submitTown } from './actions.js'

const mapStateToProps = ({ pair_turn, role, point, selected_town }) => ({
  pair_turn, role, point, selected_town
})


class During extends Component {
  constructor() {
    super()
    this.handle1 = this.handle1.bind(this)
    this.handle2 = this.handle2.bind(this)
    this.handle3 = this.handle3.bind(this)
    this.handle4 = this.handle4.bind(this)
  }

  handle1 = () => {
    const { dispatch }  = this.props
    dispatch(submitTown(1))
  }

  handle2 = () => {
    const { dispatch }  = this.props
    dispatch(submitTown(2))
  }

  handle3 = () => {
    const { dispatch }  = this.props
    dispatch(submitTown(3))
  }

  handle4 = () => {
    const { dispatch }  = this.props
    dispatch(submitTown(4))
  }

  render() {
    const { pair_turn, role, selected_town, point } = this.props
    const styles = {
      town_left: {
        width: "20%",
        marginLeft: "2.5%",
        float: "left"
      },
      town_right: {
        width: "23%",
        marginRight: "2.5%",
        float: "right"
      }
    }
    const enemy = (role == "shopA")? "shopB" : "shopA"
    const is_myTurn  = (role == "shopA")? pair_turn == 1? true : false : pair_turn == 2? true : false
    return (
      <div>
        <Card style={{marginBottom: 12}}>
          <CardHeader
            title={"あなたは" + getRoleName(role) + "側です"}
            subtitle={is_myTurn? "選択してください。" : getRoleName(enemy) + "側が選択中。しばらくお待ちください。" }
          />
          <CardText>
            <span style={{margin: 4}}>
              {pair_turn == 2? <Chip style={{marginBottom: 12}}>店Aの選択: 町{selected_town}</Chip> : <span /> }
              <RaisedButton style={styles.town_left}
                label={"町1"} disabled={!is_myTurn} onClick={is_myTurn? this.handle1 : null}
              />
              <RaisedButton style={styles.town_left}
                label={"町2"} disabled={!is_myTurn} onClick={is_myTurn? this.handle2 : null}
              />
              <RaisedButton style={styles.town_right}
                label={"町4"} disabled={!is_myTurn} onClick={is_myTurn? this.handle4 : null}
              />
              <RaisedButton style={styles.town_right}
                label={"町3"} disabled={!is_myTurn} onClick={is_myTurn? this.handle3 : null}
              />
            </span>
          </CardText>
        </Card>
        <span style={{clear: "both", margin: "auto"}} />
        <DemandTable />
      </div>
    )
  }
}

export default connect(mapStateToProps)(During)
