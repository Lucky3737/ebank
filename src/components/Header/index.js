import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const LogoutApp = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
        alt="website logo"
      />
      <button type="button" onClick={LogoutApp} className="btn">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
