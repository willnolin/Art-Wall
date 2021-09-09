import React from 'react'
import "./css/Search.css"
export default function Search(props) {
  const { setSearchItem } = props
  return (
    <div>
      <form className="search-form">
        <label htmlFor="header-search">
          <p className="visually-hidden">Search All Hosts</p>
        </label>
        <input type="text" id="header-search" placeholder="Search"
          onChange={(e) => {
            setSearchItem(e.target.value)
          }}
          className="search" />
      </form>
    </div>
  )
}
