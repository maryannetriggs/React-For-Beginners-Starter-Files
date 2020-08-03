import React from 'react'

import { formatPrice } from '../helpers'

class Order extends React.Component {

  renderOrder = key => {
    const { fishes, order } = this.props
    const fish = fishes[key]
    const count = order[key]
    const isAvailable = fish && fish.status === 'available'

    // Ensuring the fish are loaded before rendering to page to prevent errors and UI incidents
    if (!fish) return null

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : 'fish' } is no longer available
        </li>
      )
    }
    return (
      <li key={key}>
        {count} Kgs {fish.name}

        {formatPrice(count * fish.price)}
      </li>
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
        <ul className="order">
          {orderIds.map(this.renderOrder)}      
        </ul>
        <div className="total">Total: <strong>{formatPrice(total)}</strong></div>
      </div>
    )
  }
}

export default Order 
