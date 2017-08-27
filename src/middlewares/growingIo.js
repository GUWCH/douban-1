// 处理登录信息的中间件
import {API_SUCCESS} from './api'
import {ME} from '../actions/member'

export default () => next => action => {
    const {type, api, reponse} = action
    if (type === API_SUCCESS && api === ME && response.member) {
        // 进行用户信息的一系列存储
    }
    next(action)
}