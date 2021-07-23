import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import FeaturedArtists from '../components/FeaturedArtists'
// import Layout from '../layouts/Layout'
import { getAllArtworks } from '../services/artworks'
import { getOneLocation } from '../services/locations'
// import { getAllUsers } from '../services/users'
// import { Context } from '../Context'

export default function LocationDetail() {
  const [location, setLocation] = useState(null)
  const [artworks, setArtworks] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchLocation = async () => {
      const resp = await getOneLocation(id)
      setLocation(resp)
    };
    const fetchArtworks = async () => {
      const allArt = await getAllArtworks();
      setArtworks(allArt);
    };
    fetchLocation();
    fetchArtworks();
  }, [])

  return (
    // <Layout>
    <div className="location-detail-container">
      <h3>{location?.name}</h3>
      <hr />
      <p>{`${location?.city}, ${location?.state}`}</p>
      <h4>Featured Artists</h4>
      {artworks.map(artwork => {
        if (artwork.location_id === location?.id) {
          return <Link to={`/users/${artwork.user_id}`}>
            <FeaturedArtists userId={artwork.user_id} />
          </Link>
        }
      })}
    </div>
    // </Layout>
  )
}
