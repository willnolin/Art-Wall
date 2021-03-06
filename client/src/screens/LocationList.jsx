import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Search from '../components/Search'
import './css/LocationList.css'
import { getAllLocations } from '../services/locations'

export default function LocationList(props) {
  const [searchItem, setSearchItem] = useState("");
  const { locations, setLocations } = props;
  useEffect(() => {
    const fetchLocations = async () => {
      const resp = await getAllLocations()
      setLocations(resp)
    };
    fetchLocations();
    // eslint-disable-next-line
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
            .includes(searchItem.toLowerCase()) ||
            location.city.toLowerCase()
              .includes(searchItem.toLowerCase()) ||
            location.state.toLowerCase()
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
