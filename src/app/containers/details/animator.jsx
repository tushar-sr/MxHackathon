import { h, render, Component } from 'preact'
import { connect } from 'react-redux'
import autobind from '@mxplay/autobind'

import styles from '../../styles/details/animator.scss'

export default class Animator extends Component {

  constructor(props) {
    super(props)
    this.state = {
      emojis: this.props.emojis || []
    }
    autobind(this, 'animate')
  }

  componentWillReceiveProps(){
    this.setState({
      emojis: this.props.emojis
    })
  }

  render () {
    const {emojis} = this.state
    const elem = emojis.map((emoji, index) => {
      const width = Math.random() * 100
      return <div className='animator animation' ref={element => this.element = element} key={width + index} >{emoji}</div>
    })
    return (
      <div className='bubble-animator'>
        {elem}
      </div>
    )
  }
}
