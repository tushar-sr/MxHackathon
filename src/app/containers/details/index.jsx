import { h, render, Component } from 'preact'
import { connect } from 'react-redux'
import Animator from './animator'
import Player from './player'

import autobind from '@mxplay/autobind'

import styles from '../../styles/details/index.scss'

import { VideoPlayer } from '@mxplay/video-player'
import { addActivity, getVideoActivities } from '../../actions/socket'
import videoData from '../../data'
import ActivityGraph from '../activityGraph';

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEmoji: false,
      emojis: ['a', 'b', 'c'],
      selectedEmojis: []
    }
    this.player = null
    autobind(this, 'onEmojiClick', 'setEmoji', 'playerReady', 'handleChartClick', 'onTimeUpdate')
  }

  onEmojiClick(e){
    this.setState({
      showEmoji : !this.state.showEmoji
    })
    if(this.state.showEmoji){
      this.setState({
        selectedEmojis : []
      })
    }
  }

  componentDidMount(){
    getVideoActivities(null, this.props.id)
  }

  setEmoji(e){
    if(this.state.showEmoji){
      const elem = e.target.getAttribute('data-attributes')
      this.setState({
        selectedEmojis : [elem]
      })
      addActivity(this.props.dispatch, {
        id: "1234",
        time: this.player && this.player.currentTime(),
        emojiID: elem.id || 123
      })
    }
  }

  handleChartClick(time){
    this.player && this.player.currentTime(time)
  }

  onTimeUpdate(time){
    const emojis = this.props.activities[time]
    if(emojis && emojis.length > 0) {
      this.setState({
        selectedEmojis : emojis
      })
    }
  }

  playerReady(player){
    this.player = player
  }

  render(){
    const {showEmoji, selectedEmojis, emojis } = this.state
    let details = videoData[this.props.id].details
    const elem = emojis.map((item, index) => {
      return <div className= 'emojis' onClick ={this.setEmoji} data-attributes={item} key={index}>{item}</div>
    })
    return (
      <div class='details'>
          <Player playerReady={this.playerReady} onTimeUpdate={this.onTimeUpdate} />
          <div className={showEmoji ? "react react-open" : "react"} onClick={this.onEmojiClick} > {elem} </div>
          {selectedEmojis && selectedEmojis.length > 0 &&
            <Animator emojis={selectedEmojis} />
          }

          <ActivityGraph duration={details.duration} handleChartClick = {this.handleChartClick} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let routeParams = state.routeParams
  let id = routeParams.id

  return {
    id: id,
    activities: state.activities && state.activities[id]
  }
}
export default connect(mapStateToProps)(Details)
