import { h, render, Component } from 'preact'

import Animator from './animator'
import Player from './player'

import {addActivity} from '../../actions/socket'

import autobind from '@mxplay/autobind'

import styles from '../../styles/details/index.scss'

import { VideoPlayer } from '@mxplay/video-player'

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showEmoji: false,
      emojis: ['a', 'b', 'c'],
      selectedEmojis: []
    }
    this.player = null
    autobind(this, 'onEmojiClick', 'setEmoji', 'playerReady')
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

  setEmoji(e){
    if(this.state.showEmoji){
      const elem = e.target.getAttribute('data-attributes')
      this.setState({
        selectedEmojis : [elem]
      })
      addActivity(this.props.dispatch, {
        id: "1234",
        time: 1,
        emojiID: elem.id
      })
    }
  }

  playerReady(player){
    this.player = player
  }

  render(){
    const {showEmoji, selectedEmojis, emojis } = this.state
    const elem = emojis.map((item, index) => {
      return <div className= 'emojis' onClick ={this.setEmoji} data-attributes={item} key={index}>{item}</div>
    })
    return (
      <div class='details'>
          <Player playerReady={this.playerReady} />
          <div className={showEmoji ? "react react-open" : "react"} onClick={this.onEmojiClick} > {elem} </div>
          {selectedEmojis && selectedEmojis.length > 0 &&
            <Animator emojis={selectedEmojis} />
          }
      </div>
    )
  }
}
