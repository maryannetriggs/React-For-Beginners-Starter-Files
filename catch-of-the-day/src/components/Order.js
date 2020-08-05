import React from 'react'
import PropTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { formatPrice } from '../helpers'

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  }

  // const styleObj = { textAlign: 'right' }

  renderOrder = key => {
    const { fishes, order } = this.props
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish && fish.status === 'available'
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 }
    }

    // Ensuring the fish are loaded before rendering to page to prevent errors and UI incidents
    if (!fish) return null

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition 
                classNames="count" 
                key={count} 
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            Kgs {fish.name} {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition >
    )
  }

  render() {
    const { fishes, order } = this.props
    const orderIds = Object.keys(order)

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const count = order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal
    }, 0)

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total: 
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}

export default Order 
