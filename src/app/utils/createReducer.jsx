export default (initialState, funcMap, routerReducer)=> {
  return (state = initialState, params) => {
    if (params && params.type) {
      const reducerHandler = funcMap[params.type]
      let currentState = reducerHandler ? reducerHandler(state, params.payload) : state
      if (typeof routerReducer === 'function') {
        currentState.routing = routerReducer(currentState.routing, params)
      }
      return currentState
    }
  }
}
