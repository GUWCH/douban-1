import Bar from './bar'
import React, {Component, PropTypes} from 'react'
import './spinner.scss'

class Spinner extends Component {
    getBars () {
        const {number} = this.props
        let bars = []
        for (let i = 0; i < number; i++) {
          const animationDuration = `${number / 10}s`
          const animationDelay = `${(i - number) / 10}s`
          const transform = `rotate(${i * 360 / number}deg) translate(146%)`
          let barStyle = {
            WebkitAnimationDelay: animationDelay,
            animationDelay,
            WebkitTransform: transform,
            transform,
            WebkitAnimationDuration: animationDuration,
            animationDuration
          }
          bars.push(<Bar key={i} style={barStyle} />)
        }
        return bars
    }
    render () {
        return (
            <div className={`${this.props.styleClass || ''} spinner`}>
                {this.getBars()}
            </div>
        )
    }
}

Spinner.defaultProps = {
    number: 12
}

Spinner.propTypes = {
    number: PropTypes.number,
    styleClass: PropTypes.string,

}

export default Spinner