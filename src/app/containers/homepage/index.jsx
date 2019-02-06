import { h, render, Component } from 'preact'
import { connect } from 'react-redux'


import styles from '../../styles/homepage/index.scss'

class Home extends Component {
  render () {
    return (
      <div className='hp-container'>
        Homepage
      </div>
    )
  }
}

export default Home
