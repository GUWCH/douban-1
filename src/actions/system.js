// 关于系统的action

// 错误信息的action
export const ERROR = 'ERROR'
export function error (msg) {
    return {
        type: ERROR,
        error: msg
    }
}

// 清除错误信息的action
export const CLEAN_ERROR = 'CLEAN_ERROR'
export function cleanError () {
    return {
        type: CLEAN_ERROR
    }
}

// info的action
export const INFO = 'INFO'
export function info (msg) {
    return {
        type: INFO,
        info: msg
    }
}

// 清除info
export const CLEAN_INFO = 'CLEAN_INFO'
export function cleanInfo () {
    return {
        type: CLEAN_INFO
    }
}

// success的信息
export const SUCCESS = 'SUCCESS'
export function success (msg) {
    return {
        type: SUCCESS,
        success: msg
    }
}

// 清除成功的信息
export const CLEAN_SUCCESS = 'CLEAN_SUCCESS'
export function cleanSuccess () {
    return {
        type: CLEAN_SUCCESS
    }
}

// loading的信息
export const LOADING = 'LOADING'
export function loading(waiting) {
    return {
        type: LOADING,
        waiting
    }
}

export const CLEAN_LOADING = 'CLEAN_LOADING'
export function cleanLoading () {
    return {
        type: CLEAN_LOADING
    }
}

// 确认框
export const SHOW_CONFIRM = 'SHOW_CONFIRM'
export function showConfirm (options) {
    return {
        type: SHOW_CONFIRM,
        options
    }
}

export const HIDE_CONFIRM = 'HIDE_CONFIRM'
export function hideConfirm () {
    return {
        type: HIDE_CONFIRM
    }
}
