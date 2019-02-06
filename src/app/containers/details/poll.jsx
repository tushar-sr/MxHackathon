import { h, render, Component } from 'preact'
import { connect } from 'react-redux'

import autobind from '@mxplay/autobind'

import styles from '../../styles/details/poll.scss'

class Poll extends Component {

  constructor(props) {
    super(props)
    autobind(this, 'update')
  }

  update(){
    return false
  }

  render () {
    const {poll} = this.props
    if(!poll) {
      return null
    }
    const {options, poll_name, total} = poll
    let elem = []
    options.map((option) =>{
      const {name, count, color, textColor} = option
      const percentage = count/total * 100
      const style = {
        width: `${percentage}%`,
        backgroundColor: color,
        color: textColor
      }
      elem.push(
        <div className='poll-elements' style={style} onClick={this.update} >
          {name}
          <div className='poll-value-percent'>{`(${percentage}%)`}</div>
        </div>
      )
    })
    return (
      <div className='poll-container'>
        <div className='poll-live'>LIVE POLL</div>
        <div className='poll-title'>
        {poll_name}
        </div>
        <div className='poll-options-container'>
          {elem}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let routeParams = state.routeParams
  let id = routeParams.id
  return {
    poll: state.polls && state.polls[id] || examplePoll
  }
}
export default connect(mapStateToProps)(Poll)


const examplePoll = {
  id: 1,
  poll_name: 'Who will win the 2019 election',
  total: 100,
  options: [{
    name: 'BJP',
    count: 40,
    color: '#f97d09',
    textColor: '#278d27'
  }, {
    name: 'CONGRESS',
    count: 30,
    color: '#004489',
    textColor: '#fff'
  }, {
    name: 'OTHERS',
    count: 30,
    color: '#32c344',
    textColor: '#000'
  }]
}
