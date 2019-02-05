import React from 'react'
import { h, Component } from 'preact'
import { Route, browserHistory } from 'react-router'
import { routerReducer, routerMiddleware, replace } from 'react-router-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createReducer from '../utils/createReducer'
import globalReducers from '../reducers/globalReducers'
import { replaceURL } from '../actions/router'
import styles from '../styles/global/main.scss'

const devToolsMiddleWare =
__DEBUG__ && typeof window != 'undefined' && window.devToolsExtension
    ? window.devToolsExtension()
    : f => f

let lastRoute
let isClient = false
let store

export function createNewStore (initialState, isClient) {
  let reducerEnhancer = f => f
  if (isClient) {
    reducerEnhancer = compose(
      applyMiddleware(routerMiddleware(browserHistory)),
      devToolsMiddleWare
    )
  }
  store = createStore(
    createReducer({}, globalReducers, routerReducer),
    initialState,
    reducerEnhancer
  )
  return store
}

export function getCurrentStore () {
  return store
}

export function getLastRoute () {
  return lastRoute
}

function startComponent (Component, store, callback, routingParams) {
  lastRoute = store.getState().router

  
  const state = store.getState()
  const initAction = Component.initAction
  const element = Component.default

  if (initAction) {
    initAction(store.dispatch, state)
    .catch((err) => {
      if (err.redirect) {
        replaceURL(err.redirect)
      } else if (err.status === 404) {
        replaceURL('/not-found')
      }         
    })
  }
  callback(null, element)
}

export default (store, client) => {
  isClient = client
  return (
    <Route>
      <Route
        exact
        path="/"
        getComponent={(routingParams, callback) => {
          require.ensure([], component => {
            startComponent(require('../containers/homepage'), store, callback, routingParams)
          }, 'home')
        }}
      />
      <Route
        exact
        path="/graph"
        getComponent={(routingParams, callback) => {
          require.ensure([], component => {
            startComponent(require('../containers/graph'), store, callback, routingParams)
          }, 'home')
        }}
      />
      <Route
        exact
        path="/details/:id"
        getComponent={(routingParams, callback) => {
          require.ensure([], component => {
            startComponent(require('../containers/details'), store, callback, routingParams)
          }, 'Details')
        }}
      />
    </Route>
  )
}
