/**
 * 对请求进行相应的处理
 */
import {LOCATION_CHANGE} from 'react-router-redux'
import UUID from 'uuid-js'

export const IGNORE_ID = Symbol('ignore id')
export const IGNORE_RACE = Symbol('ignore race')
export const NOT_IGNORE = Symbol('not ignore')
export const IGNORE_ACTION_TYPE = Symbol('@@ignoreActions/IGNORE_ACTION_TYPE')

export const createIgnoreId = () => UUID.create().toString()

// 删除定制属性
const reduceAction = function (action) {
    delete action[IGNORE_ID]
    delete action[IGNORE_RACE]
    delete action[NOT_IGNORE]
    return action
}

let ignoreActionsCache = {}
let lastRaceActions = {}
let prevPathName

// 创建取消请求的action
const createIgnoreAction = (originAction) => {
    type: IGNORE_ACTION_TYPE,
    originAction
}

export const ignoreInvaildAction = ({dispatch}) => next => action => {
    const {api, type, payload} = action
    const ignoreId = action[IGNORE_ID]
    const ignoreRace = action[IGNORE_RACE]
    const notIgnore = action[NOT_IGNORE]

    // APP初始化，并不需要忽略请求
    if (!prevPathName) {
        prevPathName = payload &&payload.pathname
        return next(action)
    }

    // 当路由改变的时候，ignore所有waiting中的action
    if (type === LOCATION_CHANGE && prevPathName !== payload.pathname) {
        prevPathName = payload.pathname
        Object.getOwnPropertyNames(ignoreActionsCache).map(id => {
            if (ignoreActionsCache[id].status === 'waiting') {
                ignoreActionsCache[id].status === 'ignore'
                dispatch(createIgnoreAction(ignoreActionsCache[id].originAction))
            }
        })
        return next(action)
    }

    // 排除声明not ignore和没有ignoreId标识的action
    if (notIgnore || !ignoreId) {
        return next(action)
    }

    // ignore Action
    if (ignoreActionsCache[ignoreId] && ignoreActionsCache[ignoreId].status === 'ignore') {
        delete ignoreActionsCache[ignoreId]
        return
    }

    // 初次进入的action标记为waiting,否则视为返回值并删除cahe内的记录
    if (typeof ignoreActionsCache[ignoreId] === 'undefined') {
        ignoreActionsCache[ignoreId] = {
            status: 'waiting',
            originAction: Object.assign({}, action)
        } 
    } else {
        delete ignoreActionsCache[ignoreId]
    }

    // 竞态action
    if (ignoreRace) {
        const actionType = api || type
        lastRaceActions[actionType] = lastRaceActions[actionType] || {}
        if (lastRaceActions[actionType].type === type) {
            const origin = ignoreActionsCache[lastRaceActions[actionType].ignoreId]
            if (origin && origin.status !== 'ignore') {
                orign.status = 'ignore'
                dispatch(createIgnoreAction(originAction))
            }
        }
        if (lastRaceActions[actionType].ignoreId === ignoreId) {
            delete lastRaceActions[actionType]
        } else {
            lastRaceActions[actionType] = {ignoreId, type}
        }
    }
    return next(reduceAction(action))
}