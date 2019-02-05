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
        socket.on('activity', function(data){
            console.log(data)
        })
        socket.on('videoActivities', this.onActivitiesReceived)
        window.setTimeout(() => {
            addActivity(null, {
                id: "1234",
                time: 10,
                emojiID: "789"
            })
        }, 5000)
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
