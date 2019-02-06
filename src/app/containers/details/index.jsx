import { h, render, Component } from 'preact'
import { connect } from 'react-redux'
import Animator from './animator'
import Player from './player'

import autobind from '@mxplay/autobind'

import styles from '../../styles/details/index.scss'

import { VideoPlayer } from '@mxplay/video-player'
import Poll from './poll';
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
      const id = e.currentTarget.getAttribute('data-id')
      this.setState({
        selectedEmojis : [id]
      })
      addActivity(this.props.dispatch, {
        id: this.props.id,
        time: this.player && this.player.currentTime(),
        emojiID: id
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
    const {showEmoji, selectedEmojis} = this.state
    let emojis = videoData[this.props.id].emojis
    let details = videoData[this.props.id].details
    let viewers = this.props.viewers
    let currentUrl = window.location.pathname
    let viewerCount = viewers[currentUrl] || 0
    let elem = []
    for(let key in emojis){
      if(emojis.hasOwnProperty(key)){
        let url = emojis[key]
        elem.push(
        <div className='emojis' onClick ={this.setEmoji} data-id={key} key={key}>
          <img src={url} />
        </div>)
      }
    }
    return (
      <div class='details'>
          <Player playerReady={this.playerReady} onTimeUpdate={this.onTimeUpdate} />
          <div className={showEmoji ? "react react-open" : "react"} onClick={this.onEmojiClick} > {elem} </div>
          {selectedEmojis && selectedEmojis.length > 0 &&
            <Animator emojis={selectedEmojis} id={this.props.id} />
          }
          <div className="viewer-count">
            Currently Viewing: {viewerCount}
          </div>
          <ActivityGraph duration={details.duration} handleChartClick = {this.handleChartClick} />
          <Poll/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  let routeParams = state.routeParams
  let id = routeParams.id

  return {
    id: id,
    activities: state.activities && state.activities[id],
    viewers: state.viewers || {}
  }
}
export default connect(mapStateToProps)(Details)
