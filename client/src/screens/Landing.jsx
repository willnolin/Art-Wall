import React from 'react'
import { Link } from 'react-router-dom'
// import Layout from '../layouts/Layout'

export default function Landing() {
  return (
    // <Layout>
    <div>
      <Link to="/locations">Search Hosts</Link>
      <h3>Hi this is the Landing page</h3>
    </div>
    // </Layout>
  )
}
