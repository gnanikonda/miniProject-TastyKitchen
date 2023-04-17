import {Link} from 'react-router-dom'
import {AiTwotoneStar} from 'react-icons/ai'

import './index.css'

const RestaurantsListHome = props => {
  const {restaurantDetails} = props
  const totalRatings = `( ${restaurantDetails.userRating.total_reviews} ratings )`

  return (
    <Link
      to={`/restaurants-list/${restaurantDetails.id}`}
      className="restaurant-home-link"
    >
      <li className="home-list-restaurant-class">
        <img src={restaurantDetails.imageUrl} className="restaurant-home-img" />
        <div>
          <h1 className="restaurant-name">{restaurantDetails.name}</h1>
          <p className="restaurant-para">Fast Food</p>
          <div className="rating-div-home">
            <AiTwotoneStar className="rating-icon" />
            <h1 className="rating-head">
              {restaurantDetails.userRating.rating}
            </h1>
            <p className="restaurant-totalratings">{totalRatings}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantsListHome
