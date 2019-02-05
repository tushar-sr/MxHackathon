import React from 'react';
import { h, render, Component } from 'preact';
__DEBUG__ && require('preact/devtools');
import { Router, browserHistory, Route, match } from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'

import getRoutes, { createNewStore } from '../app/routes'
import Header from '../app/containers/header';

function renderHeader (store) {
  const headerContent = (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route component={Header} path='/*' />
      </Router>
    </Provider>
  )
  render(
    headerContent,
    document.getElementById('header'),
    document.getElementById('header').lastChild
  )
}

function renderMain (store) {
  const routes = getRoutes(store, true)
  const history = syncHistoryWithStore(browserHistory, store)

  match({
    history,
    routes
  }, (error, redirectLocation, renderProps) => {
    const mainContent = (
      <Provider store={store}>
        <Router {...renderProps} history={history} />
      </Provider>
    )

    render(
      mainContent,
      document.getElementById('main'),
      document.getElementById('main').lastChild
    )
  })
}

function renderComponents () {
  const store = createNewStore({
    activities: {
      "1": [
          [0, 1],
          [5, 7],
          [7, 4],
          [9, 9],
          [10, 4],
          [15, 4]
      ]
  }
  }, true)
  renderHeader(store)
  renderMain(store)
}

window.onload = renderComponents
