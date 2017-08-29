// system的reducers
import {combineReducers} from 'redux'
import Immutable, {Map} from 'immutable'
import {system as systemAction} from '../actions'
import {API_REQUEST, API_SUCCESS, API_FAILURE, IGNORE_ACTION_TYPE} from '../middlewares/ignoreAction'
import ls from '../libs/localStoragePolyfill'

// 公共的message的reducer
const message = (state = Map({}), {type, waiting, msg, error, info, originAction}) => {
    const timestamp = new Date()
    const loadingCount = state.get('loading') || 0
    switch (type) {
        case API_REQUEST:
            if (waiting) {
                return state.set('loading', loadingCount + 1)
            }
            return state
        case API_SUCCESS:
            if (waiting) {
                return state.merge({
                    loading: loadingCount - 1,
                    success: {
                        msg,
                        timestamp
                    }
                })
            }
            return state
        case API_FAILURE: 
            if (waiting) {
                return state.merge({
                    loading: loadingCount - 1,
                    error: {
                        msg: error,
                        timestamp
                    }
                })
            }
            return state
        case IGNORE_ACTION_TYPE: 
            if (originAction.waiting) {
                return state.set('loading', loadingCount - 1)
            }
            return state
        case systemAction.LOADING:
            if (waiting) {
                return state.set('loading', loadingCount + 1)
            }
            return state
        case systemAction.CLEAN_LOADING:
            return state.set('loading', 0)
        case systemAction.ERROR:
            return state.merge({
                error: {
                    msg,
                    timestamp
                }
            })
        case systemAction.CLEAN_ERROR:
            return state.merge({
                error: {
                    msg: null,
                    timestamp
                }
            })
        case systemAction.SUCCESS:
            return state.merge({
                success: {
                    msg,
                    timestamp
                }
            })
        case systemAction.CLEAN_SUCCESS:
            return state.merge({
                success: {
                    msg: null,
                    timestamp
                }
            })
        case systemAction.INFO:
            return state.merge({
                info: {
                    msg,
                    timestamp
                }
            })
        case systemAction.CLEAN_INFO:
            return state.merge({
                info: {
                    msg: null,
                    timestamp
                }
            })
        default:
            return state
    }
}

// comfirm的reducer
const confirmData = (state = Map({}), {type, options}) => {
    switch (type) {
        case systemAction.SHOW_CONFIRM:
            return Map(Object.assign({
                onConfirm: () => {},
                onCancel: () => {}
            }), options, {isShow: true})
        case systemAction.HIDE_CONFIRM:
            return state.merge({
                isShow: false
            })
        default:
            return state
    }
}

const apiTrace = (state = Map({}), {type, api}) => {
    return state.merge({
        api,
        status: type
    })
}

const shouldRefreshApi = (state = false, {type, status}) => {
    if (type === API_FAILURE && status === 409) return true
    return state
}

export default combineReducers({
    message,
    confirmData,
    apiTrace,
    shouldRefreshApi
})