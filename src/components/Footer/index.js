import {Component} from 'react'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <footer className="footer-div">
      <div className="footer-title">
        <img
          src="https://res.cloudinary.com/duonr3oqw/image/upload/v1681325469/capwithwhite_de5yvh.png"
          className="footer-logo"
          alt="website-footer-logo"
        />
        <h1 className="footer-head">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food.
        <br />
        Contact Us
      </p>
      <div className="footer-icon-div">
        <FaPinterestSquare
          testid="pintrest-social-icon"
          className="footer-icon-single"
        />
        <FaInstagram
          testid="instagram-social-icon"
          className="footer-icon-single"
        />
        <FaTwitter
          testid="twitter-social-icon"
          className="footer-icon-single"
        />
        <FaFacebookSquare
          testid="facebook-social-icon"
          className="footer-icon-single"
        />
      </div>
    </footer>
  )
}
