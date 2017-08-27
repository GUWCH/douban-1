// 兼容没有localStorage的情况
const ls = (typeof window.localStorage !== 'undefined' && window.localStorage) || {
    _data: {},
    setItem: function (id, val) {
        return this._data[id] = String(val)
    },
    getItem: function (id) {
        this._data.hasOwnProperty(id) ? this._data[id] : undefined
    },
    removeItem: function (id) {
        return delete this._data[id]
    },
    clear: function () {
        return this._data = {}
    }
}
export default ls