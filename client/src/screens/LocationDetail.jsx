import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/LocationDetail.css'
import FeaturedArtists from '../components/FeaturedArtists'
// import Layout from '../layouts/Layout'
import { getAllArtworks } from '../services/artworks'
import { getOneLocation } from '../services/locations'
// import { getAllUsers } from '../services/users'
import { Context } from '../Context'

export default function LocationDetail() {
  const [location, setLocation] = useState(null)
  const { id } = useParams()
  const { currentUser, setIsEditing } = useContext(Context)

  // setIsEditing(false);
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
        {currentUser?.id === location?.user_id ?
          <>
            <p>You are the owner of this location</p>
            <Link to={`/locations/${id}/edit`}><button>Edit</button></Link>
          </>
          : ''}
        <h3 className="title">{location?.name}</h3>
        <p className="city-state"> {`${location?.city}, ${location?.state}`}</p>
      </div>
      <div className="location-details-row">
        <div className="location-details-artists">
          <h4>Featured Artists</h4>
          {location?.artworks.reduce((acc, artwork) => (
            acc.map(a => a.user.name).includes(artwork.user.name) ?
              acc : [...acc, artwork]
          ), [])
            .map(artwork => (
              <Link to={`/users/${artwork.user_id}`}><p>{artwork.user.name}</p></Link>
            )
            )}
        </div>
        <img src={location?.img_url} alt={location?.name} className="location-image" />
      </div>
      <div className="location-details-row">
        <img src="https://res.cloudinary.com/willnolin/image/upload/v1627229241/map_w1mll4.png"
          alt="map" className="location-details-map" />
        <div className="location-details-details">
          <p>{location?.message}</p>
          <p>{`Commission: ${location?.commission}%`}</p>
          <p>On-site sales: {location?.sales ? 'YES' : 'NO'}</p>
          {currentUser ?
            <button>Contact {location?.name}</button> :
            <p className="login-to-contact-message">Log in to contact {location?.name}</p>
          }
        </div>
      </div>
    </div>
    // </Layout>
  )
}
