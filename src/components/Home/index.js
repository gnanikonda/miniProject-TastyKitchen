import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'
import {MdSort} from 'react-icons/md'
import {TiArrowSortedDown} from 'react-icons/ti'
import Header from '../Header'
import RestaurantsListHome from '../RestaurantsListHome'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    HamburgerStatus: false,
    discountCorouselImages: [],
    sortOption: sortByOptions[1].value,
    allRestaurantsList: [],
    activePageNo: 1,
  }

  componentDidMount() {
    this.getDiscountOffers()
    this.getAllRestaurentsList()
  }

  onRestaurentSuccess = data => {
    const modifiedList = data.restaurants.map(each => ({
      hasOnlineDelivery: each.has_online_delivery,
      userRating: each.user_rating,
      name: each.name,
      hasTableBooking: each.has_table_booking,
      isDeliveringNow: each.is_delivering_now,
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      imageUrl: each.image_url,
      id: each.id,
      menuType: each.menu_type,
      location: each.location,
      opensAt: each.opens_at,
      groupByTime: each.group_by_time,
    }))
    // console.log(modifiedList)
    this.setState({allRestaurantsList: modifiedList})
  }

  onRestaurentFail = error => {
    console.log(error)
  }

  getAllRestaurentsList = async () => {
    const {sortOption, activePageNo} = this.state
    const LIMIT = 9
    const offset = (activePageNo - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?limit=${LIMIT}&offset=${offset}&sort_by_rating=${sortOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onRestaurentSuccess(data)
    } else {
      this.onRestaurentFail()
    }
  }

  onDiscountCorouselSuccess = a => {
    const b = a.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
    }))

    this.setState({discountCorouselImages: b})
  }

  onDiscountCorouselFail = () => {
    console.log('error')
  }

  changeHamStatus = () => {
    this.setState(prevState => ({
      HamburgerStatus: !prevState.HamburgerStatus,
    }))
  }

  logoutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  closeFunc = () => {
    this.setState({HamburgerStatus: false})
  }

  getDiscountOffers = async () => {
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onDiscountCorouselSuccess(data.offers)
    } else {
      this.onDiscountCorouselFail()
    }
  }

  changeSortOption = event => {
    this.setState({sortOption: event.target.value}, this.getAllRestaurentsList)
  }

  ChangePreviousPage = () => {
    this.setState(
      prevState => ({activePageNo: prevState.activePageNo - 1}),
      this.getAllRestaurentsList,
    )
  }

  ChangeNextPage = () => {
    this.setState(
      prevState => ({activePageNo: prevState.activePageNo + 1}),
      this.getAllRestaurentsList,
    )
  }

  render() {
    const {
      HamburgerStatus,
      discountCorouselImages,
      sortOption,
      allRestaurantsList,
      activePageNo,
    } = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    // console.log(allRestaurantsList[0])

    return (
      <>
        <div className="maindivHome">
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

          <div>
            <ul className="ulcorouselClass">
              <Slider {...settings}>
                {discountCorouselImages.map(item => (
                  <li>
                    <img src={item.imageUrl} className="discountImgClass" />
                  </li>
                ))}
              </Slider>
            </ul>
          </div>
          <h1 className="popular-head">Popular Restaurents</h1>
          <div className="para-sortdiv">
            <p className="desc">
              Select Your favourite restaurent special dish and make your day
              happy...
            </p>
            <div className="sort-div">
              <MdSort size="25" className="sort-icons" />
              <p className="sort-icons">Sort by</p>
              <select
                className="selectClass"
                value={sortOption}
                onChange={this.changeSortOption}
              >
                {sortByOptions.map(option => (
                  <option
                    key={option.id}
                    value={option.value}
                    className="option-style"
                  >
                    {option.displayText}
                  </option>
                ))}
                <TiArrowSortedDown className="sort-icons" />
              </select>
            </div>
          </div>
          <ul className="ul-all-restaurant-class">
            {allRestaurantsList.map(restaurant => (
              <RestaurantsListHome restaurantDetails={restaurant} />
            ))}
          </ul>
          <div className="pagination-div-home">
            <button
              className="previous"
              data-testid="pagination-left-button"
              type="button"
              onClick={this.ChangePreviousPage}
            >
              &lt;
            </button>
            <p className="page" data-testid="active-page-number">
              {activePageNo} of 4
            </p>
            <button
              className="next"
              data-testid="pagination-right-button"
              type="button"
              onClick={this.ChangeNextPage}
            >
              &gt;
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
