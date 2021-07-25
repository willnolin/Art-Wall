import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../Context"
import "./css/Header.css"

export default function Header() {
  const { currentUser, handleLogout } = useContext(Context);
  return (
    <div className="header-container">
      <div className="header-left">
        <Link to="/locations" className="header-links">
          Search Hosts
        </Link>

        {currentUser &&
          <Link to={`/users/${currentUser.id}/edit`} className="header-links">
            Edit Profile
          </Link>}
      </div>
      <div className="header-title">Art-Wall</div>
      <div className="header-right">
        {currentUser ? (
          <>
            <Link to="/" className="header-links" onClick={handleLogout}>
              Logout
            </Link>

            <Link to="/locations/new" className="header-links">
              Become a host
            </Link>
          </>
        ) : (

          <Link to="/login" className="header-links">
            Login
          </Link>

        )}
      </div>
    </div>
  )
}
