import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreaters} from 'redux'
import {routerActions} from 'react-router-redux'
import Immutable from 'immutable'
import Alert from '../alert'
// import Spinner from '../spinner'
import Loading from '../loading'
import Confirm from '../confirm'

class Test extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isShow: false
        }
    }
    componentWillMount () {
        const alert = Alert.newInstance({
            msg: 'this is a error',
            clean: () => {}
        })
        const loading = Loading.newInstance()
        loading.show()
    }
    click = () => {
        this.setState({
            isShow: true
        })
    }
    render () {
        const {isShow} = this.state
        return (
            <div>
                <button style={{marginTop: '200px'}} onClick={this.click}>change the show</button>
                {/* <Spinner /> */}
                <Confirm
                isShow={isShow}
                title={'hello'}
                text={'hello world'}
                onConfirm={() => {}}
                onCancel={() => {}}
                cancelText={'取消'}
                confirmText={'确定'}
                >
                <span>i am the world</span>
                </Confirm>
                hello world
            </div>
        )
    }
}
// debugger
const obj = Immutable.fromJS({name: 'wanger', age: 11})
const temObj = obj.merge({})

export default Test