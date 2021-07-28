import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context'
import Search from '../components/Search'
import './css/LocationList.css'
import { getAllLocations } from '../services/locations'

export default function LocationList() {
  const { locations, setLocations } = useContext(Context)
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      const resp = await getAllLocations()
      setLocations(resp)
    };
    fetchLocations();
  }, [])


  return (
    <div className="locations-container">
      <Search setSearchItem={setSearchItem} />
      <div className="locations-list-container">
        {locations.filter((location) => {
          if (searchItem === "") {
            return location;
          }
          else if (location.name.toLowerCase()
            .includes(searchItem.toLowerCase())) {
            return location
          }
        }).map(location => (
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
  )
}
