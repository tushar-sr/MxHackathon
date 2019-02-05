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

export { addActivity, getVideoActivities, onActivitiesReceived }