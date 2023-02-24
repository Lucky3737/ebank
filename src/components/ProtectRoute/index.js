import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const ProtectRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="ebank/login" />
  }

  return <Redirect to={props} />
}

export default ProtectRoute
