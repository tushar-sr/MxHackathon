
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
      newState.activities[data.id] = data.activities
      return newState
    }
  }
)
