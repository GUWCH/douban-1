import React, {Component, PropTypes} from 'react'
class Bar extends Component {
    render () {
        return (
            <div className="spinner-bar" style={this.props.style}>
            </div>
        )
    }
}

Bar.propTypes = {
    style: PropTypes.object
}

export default Bar