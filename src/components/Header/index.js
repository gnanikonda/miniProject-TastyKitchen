import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'

import './index.css'

const Header = props => {
  const clikedonHamburger = () => {
    const {changeHamStatus} = props

    changeHamStatus()
  }

  const logoutFunction1 = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-class">
      <div className="nav-div-class">
        <img
          src="https://res.cloudinary.com/duonr3oqw/image/upload/v1681051096/loginkitchen_ted7lm.jpg"
          className="headerCap"
        />
        <h1 className="header-head">Tasty Kitchens</h1>
      </div>
      <div className="hamburger-div">
        <GiHamburgerMenu
          className="hamburgerIcon"
          onClick={clikedonHamburger}
        />
      </div>
      <div className="ul-close-div1">
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
            <button className="lg-btn" onClick={logoutFunction1}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
