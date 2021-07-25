import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'
import './css/LocationList.css'
// import Layout from '../layouts/Layout'
import { getAllLocations } from '../services/locations'

export default function LocationList() {
  const { locations, setLocations, setIsEditing } = useContext(Context)

  setIsEditing(false);

  useEffect(() => {
    const fetchLocations = async () => {
      const resp = await getAllLocations()
      setLocations(resp)
    };
    fetchLocations();
  }, [])


  return (
    // <Layout>
    <div className="locations-container">
      <h3>All Hosts</h3>
      <div className="locations-list-container">
        {locations.map(location => (
          <div key={location.id} className="location-card">
            <Link to={`/locations/${location.id}`}>
              <img src={location.img_url} alt={location.name} className="location-card-img" />
              <h4 className="location-card-title">{location.name}</h4>
              <h5>{`${location.city}, ${location.state}`}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
    // </Layout>
  )
}
