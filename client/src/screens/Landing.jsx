import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <Link to="/locations">Search Hosts</Link>
      <h3>Hi this is the Landing page</h3>
    </div>
  )
}
