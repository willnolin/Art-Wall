import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'
import { getAllLocations } from '../services/locations'

export default function LocationList() {
  const { locations, setLocations } = useContext(Context)

  useEffect(() => {
    const fetchLocations = async () => {
      const resp = await getAllLocations()
      setLocations(resp)
    };
    fetchLocations();
  }, [])


  return (
    <div>
      <h3>All Hosts</h3>
      {locations.map(location => (
        <div key={location.id}>
          <Link to={`/locations/${location.id}`}>
            <h4>{location.name}</h4>
          </Link>
        </div>
      ))}
    </div>
  )
}
