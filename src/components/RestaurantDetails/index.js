import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'
import {AiTwotoneStar} from 'react-icons/ai'
import Header from '../Header'
import Footer from '../Footer'
import FoodItemsInRestaurant from '../FoodItemsInRestaurant'

import './index.css'

class RestaurantDetails extends Component {
  state = {
    specificRestaurantDetails: {},
    HamburgerStatus: false,
    foodItemsList: [],
  }

  componentDidMount() {
    this.getSpecificRestaurantDetails()
  }

  changeHamStatus = () => {
    this.setState(prevState => ({
      HamburgerStatus: !prevState.HamburgerStatus,
    }))
  }

  closeFunc = () => {
    this.setState({HamburgerStatus: false})
  }

  logoutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onSpecificRestaurentSuccess = data => {
    this.setState({
      specificRestaurantDetails: data,
      foodItemsList: data.food_items,
    })
  }

  getSpecificRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSpecificRestaurentSuccess(data)
    } else {
      this.onSpecificRestaurentFail()
    }
  }

  render() {
    const {
      specificRestaurantDetails,
      HamburgerStatus,
      foodItemsList,
    } = this.state

    return (
      <>
        <div className="maindivSpecific">
          <Header changeHamStatus={this.changeHamStatus} />
          {HamburgerStatus && (
            <div className="ul-close-div">
              <ul className="ulClass">
                <Link to="/" className="liClass">
                  <li className="home">
                    <p>Home</p>
                  </li>
                </Link>
                <Link to="/cart" className="liClass">
                  <li className="cart">
                    <p>Cart</p>
                  </li>
                </Link>

                <li className=" liClass">
                  <button className="lg-btn" onClick={this.logoutFunction}>
                    Logout
                  </button>
                </li>
              </ul>
              <IoMdClose size="30" onClick={this.closeFunc} className="lgout" />
            </div>
          )}
          <div className="specific-image-bg">
            <div className="img-div">
              <img
                src={specificRestaurantDetails.image_url}
                className="specificDetailsImg"
              />
            </div>
            <div className="banner-div">
              <h1 className="specific-hotel-name">
                {specificRestaurantDetails.name}
              </h1>
              <p className="specific-para">
                {specificRestaurantDetails.cuisine}
              </p>
              <p className="specific-para">
                {specificRestaurantDetails.location}
              </p>
              <div className="rating-cost-outer-div">
                <div className="rating-div">
                  <div className="rating-value-div">
                    <AiTwotoneStar className="start-icon-class" />
                    <p className="rating-class">
                      {specificRestaurantDetails.rating}
                    </p>
                  </div>
                  <div className="nofo-rating-div">
                    <p className="noof-counts-class">
                      {specificRestaurantDetails.items_count}
                    </p>
                    <p className="rating-text-class">+ Ratings</p>
                  </div>
                </div>
                <div className="rating-div1">
                  <div className="rating-value-div">
                    <AiTwotoneStar className="start-icon-class" />
                    <p className="rating-class">
                      {specificRestaurantDetails.rating}
                    </p>
                  </div>
                  <div className="nofo-rating-div">
                    <p className="noof-counts-class">
                      {specificRestaurantDetails.items_count}
                    </p>
                    <p className="rating-text-class">+ Ratings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="ul-food-items-div">
            {foodItemsList.map(item => (
              <FoodItemsInRestaurant key={item.id} itemDetails={item} />
            ))}
          </ul>
        </div>

        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
