import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { changeTownDemand } from './actions.js'

const mapStateToProps = ({ town_demand }) => ({
  town_demand
})

class ConfigEditor extends Component {
  constructor() {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeDuration1 = this.handleChangeDuration1.bind(this)
    this.handleChangeDuration2 = this.handleChangeDuration2.bind(this)
    this.handleChangeDuration3 = this.handleChangeDuration3.bind(this)
    this.handleChangeDuration4 = this.handleChangeDuration1.bind(this)
    this.state = {
      open: false,
      town_demand_temp: {"1": 20, "2": 40, "3": 20, "4": 20}
    }
  }

  componentDidMount() {
    const { town_demand } = this.props
    this.state = {
      town_demand_temp: town_demand,
    }
  }

  handleOpen = () => {
    this.setState({open: true})
    const { town_demand } = this.props
    this.setState({
      town_demand_temp: town_demand,
    })
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = () => {
    this.setState({open: false});
    const { dispatch } = this.props
    const { town_demand_temp } = this.state
    dispatch(changeTownDemand(town_demand_temp))
  }

  handleReset = () => {
    this.setState({
      town_demand_temp: {"1": 20, "2": 40, "3": 20, "4": 20}
    })
  }

  handleChangeDuration1 = (event) => {
    const value = event.target.value;
    this.setState({
      town_demand_temp: Object.assign({}, this.state.town_demand_temp, {
        ["1"]: value.length > 0 ? parseInt(value) : 0,
      })
    })
  }

  handleChangeDuration2 = (event) => {
    const value = event.target.value;
    this.setState({
      town_demand_temp: Object.assign({}, this.state.town_demand_temp, {
        ["2"]: value.length > 0 ? parseInt(value) : 0,
      })
    })
  }

  handleChangeDuration3 = (event) => {
    const value = event.target.value;
    this.setState({
      town_demand_temp: Object.assign({}, this.state.town_demand_temp, {
        ["3"]: value.length > 0 ? parseInt(value) : 0,
      })
    })
  }

  handleChangeDuration4 = (event) => {
    const value = event.target.value;
    this.setState({
      town_demand_temp: Object.assign({}, this.state.town_demand_temp, {
        ["4"]: value.length > 0 ? parseInt(value) : 0,
      })
    })
  }

  render() {
    const { game_page } = this.props
    const { town_demand_temp } = this.state
    const actions = [
      <RaisedButton
        label="適用"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
      <RaisedButton
        label="キャンセル"
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="初期化"
        onTouchTap={this.handleReset}
      />,
    ]
    return (
      <span>
        <FloatingActionButton 
          onClick={this.handleOpen}
          disabled={game_page == "experiment"}
          style={{marginLeft: '5%'}} 
        >
          <ActionSettings />
        </FloatingActionButton>
        <Dialog
          title="需要表編集"
          actions={actions}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <div>
            <Table
              height={"150px"}
              fixedHeader={true}
              fixedFooter={false}
              selectable={false}
            >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
              >
                <TableRow>
                  <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                    需要
                  </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>町1</TableHeaderColumn>
                  <TableHeaderColumn>町2</TableHeaderColumn>
                  <TableHeaderColumn>町3</TableHeaderColumn>
                  <TableHeaderColumn>町4</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                deselectOnClickaway={false}
                displayRowCheckbox={false}
              >
                <TableRow>
                  <TableRowColumn><TextField
                                    floatingLabelText="需要 (初期値20)"
                                    value={this.state.town_demand_temp["1"]}
                                    onChange={this.handleChangeDuration1}
                                  />
                  </TableRowColumn>
                  <TableRowColumn><TextField
                                    floatingLabelText="需要 (初期値40)"
                                    value={this.state.town_demand_temp["2"]}
                                    onChange={this.handleChangeDuration2}
                                  />
                  </TableRowColumn>
                  <TableRowColumn><TextField
                                    floatingLabelText="需要 (初期値20)"
                                    value={this.state.town_demand_temp["3"]}
                                    onChange={this.handleChangeDuration3}
                                  />
                  </TableRowColumn>
                  <TableRowColumn><TextField
                                    floatingLabelText="需要 (初期値20)"
                                    value={this.state.town_demand_temp["4"]}
                                    onChange={this.handleChangeDuration4}
                                  />
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Dialog>
      </span>
    )
  }
}

export default connect(mapStateToProps)(ConfigEditor)
