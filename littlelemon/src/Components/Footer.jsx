import Nav from './Nav'
import './Footer.scss' 
import logo from '../assets/logo2.png'


export default function Footer() {
  return (
    <footer>
        <div className='footer-logo'>
          <img src={logo}
          alt="Little Lemon Logo"
          />
        </div>
        <div className="footer-content">
          <div className="footer-nav list">
            <h4>Navigation</h4>
            <Nav direction='column' label='Footer Navigation' />
          </div>
          <div className="contact list">
            <h4>Contact Us</h4>
            <ul>
              <li>
                  <p>123 Main Street, Anytown, USA</p>
              </li>
              <li>
                  <p>(123) 456-7890</p>
              </li>
              <li>
                  <p>info@littlelemon.com</p>
              </li>
            </ul>
          </div>
          <div className="social-media list">
            <h4>Socials</h4>
            <ul>
              <li>
                  <a href="https://www.facebook.com/littlelemon">Facebook</a>
              </li>
              <li>
                  <a href="https://www.instagram.com/littlelemon">Instagram</a>
              </li>
              <li>
                  <a href="https://www.twitter.com/littlelemon">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
        <span className='footer-copyright' >© 2023 Little Lemon. All rights reserved.</span>
    </footer>
  )
}
