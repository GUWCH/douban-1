import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import './alert.scss'
class Alert extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isShow: true,
            top: 0
        }
    }
    componentDidMount () {
        this.timer = setTimeout(this.props.clean, 2000)
    }
    componentDidUpdate () {
        if (!this.state.isShow) {
            setTimeout(this.props.destory, 500)
        } else if (this.state.top) {
            this.props.clean()
        }
    }
    updateTop = (top) => {
        clearTimeout(this.timer)
        this.setState({top})
    }
    close = () => {
        clearTimeout(this.timer)
        this.setState({
            isShow: false
        })
    }
    render () {
        const {msg} = this.props
        const {isShow, top} = this.state
        const alertClass = classNames({
            alert: true,
            hide: !isShow
        })

        return (
            <div className={alertClass} style={{top: `${top}px`}}>
                <p>{msg || '错误信息'}</p>
                <button className="close-alert"
                    onClick={this.props.clean}
                ></button>
            </div>
        )
    }
}

Alert.newInstance = (props = {}) => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const destory = function () {
        ReactDOM.unmountComponentAtNode(div)
        document.body.removeChild(div)
    }
    const alert = ReactDOM.render(<Alert destory = {destory} {...props}/>, div)
    return {
        updateTop: alert.updateTop,
        close: alert.close,
        getOffsetHeight () {
            return ReactDOM.findDOMNode(alert).getOffsetHeight
        }
    }
}

Alert.propTypes = {
    msg: PropTypes.string,
    clean: PropTypes.func
}

export default Alert