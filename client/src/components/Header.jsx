import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../Context"
import "./css/Header.css"

export default function Header() {
  const { currentUser, handleLogout, isEditing } = useContext(Context);
  return (
    <div className="header-container">
      <div className="header-left">

        {currentUser &&
          (isEditing ?
            <Link to={`/users/${currentUser.id}`} className="header-links">
              View Profile
            </Link> :
            <Link to={`/users/${currentUser.id}/edit`} className="header-links">
              Edit Profile
            </Link>)}
        {currentUser ?
          <>
            < img src={currentUser.profile_pic} className="header-profile-pic" />
            <p className="header-username">{currentUser.username}</p>
            <Link to="/" className="header-links" onClick={handleLogout}>
              Logout
            </Link>
          </> :
          <Link to="/login" className="header-links">
            Login
          </Link>

        }
      </div>
      <div className="header-title">Art-Wall</div>
      <div className="header-right">
        <Link to="/locations" className="header-links">
          Search Hosts
        </Link>
        {currentUser &&

          <Link to="/locations/new" className="header-links">
            Become a host
          </Link>

        }
      </div>
    </div>
  )
}
