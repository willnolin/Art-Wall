import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/LocationDetail.css'
import FeaturedArtists from '../components/FeaturedArtists'
// import Layout from '../layouts/Layout'
import { getAllArtworks } from '../services/artworks'
import { getOneLocation } from '../services/locations'
// import { getAllUsers } from '../services/users'
// import { Context } from '../Context'

export default function LocationDetail() {
  const [location, setLocation] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchLocation = async () => {
      const resp = await getOneLocation(id)
      setLocation(resp)
    };
    fetchLocation();

  }, [])

  return (
    // <Layout>
    <div className="location-details-container">
      <div className="location-details-title">
        <h3 className="title">{location?.name}</h3>
        <p className="city-state"> {`${location?.city}, ${location?.state}`}</p>
      </div>
      <div className="location-details-row">
        <h4>Featured Artists</h4>
        {location?.artworks.reduce((acc, artwork) => (
          acc.map(a => a.user.name).includes(artwork.user.name) ?
            acc : [...acc, artwork]
        ), [])
          .map(artwork => (
            <Link to={`/users/${artwork.user_id}`}><p>{artwork.user.name}</p></Link>
          )
          )}
        <img src={location?.img_url} alt={location?.name} className="location-image" />
      </div>
      <div className="location-details-row"></div>
    </div>
    // </Layout>
  )
}
