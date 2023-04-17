import {Component} from 'react'
import {AiTwotoneStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bs'
import Counter from '../Counter'
import './index.css'

class FoodItemsInRestaurant extends Component {
  state = {
    toAdd: false,
  }

  clickOnAddItem = () => {
    this.setState(prevState => ({
      toAdd: true,
    }))
  }

  render() {
    const {itemDetails} = this.props
    const {toAdd} = this.state
    return (
      <li className="home-list-restaurant-class1">
        <img src={itemDetails.image_url} className="restaurant-home-img" />
        <div className="food-details-div">
          <h1 className="restaurant-name">{itemDetails.name}</h1>
          <div className="currency-div">
            <p className="restaurant-para">{itemDetails.cost}</p>
          </div>
          <div className="rating-div-home">
            <AiTwotoneStar className="rating-icon" />
            <p className="rating-class">{itemDetails.rating}</p>
          </div>
          {toAdd ? (
            <Counter itemDetails={itemDetails} />
          ) : (
            <div>
              <button className="add-btn" onClick={this.clickOnAddItem}>
                Add
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItemsInRestaurant
