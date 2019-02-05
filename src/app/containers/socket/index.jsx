import { h, render, Component } from 'preact'
import { connect } from 'react-redux'

import { addActivity, onActivitiesReceived } from '../../actions/socket'

class Socket extends Component {
    constructor(props){
        super(props)
        this.onActivitiesReceived = this.onActivitiesReceived.bind(this)
    }
    componentDidMount(){
        var socket = window.io()
        socket.on('videoActivities', this.onActivitiesReceived)
        window.socket = socket
    }

    onActivitiesReceived(data){
        onActivitiesReceived(this.props.dispatch, data)
    }
    render () {
        return <div></div>
    }
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps)(Socket)
