import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../Context"
import "./css/Header.css"
import Hamburger from '../assets/images/hamburger_icon.png'

export default function Header() {
  const { currentUser, handleLogout, isOnProfile } = useContext(Context);
  return (
    <div className="header-container">
      {currentUser &&
        <div className="profile-pic-menu-icon">
          < img src={currentUser.profile_pic} alt="profile_pic" className="header-profile-pic" />
        </div>
      }
      <div className="header-left">
        {currentUser &&
          (isOnProfile ?
            <Link to={`/users/${currentUser.id}/edit`} className="header-links">
              Edit Profile
            </Link> :
            <Link to={`/users/${currentUser.id}`} className="header-links">
              View Profile
            </Link>)}
        {currentUser ?
          <>
            < img src={currentUser.profile_pic} alt="profile_pic" className="header-profile-pic" />
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
      {currentUser &&
        <div className="hamburger-menu-icon">
          < img src={Hamburger} alt="profile_pic" className="hamburger" />
        </div>
      }
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
