import {browserHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'react-thunk'
import api from '../middlewares/api'
import {ignoreInvalidAction} from '../middlewares/ignoreActions'
import createLogger from 'redux-logger'

import rootReducers from '../reducers'

import Immutable from 'immutable'

export default function configureStore (initialState = {}) {
    let finalCreateStore = compose(
        applyMiddleware(thunk, api, ignoreInvalidAction),
        applyMiddleware(routerMiddleware(browserHistory)),
        applyMiddleware(createLogger({
            stateTransformer: (state) => Immutable.fromJS(state).toJS()
        })),
        window.devToolsExtension ? window.devToolsExtension() : false
    )(createStore)
    const store = finalCreateStore(initialState)
    if (module.hot) {
        // 热更新reducers模块
        module.hot.accept('../reducers', () => {
            const nextReducers = require('../reducers')
            store.replaceReducer(nextReducers)
        })
    }
    return store
}