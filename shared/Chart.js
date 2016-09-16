import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import Chip from 'material-ui/chip'

import Highcharts from 'react-highcharts';
import highchartsMore from 'highcharts-more'
import  heatmap from 'highcharts/modules/heatmap'
import exporting from 'highcharts/modules/exporting'

import DemandTable from 'shared/DemandTable.js'
import SwipeableViews from 'react-swipeable-views';
import { grey300 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import RightIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import LeftIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-left'

import { fallChartButton, changeChartTurn } from 'host/actions.js'

heatmap(Highcharts.Highcharts)
exporting(Highcharts.Highcharts)

function compData(results) {
  const pairs = results? Object.keys(results) : []
  console.log(pairs)
  const datas = []
  for(let y = 0; y < 4; y++) {
    for(let x = 0; x < 4; x++) {
      datas.push([x, y, (pairs.filter(p_id => results[p_id].shopA == x+1 && results[p_id].shopB == y+1)).length])
    }
  }
  console.log(datas)
  return datas
}

const mapStateToProps = ({ pairs, results, chart_turn, role }) => {
  const config = {
    chart: {
        type: 'heatmap',
        plotBorderWidth: 1
    },
    title: {
        text: '店Aと店Bのヒートマップ'
    },

    xAxis: {
        categories: ['町1', '町2', '町3', '町4'],
        title: {
          text: '店Aの選択'
        }
    },

    yAxis: {
        categories: ['町1', '町2', '町3', '町4'],
        title: {
          text: '店Bの選択'
        }
    },
    colorAxis: {
        minColor: '#FFFFFF',
        maxColor: '#7CB5EC',
    },
    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b>店A: ' + this.series.xAxis.categories[this.point.x] + '</b><br>' +
                '<b>店B: ' + this.series.yAxis.categories[this.point.y] + '</b><br />' +
                '<b>ペア数: ' + this.point.value + '</b>'
        }
    },
    series: [
      {
        borderWidth: 1,
        data: compData(results),
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
      }
    ]
  }
  return {
    config,
    chart_turn,
    role,
  }
}

class Chart extends Component {
  constructor(props) {
    super(props)
    const { role } = this.props
    this.handleCallback = this.handleCallback.bind(this)
    this.state = {
      expanded: Boolean(role),
    }
  }

  handleCallback = () => {
    const { dispatch, chart_button } = this.props
    if(chart_button){
      window.setTimeout(() => {
        location.href="#chart"
      }, 1 )
    }
    dispatch(fallChartButton())
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  }

  render() {
    const { config, chart_turn } = this.props
    return (
    <div id="chart">
      <Card
        style={{margin: '16px 16px'}}
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange}
      >
        <CardHeader
          title="グラフ"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <Highcharts style={{marginTop: 12}} config={config} callback={this.handleCallback}></Highcharts>
          <DemandTable />
        </CardText>
      </Card>
    </div>
    )
  }
}

export default connect(mapStateToProps)(Chart)
