import React from 'react'

class EditFishForm extends React.Component {
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
      </div>
    )
  }
}

export default EditFishForm
