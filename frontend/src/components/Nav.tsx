import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { USER_LOGOUT_REQUEST } from '../constants/userConstants'

const Nav = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state:any) => state.userLogin)
  const { userInfo } = userLogin

  console.log(userInfo);  

  const logoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch({type: USER_LOGOUT_REQUEST})
  }

  return (
    <>
      <nav className="nav">
            <button className="nav-opener md:hidden">Nav Opener</button>
            <div className="nav__drop">
            <ul className="list-none flex">
              <li><Link className="block p-2 text-black bg-red-200 md:mx-1 rounded" to="/">Home</Link></li>
            {
              !userInfo &&
              <><li><Link className="block p-2 text-black bg-red-200 md:mx-1 rounded" to="/login">Login</Link></li>
               <li><Link className="block p-2 text-black bg-red-200 md:mx-1 rounded" to="/signup">Signup</Link></li></>
            }
            {
              userInfo &&
              <><li><button onClick={logoutHandler} className="block p-2 text-black bg-red-200 md:mx-1 rounded">Logout</button></li>
              <li><Link to="/cart" className="block p-2 text-black bg-red-200 md:mx-1 rounded">Cart</Link></li></>
            }              
              <li><button className="dark-mode-toggle block p-2 text-black bg-red-200 md:mx-1 rounded">Dark/Light</button></li>
            </ul>
            </div>
          </nav>
    </>
  )
}

export default Nav
