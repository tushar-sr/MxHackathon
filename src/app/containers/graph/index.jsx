import { h, render, Component } from 'preact'

import ActivityGraph from '../activityGraph'


class Graph extends Component {
  render () {
    return (
      <div className='graph-container'>
        <ActivityGraph handleChartClick={function(time){
          console.log(time)
        }} />
      </div>
    )
  }
}

export default Graph
