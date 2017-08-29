import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreaters} from 'redux'
import {routerActions} from 'react-router-redux'
import Immutable from 'immutable'
import Alert from '../alert'

class Test extends Component {
    constructor (props) {
        super(props)
    }
    componentWillMount () {
        const alert = Alert.newInstance({
            msg: 'this is a error',
            clean: () => {}
        })
    }
    render () {
        // debugger
        return (
            <div>hello world</div>
        )
    }
}
// debugger
const obj = Immutable.fromJS({name: 'wanger', age: 11})
const temObj = obj.merge({})

export default Test