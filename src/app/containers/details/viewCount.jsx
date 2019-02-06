import { h, render, Component } from 'preact'
import { connect } from 'react-redux'

class ViewCount extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    const {viewers} = this.props
    let currentUrl = window.location.pathname
    let viewerCount = viewers[currentUrl] || 0
    return (
      <div>
        <div className="viewer-count">
          Currently Viewing: {viewerCount}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    viewers: state.viewers || {}
  }
}
export default connect(mapStateToProps)(ViewCount)
