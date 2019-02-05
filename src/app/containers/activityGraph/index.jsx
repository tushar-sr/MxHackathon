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
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(this.onChartLoaded);
  }
  onChartLoaded(){
    this.chart = new google.visualization.ColumnChart(document.getElementById('activity_chart'));
    google.visualization.events.addListener(this.chart, 'select', this.handleChartClick);
    this.updateChart()
  }

  formatData(){
    let {duration, activities} = this.props
    if(!activities){
      return []
    }
    let data = []
    for(let c=0;c<duration;c++){
      if(activities[c]){
        data.push([c, activities[c].length])
      }else {
        data.push([c, 0])
      }
    }

    return data
  }

  updateChart(){
    let actData = [
      ['Time', 'Activities']
    ]
    let formattedData = this.formatData()
    debugger
    actData = actData.concat(formattedData)
    if(actData.length > 1){
      this.data = google.visualization.arrayToDataTable(actData);

      var options = {
        title: '',
        legend: { position: 'none' },
        tooltip: {
          trigger: 'none'
        },
        vAxis: {
          gridlines: {
              color: 'transparent'
          }
        }
      };
      this.chart.draw(this.data, options);
    }
  }

  componentWillReceiveProps(){
    this.updateChart()
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
      <div className='graph-container'>
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
