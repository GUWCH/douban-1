import {browserHistory} from 'react-router'
import {routerMiddleware} from 'redux-router-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import api from '../middlewares/api'
import {ignoreInvaildAction} from '../middlewares/ignoreActions'
// 引入处理登录信息的中间件
import growingIo from '../middlewares/growingIo'
import rootReducer from '../reducers'

export default function configureStore (initialState = {}) {
    let finalCreateStore = compose(
        applyMiddleware(thunk, api, ignoreInvaildAction),
        applyMiddleware(growingIo),
        applyMiddleware(routerMiddleware(browserHistory))
    )(createStore)
    
    return finalCreateStore(rootReducer, initialState)
}