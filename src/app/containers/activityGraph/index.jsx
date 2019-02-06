import { h, render, Component } from 'preact'

import { connect } from 'react-redux'

import styles from '../../styles/homepage/index.scss'

class ActivityGraph extends Component {
  constructor(props){
    super(props)
    this.updateChart = this.updateChart.bind(this)
    this.onChartLoaded = this.onChartLoaded.bind(this)
    this.handleChartClick = this.handleChartClick.bind(this)
  }
  componentDidMount(){
    this.graphWidth = this.container.clientWidth
    this.graphHeight = this.graphWidth*0.3
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.onChartLoaded);
  }
  onChartLoaded(){
    this.chart = new google.visualization.LineChart(document.getElementById('activity_chart'));
    google.visualization.events.addListener(this.chart, 'select', this.handleChartClick);
    this.updateChart(this.props)
  }

  formatData(props){
    let {duration, activities} = props
    if(!activities){
      return []
    }
    let data = []
    for(let c=0;c<duration;c++){
      if(activities[c]){
        data.push([c, 5 + activities[c].length])
      }else {
        data.push([c, 5])
      }
    }

    return data
  }

  updateChart(props){
    if(!this.chart){
      return
    }
    let actData = [
      ['Time', 'Activities']
    ]
    let formattedData = this.formatData(props)
    actData = actData.concat(formattedData)
    if(actData.length > 1){
      this.data = google.visualization && google.visualization.arrayToDataTable(actData);

      var options = {
        width: this.graphWidth,
        height: this.graphHeight,
        title: '',
        legend: { position: 'none' },
        backgroundColor: '#f3f3f3',
        curveType: 'function',
        chartArea: {'width': '80%', 'height': '80%'},
        colors: ["rgb(169, 220, 156)"],
        animation: {
          duration: 200
        },
        tooltip: {
          trigger: 'none'
        },
        vAxis: {
          gridlines: {
              color: 'transparent'
          },
          minValue: 0
        },
        hAxis: {
          gridlines: {
            color: 'transparent'
          }
        }
      };
      this.chart.draw(this.data, options);
    }
  }

  componentWillReceiveProps(nextProps){
    this.updateChart(nextProps)
  }

  handleChartClick(e){
    var selectedItem = this.chart.getSelection()[0];
    if (selectedItem) {
      var time = this.data.getValue(selectedItem.row, 0);
      if(this.props.handleChartClick){
        this.props.handleChartClick(time)
      }
    }
  }

  render () {
    return (
      <div className='graph-container' ref={(ele) => {this.container = ele}}>
        <div id="activity_chart"></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let routeParams = state.routeParams
  let id = routeParams.id
  return {
    activities: state.activities && state.activities[id]
  }
}
export default connect(mapStateToProps)(ActivityGraph)
