import React from 'react'
import "./css/Footer.css"
import github from '../assets/images/github_icon.png'
import linkedin from '../assets/images/linkedin-icon.png'

export default function Footer() {
  return (
    <div className="footer">
      <a href="https://github.com/willnolin/Art-Wall">
        <img src={github} alt="github" className="icons" /></a>
      <a href="https://www.linkedin.com/in/willnolinmetivier/">
        <img src={linkedin} alt="linkedin" className="icons" /></a>
    </div>
  )
}

