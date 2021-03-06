import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from "../Context"
import "./css/Header.css"
import Hamburger from '../assets/images/hamburger_icon.png'
import GrayMan from '../assets/images/gray-person.png'
export default function Header(props) {
  const { handleLogout, isOnProfile } = props;
  const { currentUser } = useContext(Context);
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
            {currentUser.name ?
              < img src={currentUser.profile_pic} alt="profile_pic"
                className={`header-profile-pic ${profileHighlight}`} />
              :
              < img src={GrayMan} alt="profile_pic"
                className={`header-profile-pic ${profileHighlight}`} />
            }
            <div className={`profile-pic-menu-content ${profileMenuOpen}`} >
                <Link to={`/users/${currentUser.id}/edit`} className="profile-menu-links">
              <div className="profile-menu-links-div">
                  Edit Profile
              </div>
                </Link>

                <Link to={`/users/${currentUser.id}`} className="profile-menu-links">
              <div className="profile-menu-links-div">
                  View Profile
              </div>
                </Link>

                <Link to="/home" className="profile-menu-links" onClick={handleLogout}>
              <div className="profile-menu-links-div">
                  Logout
              </div>
                </Link>
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
                <Link to="/login" className="profile-menu-links">
              <div className="profile-menu-links-div">
                  Login
              </div>
                </Link>
            </div>
          </div>
        </>

      }
      {/* Profile menu  desktop when width > 550 //////////// */}
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
          <>{currentUser.name ?
            < img src={currentUser.profile_pic} alt="profile_pic" className="header-profile-pic" />
            :
            < img src={GrayMan} alt="profile_pic" className="header-profile-pic" />
          }
            <p className="header-username">{currentUser.username}</p>
            <Link to="/home" className="header-links" onClick={handleLogout}>
              Logout
            </Link>
          </> :
          <Link to="/login" className="header-links login">
            Login
          </Link>

        }
      </div>
      <div><h1><Link to="/home" className="header-title">Art Wall</Link></h1></div>
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
                <Link to="/locations" className="hamburger-links">
              <div className="hamburger-link-div">
                  Search Hosts
              </div>
                </Link>
                <Link to="/locations/new" className="hamburger-links">
              <div className="hamburger-link-div">
                  Become A Host
              </div>
                </Link>
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
                <Link to="/locations" className="hamburger-links">
              <div className="hamburger-link-div">
                  SEARCH HOSTS
              </div>
                </Link>
            </div>
          </div>

      }
      <div className="header-right">
        <Link to="/locations" className="header-links search">
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
