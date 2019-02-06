const addActivity = (dispatch, data) => {
    if(window.socket){
        window.socket.emit('activity', data)
    }
}

const getVideoActivities = (dispatch, id) => {
    if(window.socket){
        window.socket.emit('getActivities', id)
    }
}

const onActivitiesReceived = (dispatch, data) => {
    dispatch({
        type: 'ON_ACTIVITIES_RECEIVED',
        payload: data
    })
}


const onViewersReceived = (dispatch, data) => {
    // dispatch({
    //     type: 'ON_VIEWERS_RECEIVED',
    //     payload: data
    // })
}

const onPollDataReceived = (dispatch, data) => {
    dispatch({
        type: 'ON_POLL_DATA_RECEIVED',
        payload: data
    })
}

const sendHearbeat = (dispatch) => {
    if(window.socket){
        window.socket.emit('heartbeat', window.location.pathname)
    }
}

const addPoll = (dispatch, data) => {
    if(window.socket){
        window.socket.emit('poll', data)
    }
}

const getPoll = (dispatch, id) => {
    if(window.socket){
        window.socket.emit('getPoll', id)
    }
}


export { addActivity, getVideoActivities, onActivitiesReceived, onViewersReceived, sendHearbeat, onPollDataReceived, getPoll, addPoll }

