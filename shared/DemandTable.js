import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table';

const mapStateToProps = ({ town_demand }) => ({
  town_demand
})

class DemandTable extends Component {
  render() {
    const { town_demand } = this.props
    return (
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
              <TableRowColumn>{town_demand["1"]}</TableRowColumn>
              <TableRowColumn>{town_demand["2"]}</TableRowColumn>
              <TableRowColumn>{town_demand["3"]}</TableRowColumn>
              <TableRowColumn>{town_demand["4"]}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DemandTable)
