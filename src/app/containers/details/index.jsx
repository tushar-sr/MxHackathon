import { h, render, Component } from 'preact'

import Animator from './animator'
import Player from './player'

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
    autobind(this, 'onEmojiClick', 'setEmoji')
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
    }
  }

  render(){
    const {showEmoji, selectedEmojis, emojis } = this.state
    const elem = emojis.map((item, index) => {
      return <div className= 'emojis' onClick ={this.setEmoji} data-attributes={item} key={index}>{item}</div>
    })
    return (
      <div class='details'>
          <Player />
          <div className={showEmoji ? "react react-open" : "react"} onClick={this.onEmojiClick} > {elem} </div>
          {selectedEmojis && selectedEmojis.length > 0 &&
            <Animator emojis={selectedEmojis} />
          }
      </div>
    )
  }
}
