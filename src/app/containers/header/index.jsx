import React from 'react'
import { h, Component } from 'preact'

import styles from '../../styles/header/index.scss'
import Socket from '../socket'
import { Link } from 'react-router'

class Header extends Component {
  render () {
    return (
      <div className='header-container'>
        <Socket />
        <img src='/images/logo.png'></img>
        {/* <Link to='/'>
          
        </Link> */}
      </div>
    )
  }
}

export default Header
