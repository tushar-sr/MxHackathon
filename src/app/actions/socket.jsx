const addActivity = (dispatch, data) => {
    if(window.socket){
        window.socket.emit('activity', data)
    }
}

export { addActivity }