import React from 'react'
import { Link } from 'react-router-dom'
import "./css/Header.css"

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-left">
        <Link to="/locations" className="header-links">
          Search Hosts
        </Link>
      </div>
      <div className="header-title">Art-Wall</div>
      <div className="header-right">
        <Link to="/login" className="header-links">
          Login
        </Link>
      </div>
    </div>
  )
}
