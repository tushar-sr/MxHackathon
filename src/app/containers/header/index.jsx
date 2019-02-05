import React from 'react'
import { h, Component } from 'preact'

import styles from '../../styles/header/index.scss'
import Socket from '../socket';

class Header extends Component {
  render () {
    return (
      <div className='header-container'>
        <Socket />
      </div>
    )
  }
}

export default Header
