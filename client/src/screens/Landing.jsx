import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'

// import Layout from '../layouts/Layout'
import paintbrush from '../assets/images/purple_paintbrush.png'
import "./css/Landing.css"

export default function Landing() {

  const {currentUser} = useContext(Context)

  return (

    <div className="landing-page-container">
          {currentUser &&
            <div className="greeting">
            <h1>Hello, {currentUser.username}!</h1>
            <p>Click "View / Edit Profile" to get started</p>
            </div>
}
      <div className="landing-row first solid">
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
        <div className="call-to-action-card">
          <div className="call-to-action-overlay">
        <img src="https://res.cloudinary.com/willnolin/image/upload/v1627478256/paintbrushes_usygaj.jpg"
          alt="paintbrushes"  className="paintbrushes-call-to-action" />
      <p className= "call-to-action">
            The easiest place to connect with galleries and establishments to hang your art.
                <br />
                <br/>
        <Link to="/register" className="sign-up-link"> Sign up TODAY! </Link>
            </p>
            </div>
          </div>
        <div className="connect-card ">
          <div className="connect-overlay ">
       
            </div>
      <p className= "connect">
             Connect with Galleries
        <br/>
            </p>
          </div>
          </div>
      </div>

      {/* ///////////////////////SECOND ROW//////////////////////////////////// */}
      <div className="landing-row second">
      <div className= "second-row-content">
        <div className="featured-artist-card ">
          <div className="featured-artist-overlay ">
        {/* <img src="https://res.cloudinary.com/willnolin/image/upload/v1627478256/paintbrushes_usygaj.jpg"
          alt="paintbrushes"  className="paintbrushes" /> */}
            </div>
      <p className= "featured-artist">
              Artist Of The Week:
              Molly Parks
       
            </p>
          </div>
        <div className="call-to-action-gallery-card">
          <div className="call-to-action-overlay">
        <img src="https://res.cloudinary.com/willnolin/image/upload/v1627062605/gallery_frmhcm.jpg"
          alt="yellow-gallery"  className="yellow-gallery" />
      <p className= "gallery-info">
          Molly's work is on display at Bern Gallery and more!
                <br />
                <br />
        <Link to="/locations/" className="sign-up-link">  Search All Locations </Link>
            </p>
            </div>
          </div>
          </div>
      </div>

      {/* //////////////////// THIRD ROW //////////////////////////////////// */}
      <div className="landing-row second solid">
      <div className= "second-row-content">
          <div className="call-to-action-card no-shadow">
            <ul className="host-info">
            <li>Sign up to be a host and feature your establishment on this website.</li>
            <li>Artists will contact you via email to set up a time to meet.</li>
            <li>Artists will add your location to their profile for the public to view!</li>
            </ul>
              {/* <div className="call-to-action-overlay">
            <img src="https://res.cloudinary.com/willnolin/image/upload/v1627478256/paintbrushes_usygaj.jpg"
              alt="paintbrushes"  className="paintbrushes" />
          <p className= "call-to-action">
           
            <br/>
            <Link to="/register" className="sign-up-link"> Sign up TODAY! </Link>
                </p>
                </div> */}
              </div>
        <div className="call-to-host-card ">
          <div className="call-to-host-overlay ">
        {/* <img src="https://res.cloudinary.com/willnolin/image/upload/v1627478256/paintbrushes_usygaj.jpg"
          alt="paintbrushes"  className="paintbrushes" /> */}
            </div>
      <p className= "call-to-host">
              SIGN UP TO HOST ARTWORK
              <br />
              <br/>
              CONNECT WITH LOCAL ARTISTS
        <br/>
            </p>
          </div>
          </div>
      </div>

      {/* ////////////////////FOURTH ROW///////////////////////////////// */}
      <div className="landing-row fourth solid">
      <div className= "fourth-overlay">
          <div>
            <p>Upcoming Events:  Disc-golf Art show</p>  
          </div>
          <div>
            <p> We want to hear from you!</p>
            <p> Hit us up on social media!</p>
          </div>
          </div>
      </div>
    </div>
    // </Layout>
  )
}
