import React from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired,
    index: PropTypes.string.isRequired,
    updateFish: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    // 1. Take a copy of the current fish
    const updatedFish = { 
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value
    }

    // 2.Update state through the update Fish function passed through props from App
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    const { name, price, status, desc, image } = this.props.fish
    return (
      <div className="fish-edit">
        <input 
          type="text" 
          name="name" 
          onChange={this.handleChange} 
          value={name}
        />
        <input 
          type="text" 
          name="price" 
          onChange={this.handleChange} 
          value={price}
        />
        <select 
          type="text" 
          name="status" 
          onChange={this.handleChange} 
          value={status}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea 
          name="desc" 
          onChange={this.handleChange} 
          value={desc} 
        >
        </textarea>
        <input 
          type="text" 
          name="image" 
          onChange={this.handleChange} 
          value={image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Remove Fish 
        </button>
      </div>
    )
  }
}

export default EditFishForm
