import React from 'react'
import base from '../base'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes' 
import Fish from './Fish'

import '../css/style.css'


class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match
    // First thing to do is reinstate local storage...
    const localStorageRef = localStorage.getItem(params.storeId)
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref =  base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }


  addFish = fish => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes }
    // 2. Add our new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish
    // 3. Set the new fishes object to state
    this.setState({ fishes })
  }

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes }

    // 2. Update that state
    fishes[key] = updatedFish

    // 3. Set that to state
    this.setState({ fishes })
  }

  deleteFish = (key) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes }

    // 2. Update the fish
    fishes[key] = null

    // 3. Update state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  }

  addToOrder = key => {
    // 1. Take a copy of the current state
    const order = { ...this.state.order }
    // 2. Either add to order or update the number in order 
    order[key] = order[key] + 1 || 1
    // 3. Update state
    this.setState({ order })
  }

  removeFromOrder = key => {
    // 1. Take a copy of the current state
    const order = { ...this.state.order }

    // 2. Remove item from the order
    delete order[key]

    // 3. Update state
    this.setState({ order })
  }

  render() {
    const { fishes, order } = this.state
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => 
              <Fish 
                key={key}
                index={key}
                details={fishes[key]}
                addToOrder={this.addToOrder}
              />)}
          </ul>
        </div>
        <Order 
          fishes={fishes}
          order={order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={fishes}
        />
      </div>
    )
  }
}

export default App
