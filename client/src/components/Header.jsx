import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../Context"
import "./css/Header.css"
import Hamburger from '../assets/images/hamburger_icon.png'
import GrayMan from '../assets/images/gray-person.png'
export default function Header() {
  const { currentUser, handleLogout, isOnProfile } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState('none');
  const [profileMenuOpen, setProfileMenuOpen] = useState('none');
  const [clicked, setClicked] = useState(false);
  const [profileMenuClicked, setProfileMenuClicked] = useState(false);

  const handleHamburger = () => {
    if (clicked)
      setMenuOpen('block')
    else
      setMenuOpen('none')
  }

  const handleProfileMenu = () => {
    if (profileMenuClicked)
      setProfileMenuOpen('block')
    else
      setProfileMenuOpen('none')
  }

  return (
    <div className="header-container">
      {/* Profile Menu Mobile if logged in///////////// */}
      {currentUser ?
        <>
          <div className="profile-pic-menu-icon" onClick={() => {
            setProfileMenuClicked(prevState => !prevState)
            handleProfileMenu()
          }
          }>

            < img src={currentUser.profile_pic} alt="profile_pic" className="header-profile-pic" />
            <div className="profile-pic-menu-content" style={{ display: profileMenuOpen }}>
              <div>
                <Link to={`/users/${currentUser.id}/edit`} className="profile-menu-links">
                  Edit Profile
                </Link>
              </div>
              <div>
                <Link to={`/users/${currentUser.id}`} className="profile-menu-links">
                  View Profile
                </Link>
              </div>
              <div>
                <Link to="/" className="profile-menu-links" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </> :
        // Profile Menu if logged out //////////////////
        <>
          <div className="profile-pic-menu-icon" onClick={() => {
            setProfileMenuClicked(prevState => !prevState)
            handleProfileMenu()
          }
          }>
            <img src={GrayMan} alt="login" className="blank-profile-pic" />
            <div className="profile-pic-menu-content" style={{ display: profileMenuOpen }}>
              <Link to="/login" className="profile-menu-links">
                Login
              </Link>
            </div>
          </div>
        </>

      }
      {/* Profile menu  desktop when width > 420 //////////// */}
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
      {/* Hamburger when logged in  ///////////////*/}
      {
        currentUser ?
          <div className="hamburger-menu-icon" onClick={() => {
            setClicked(prevState => !prevState)
            handleHamburger()
          }
          }>
            < img src={Hamburger} alt="profile_pic" className="hamburger-image" />
            <div className="hamburger-menu-content" style={{ display: menuOpen }}>
              <div>
                <Link to="/locations" className="hamburger-links">
                  Search Hosts
                </Link>
              </div>
              <div>
                <Link to="/locations/new" className="hamburger-links">
                  Become a host
                </Link>
              </div>
            </div>
          </div> :
          // Hamburger when logged out /////////////////////
          <div className="hamburger-menu-icon" onClick={() => {
            setClicked(prevState => !prevState)
            handleHamburger()
          }
          }>
            < img src={Hamburger} alt="profile_pic" className="hamburger-image" />
            <div className="hamburger-menu-content" style={{ display: menuOpen }}>
              <Link to="/locations" className="hamburger-links">
                Search Hosts
              </Link>
            </div>
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
    </div >
  )
}
