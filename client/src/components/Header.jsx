import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../Context"
import "./css/Header.css"
import Hamburger from '../assets/images/hamburger_icon.png'
import GrayMan from '../assets/images/gray-person.png'
export default function Header() {
  const { currentUser, handleLogout, isOnProfile } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState('');
  const [clicked, setClicked] = useState(false);
  const [profileHighlight, setProfileHighlight] = useState('')
  const [hamburgerHighlight, setHamburgerHighlight] = useState('')

  const [hamburgerRotate, setHamburgerRotate] = useState('');
  const [profileMenuClicked, setProfileMenuClicked] = useState(false);

  const handleHamburger = () => {
    if (clicked) {
      setHamburgerRotate('hamburger-rotate')
      setHamburgerHighlight('highlight')
      setMenuOpen('show-hamburger')
    } else {
      setHamburgerRotate('')
      setHamburgerHighlight('')
      setMenuOpen('')
    }
  }

  const handleProfileMenu = () => {
    if (profileMenuClicked) {
      setProfileHighlight('highlight')
      setProfileMenuOpen('show-profile-menu')
    }
    else {
      setProfileHighlight('')
      setProfileMenuOpen('')
    }
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

            < img src={currentUser.profile_pic} alt="profile_pic"
              className={`header-profile-pic ${profileHighlight}`} />
            <div className={`profile-pic-menu-content ${profileMenuOpen}`} >
              <div className="profile-menu-links-div">
                <Link to={`/users/${currentUser.id}/edit`} className="profile-menu-links">
                  Edit Profile
                </Link>
              </div>

              <div className="profile-menu-links-div">
                <Link to={`/users/${currentUser.id}`} className="profile-menu-links">
                  View Profile
                </Link>
              </div>

              <div className="profile-menu-links-div">
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
            <img src={GrayMan} alt="login" className={`blank-profile-pic ${profileHighlight}`} />
            <div className={`profile-pic-menu-content ${profileMenuOpen}`}>
              <div className="profile-menu-links-div">
                <Link to="/login" className="profile-menu-links">
                  Login
                </Link>
              </div>
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
      <div><Link to="/" className="header-title">Art-Wall</Link></div>
      {/* Hamburger when logged in  ///////////////*/}
      {
        currentUser ?
          <div className="hamburger-menu-icon" onClick={() => {
            setClicked(prevState => !prevState)
            handleHamburger()
          }
          }>
            < img src={Hamburger} alt="profile_pic" className={`hamburger-image ${hamburgerRotate} ${hamburgerHighlight}`} />
            {/* <div className={`hamburger-menu-content ${menuOpen}`} style={{ display: menuOpen }}> */}
            <div className={`hamburger-menu-content ${menuOpen}`}>
              <div className="hamburger-link-div">
                <Link to="/locations" className="hamburger-links">
                  Search Hosts
                </Link>
              </div>
              <div className="hamburger-link-div">
                <Link to="/locations/new" className="hamburger-links">
                  Become A Host
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
            < img src={Hamburger} alt="profile_pic" className={`hamburger-image ${hamburgerRotate} ${hamburgerHighlight}`} />
            <div className={`hamburger-menu-content ${menuOpen}`}>
              <div className="hamburger-link-div">
                <Link to="/locations" className="hamburger-links">
                  SEARCH HOSTS
                </Link>
              </div>
            </div>
          </div>

      }
      <div className="header-right">
        <Link to="/locations" className="header-links">
          SEARCH HOSTS
        </Link>
        {currentUser &&

          <Link to="/locations/new" className="header-links">
            BECOME A HOST
          </Link>

        }
      </div>
    </div >
  )
}
