import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'

// import Layout from '../layouts/Layout'
import paintbrush from '../assets/images/purple_paintbrush.png'
import "./css/Landing.css"

export default function Landing() {

  const {currentUser} = useContext(Context)

  return (
    // <Layout>
    <div className="landing-page-container">
          {currentUser &&
            <>
            <h1>Hello, {currentUser.username}!</h1>
            <p>Click "View / Edit Profile" to get started</p>
            </>
}
      <div className="landing-row first">
        <div className= "top-row-content">
        <div className="top">
          <p className="welcome-section-title"> WELCOME TO ART WALL!</p>
          <p className="welcome-section"> a community for artists and enthusiants</p>
          </div>
        <img src={paintbrush} alt="paintbrush" className="paintbrush" />
          </div>
      </div>
      <div className="landing-row second">
      <div className= "second-row-content">
        <div className="featured-artist-card ">
          <div className="featured-artist-overlay ">
        {/* <img src="https://res.cloudinary.com/willnolin/image/upload/v1627478256/paintbrushes_usygaj.jpg"
          alt="paintbrushes"  className="paintbrushes" /> */}
      <p className= "featured-artist">
              Artist Of The Week:
              Molly Parks
        <br/>

            </p>
            </div>
          </div>
        <div className="call-to-action-card">
          <div className="call-to-action-overlay">
        <img src="https://res.cloudinary.com/willnolin/image/upload/v1627478256/paintbrushes_usygaj.jpg"
          alt="paintbrushes"  className="paintbrushes" />
      <p className= "call-to-action">
        You can search for registered hosts in your area.
      Register an account and contact any of our listed hosts! Fill out your artist profile!
      Become a host yourself!  Art Wall is the easiest place to connect with
        local spaces so what are you waiting for?
        <br/>
        <Link to="/register" className="sign-up-link"> Sign up TODAY! </Link>
            </p>
            </div>
          </div>
          </div>
      </div>
    </div>
    // </Layout>
  )
}
