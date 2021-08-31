import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/LocationDetail.css'
import { getOneLocation } from '../services/locations'

import { Context } from '../Context'

export default function LocationDetail() {
  const [location, setLocation] = useState(null)
  const { id } = useParams()
  const { currentUser } = useContext(Context)
  const formObj = {
    name: "",
    email: "",
    message: ""

  }
  const [input, setInput] = useState(formObj);
  const [show, setShow] = useState('none')

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }))
  }
  const handleClick = () => {
    setShow('block')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  useEffect(() => {
    const fetchLocation = async () => {
      const resp = await getOneLocation(id)
      setLocation(resp)
    };
    fetchLocation();

  }, [])

  return (
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
          <h4 className="featured-artists-title">Featured Artists</h4>
          {location?.artworks.reduce((acc, artwork) => (
            acc.map(a => a.user.name).includes(artwork.user.name) ?
              acc : [...acc, artwork]
          ), [])
            .map(artwork => (
              <div className="featured-artists-link">
                <Link to={`/users/${artwork.user_id}`}><p>{artwork.user.name}</p></Link>
              </div>
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
            <button className="contact-button" onClick={handleClick}>Contact {location?.name}</button> :
            <p className="login-to-contact-message">Log in to contact {location?.name}</p>
          }
        </div>
      </div>
      <>
        <div className="modal" style={{ display: show }}>
          <div className="form">
            <span className="close" onClick={() => {
              setShow('none')
            }}>{`close (x)`}</span>

            <form onChange={handleChange} onSubmit={handleSubmit}>
              <p>Contact {location?.name}</p>
              <br />
              <label>Enter your name:</label>
              <input type="text" name="name" />
              <br />
              <label>Enter your email:</label>
              <input type="text" name="email" />
              <br />
              <label>Type your message:</label>
              <textarea name="message" rows='5' />
              <br />
              <button>submit</button>
            </form>
          </div>
        </div>
      </>
    </div>
  )
}
