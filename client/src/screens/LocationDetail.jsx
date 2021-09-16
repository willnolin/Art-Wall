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
// eslint-disable-next-line
  }, [])

  return (
    <div className="location-details-container">
      <div className="location-details-title">
        {currentUser?.id === location?.location.user_id ?
          <>
            <p>You are the owner of this location</p>
            <Link to={`/locations/${id}/edit`}><button>Edit</button></Link>
          </>
          : ''}
        <h3 className="title">{location?.location.name}</h3>
        <p className="city-state"> {`${location?.location.city}, ${location?.location.state}`}</p>
      </div>
      <div className="location-details-row">
        <div className="location-details-artists">
          <h4 className="featured-artists-title">Featured Artists</h4>
          {location?.artists.map(artist => (
            <div className="featured-artists-link">
            <Link to={`/users/${artist.id}`}><p>{artist.name}</p></Link>
            </div>
          ))}
        </div>
        <img src={location?.location.img_url} alt={location?.location.name} className="location-image" />
      </div>
      <div className="location-details-row">
        <img src="https://res.cloudinary.com/willnolin/image/upload/v1627229241/map_w1mll4.png"
          alt="map" className="location-details-map" />
        <div className="location-details-details">
          <p>{location?.location.message}</p>
          <p>{`Commission: ${location?.location.commission}%`}</p>
          <p>On-site sales: {location?.location.sales ? 'YES' : 'NO'}</p>
        </div>
      </div>
          {currentUser ?
            <button className="contact-button" onClick={handleClick}>Contact {location?.location.name}</button> :
            <p className="login-to-contact-message">Log in to contact {location?.location.name}</p>
          }
      <>
        <div className="modal" style={{ display: show }}>
          <div className="contact-form">
            <span className="close" onClick={() => {
              setShow('none')
            }}>{`close (x)`}</span>
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <p className="contact-title">Contact {location?.name}</p>
              <label>Enter your name:</label>
              <input className="contact-input" type="text" name="name" />
              <br />
              <label>Enter your email:</label>
              <input className="contact-input" type="text" name="email" />
              <br />
              <label>Type your message:</label>
              <textarea className="contact-input" name="message" rows='5' />
              <br />
              <button>submit</button>
            </form>
          </div>
        </div>
      </>
    </div>
  )
}
