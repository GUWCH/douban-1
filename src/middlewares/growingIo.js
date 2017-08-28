// 处理登录信息的中间件
// import {API_SUCCESS} from './api'
// import {ME} from '../actions/member'

export default () => next => action => {
    // const {type, api, response} = action
    // if (type === API_SUCCESS && api === ME && response.member) {
    //     // 进行用户信息的一系列存储
    // }
    window.console.log('do something about user')
    next(action)
}