import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {BsBagFill} from 'react-icons/bs'
import {GiExitDoor} from 'react-icons/gi'
import Cookies from 'js-cookie'

const Header = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header">
      <div className="mobile">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>

        <div>
          <Link to="/" className="mobile-btn">
            {' '}
            <FaHome />
          </Link>
          <Link to="/jobs" className="mobile-btn">
            <BsBagFill />
          </Link>
          <button onClick={logout} type="button" className="mobile-btn">
            <GiExitDoor />
          </button>
        </div>
      </div>
      <div className="laptop">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="nav-container">
          <Link to="/" className="nav-item">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-item">
            <li>Jobs</li>
          </Link>
        </ul>
        <button onClick={logout} className="logout" type="button">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
