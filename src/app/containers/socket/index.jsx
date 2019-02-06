import { h, render, Component } from 'preact'
import { connect } from 'react-redux'

import { addActivity, onActivitiesReceived, onViewersReceived, sendHearbeat } from '../../actions/socket'

class Socket extends Component {
    constructor(props){
        super(props)
        this.onActivitiesReceived = this.onActivitiesReceived.bind(this)
        this.onViewersReceived = this.onViewersReceived.bind(this)
    }
    componentDidMount(){
        var socket = window.io()
        socket.on('videoActivities', this.onActivitiesReceived)
        socket.on('viewers', this.onViewersReceived)
        window.socket = socket
        window.setInterval(() => {
            sendHearbeat()
        }, 5000)
    }

    onViewersReceived(data){
        onViewersReceived(this.props.dispatch, data)
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
