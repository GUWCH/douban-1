import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import './confirm.scss'
class Confirm extends Component {
    constructor (props) {
        super(props)
        this.state = {
            rendering: false,
            rendered: false
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.isShow && !this.state.rendering) {
            this.setState({
                rendering: true
            })
        }
    }

    componentDidUpdate () {
        if (this.props.isShow && !this.state.rendered) {
            this.setState({
                rendered: true
            })
        }
    }
    
    render () {
        const {
            children,
            isShow,
            title,
            text,
            onConfirm,
            confirmText,
            onCancel,
            cancelText
        } = this.props

        const {rendering, rendered} = this.state

        if (!rendering) {
            return null
        }

        const confirmClass = classNames({
            show: isShow && rendered,
            confirm: true
        })

        return (
            <div className={confirmClass}>
                <div className="box">
                    <section>
                        {
                            onCancel
                            ? <i className="close" onClick={onCancel}> </i>
                            : null
                        }
                        {
                            title
                            ? <h1>{title}</h1>
                            : null
                        }
                        {
                            text
                            ? <p className="text">{text}</p>
                            : null
                        }
                        {children}
                    </section>
                    <div className="btn-wrapper">
                        {
                            cancelText
                            ? <button className="btn btn-cancel" onClick={onCancel}>{cancelText}</button>
                            : null
                        }
                        <div className="btn btn-confirm" onClick={onConfirm}>
                            {confirmText}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Confirm