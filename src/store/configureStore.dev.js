import {browserHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import api from '../middlewares/api'
import {ignoreInvaildAction} from '../middlewares/ignoreAction'
import {createLogger} from 'redux-logger'

import rootReducers from '../reducers'
import Immutable from 'immutable'

// console.log(browserHistory)

export default function configureStore (initialState = {}) {
    let finalCreateStore = compose(
        applyMiddleware(thunk, api, ignoreInvaildAction),
        applyMiddleware(routerMiddleware(browserHistory)),
        applyMiddleware(createLogger({
            stateTransformer: (state) => Immutable.fromJS(state).toJS()
        })),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore)
    const store = finalCreateStore(rootReducers, initialState)
    if (module.hot) {
        // 热更新reducers模块
        module.hot.accept('../reducers', () => {
            const nextReducers = require('../reducers')
            store.replaceReducer(nextReducers)
        })
    }
    return store
}