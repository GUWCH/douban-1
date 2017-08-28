import {routerReducer as routing} from 'react-router-redux'
import {combineReducers} from 'redux'
// import {API_SUCCESS, API_FAILURE} from '../middlewares/api'

const appReducer = combineReducers({
    routing
})

export default function (state, {type, api, status, ...others}) {
    // if (type === API_FAILURE && status === 401 || type === API_SUCCESS && api === memberActions.SIGN_OUT) {
    //     // 重置除system和routing的state
    //     state= {
    //         system: state.system,
    //         routing: state.routing
    //     }
    // }
    return appReducer(state, {type, api, status, ...others})
}