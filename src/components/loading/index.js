import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import Spinner from '../spinner'
import classNames from 'classnames'
import './loading.scss'
class Loading extends Component {
    constructor (props) {
        super(props)
        this.state = {
            show: false
        }
    }
    show = () => {
        this.setState({
            show: true
        })
    }
    hide = () => {
        this.setState({
            show: false
        })
    }
    render () {
        const {show} = this.state
        const className = classNames({
            show,
            loading: true
        })
        return (
            <div className={className}>
                <div className="box">
                    <Spinner />
                </div>
            </div>
        )
    }
}

Loading.newInstance = (...props) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const loading = ReactDOM.render(<Loading {...props}/>, div)
    return {
        show: loading.show,
        hide: loading.hide
    }
}

export default Loading