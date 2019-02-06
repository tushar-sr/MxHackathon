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

const onPollReceived = (dispatch, data) => {
    dispatch({
        type: 'ON_POLLS_RECEIVED',
        payload: data
    })
}

export { addActivity, getVideoActivities, onActivitiesReceived }