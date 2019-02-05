import { h, render, Component } from 'preact'
import { connect } from 'react-redux'

import { addActivity } from '../../actions/socket'

class Socket extends Component {
    componentDidMount(){
        var socket = window.io()
        socket.on('activity', function(data){
            console.log(data)
        })
        socket.on('videoActivities', function(data){
            console.log(data)
        })
        window.setTimeout(() => {
            addActivity(null, {
                id: "1234",
                time: 10,
                emojiID: "789"
            })
        }, 5000)
        window.socket = socket
    }
    render () {
        return <div></div>
    }
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps)(Socket)
