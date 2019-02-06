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
    dispatch({
        type: 'ON_VIEWERS_RECEIVED',
        payload: data
    })
}

const sendHearbeat = (dispatch) => {
    if(window.socket){
        window.socket.emit('heartbeat', window.location.pathname)
    }
}

export { addActivity, getVideoActivities, onActivitiesReceived, onViewersReceived, sendHearbeat }