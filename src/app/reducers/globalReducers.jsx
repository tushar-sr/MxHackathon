
export default Object.assign(
  {
    UPDATE_ROUTING_PARAMS(state, data){
      let newState = Object.assign({}, state)
      newState.routeParams = data
      return newState
    },
    ON_ACTIVITIES_RECEIVED(state, data){
      let newState = Object.assign({}, state)
      newState.activities = Object.assign({},state.activities)
      newState.activities[data.id] = data && data.activities
      return newState
    },
    ON_VIEWERS_RECEIVED(state, data){
      let newState = Object.assign({}, state)
      newState.viewers = Object.assign({},state.viewers)
      newState.viewers = data
      return newState
    },
    ON_POLL_DATA_RECEIVED(state, data){
      let newState = Object.assign({}, state)
      newState.poll = Object.assign({},state.poll)
      newState.poll = data.poll
      return newState
    }
  }
)
