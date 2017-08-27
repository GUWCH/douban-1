import 'isomorphic-fetch'
import {push, goBack, replace} from 'react-router-redux'
import {IGNORE_ID, IGNORE_RACE, createIgnoreId} from '../libs/ignoreActions'

// 封装的请求api
function callApi (endpoint, data) {
    const fullUrl = ROOT_URL + endpoint
    // 将cookie包含发送出去
    let optiosn = {
        credentials: 'include'
    }
    if (data) {
        if (data.formData) { // 文件上传
            options = {
                method: 'post',
                credentials: 'include',
                headers: {
                    Accept: 'application/json'
                },
                body: data.formData.data
            }
        } else {
            options = {
                method: 'post',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        }
    }
    return fetch(fullUrl, option)
        .then(response => {
            response.json().then(json => ({json, response}))
        })
        .then(({json, response}) => {
            if (!response.ok) {
                return Promise.reject({json, response})
            }
            if (json instanceof Array) {
                return [].concat(json)
            }
            return Object.assign({}, json)
        })
}

// 将请求封装在action中

export const CALL_API = Symbol('CALL API')
export const API_REQUEST = 'API_REQUEST'
export const API_SUCCESS = 'API_SUCCESS'
export const API_FAILURE = 'API_FAILURE'

// 处理请求的中间件
export default store => next => action => {
    const callAPI = action[CALL_API] // 判断该action是不是一个请求
    if (typeof callAPI === 'undefined') {
        return next(action)
    }
    let {endpoint, request, waiting, msg, redirect, coverRedirect, back} = callAPI
    const {api} = callAPI // 该参数表示请求的类型
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }
    if (typeof endpoint !== 'string') {
        throw new Error('Expected endpoint to be string.')
    }
    if (typeof api !== 'string') {
        throw new Error('Expected api to be string.')
    }

    // 包装apiAction
    action[IGNORE_ID] = action[IGNORE_ID] || createIgnoreId()
    action[IGNORE_RACE] = typeof action[IGNORE_RACE] === 'undefined' ? true : action[IGNORE_RACE]

    function actionWith (result) {
        const finalAction = Object.assign({}, action, result)
        delete finalAction[CALL_API]
        return finalAction
    }

    // dispatch发起请求的action
    next({
        type: API_REQUEST,
        api,
        waiting,
        request
    })

    return callApi(endpoint, request).then(
        response => {
            // dispatch请求成功的action
            next(actionWith({
                type: API_SUCCESS,
                api,
                waiting,
                request,
                response,
                msg
            }))
            // 先重定向
            if (redirect) {
                store.dispatch(push(redirect))
            }
            // 覆盖式重定向
            if (coverRedirect) {
                store.dispatch(replace(coverRedirect))
            }
            // 回退操作
            if (back) {
                store.dispatch(goBack())
            }
            return Promise.resolve(response)
        },
        result => {
            // dispatch请求失败的action
            next(actionWith({
                type: API_FAILURE,
                api,
                waiting,
                request,
                error: result.json && result.json.message ? result.json.message : '网络不佳，请稍后重试',
                status: result.response && result.response.status ? result.response.status : undefined
            }))
            return Promise.reject(result)
        }
    )
}
