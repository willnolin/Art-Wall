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
      <div className="landing-row">
        <img src={paintbrush} alt="paintbrush" className="paintbrush" />
        <div>
          {currentUser &&
            <>
            <h1>Hello, {currentUser.username}!</h1>
            <p>Click "Edit Profile" to get started</p>
            </>
}
          <p className="welcome-section-title"> Welcome to Art Wall!</p>
          <p className="welcome-section">We are a community of artists looking for spaces
            to hang and sell art! </p>
        </div>
      </div>

      <p className= "call-to-action">
        You can search for registered hosts in your area.
      Register an account and contact any of our listed hosts! Fill out your artist profile!
      Become a host yourself!  Art Wall is the easiest place to connect with
        local spaces so what are you waiting for?
        <br/>
        <Link to="/register" className="sign-up-link"> Sign up TODAY! </Link>
      </p>

    </div>
    // </Layout>
  )
}
