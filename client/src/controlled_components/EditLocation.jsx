import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../Context'
import { useHistory, useParams } from 'react-router-dom'
import { getOneLocation, putLocation, deleteLocation } from '../services/locations.js'
import './css/EditLocation.css'

export default function EditLocation() {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    img_url: '',
    message: '',
    sales: false,
    commission: 0
  });
  const { name, street, city, state, img_url, message, sales, commission } = formData;
  const { currentUser, locations, setLocations } = useContext(Context);
  const [location, setLocation] = useState(null);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  // const [deleted, setDeleted] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchLocation = async () => {
      const thisLocation = await getOneLocation(id);
      setLocation(thisLocation);
    }
    fetchLocation();
  }, [])
  //AUTO FILL FORM DATA RADIO BUTTON??? ???????????????????/
  useEffect(() => {
    const prefillFormData = () => {
      currentUser &&
        setFormData({
          name: location?.name,
          street: location?.street,
          city: location?.city,
          state: location?.state,
          img_url: location?.img_url,
          message: location?.message,
          sales: location?.sales,
          commission: location?.commission
        });
    };

    prefillFormData();

  }, [location]);

  // useEffect(() => {
  //   const fetchArtists = async () => {
  //     const artists = await 
  //   }
  // })

  const handleUpdate = async (formData) => {
    const locationData = await putLocation(id, formData);
    setLocations((prevState) =>
      prevState.map((location) => {
        return location.id === Number(id) ? locationData : location;
      })
    );
    history.push(`/locations/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    await deleteLocation(id)
    locations.splice(locations.indexOf(id), 1);
    // setDeleted(prevState => !prevState)
    history.push(`/locations`)
  }
  const handleArtistList = (e) => {
    e.preventDefault();


  }
  return (
    <div className="edit-location-container">
      <div className="edit-location-artists">
        <form onSubmit={(e) => handleArtistList(e)}>
          <label>
            <input type="text" />
          </label>
          <button>Add Artist</button>
        </form>
        {location?.artworks.reduce((acc, artwork) => (
          acc.map(a => a.user.name).includes(artwork.user.name) ?
            acc : [...acc, artwork]
        ), [])
          .map(artwork => (
            <div className="edit-location-artist">
              <p>{artwork.user.name}</p> <button onClick={() => handleArtistDelete(artwork.user.id)}>delete</button>
            </div>
          )
          )}
      </div>
      <div className="edit-location-form">

        <form onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(formData);
        }}>
          <h3>Edit Location</h3>
          <label className="form-field">Name:
            <input type="text" name="name" value={name} onChange={handleChange} />
          </label>
          <label className="form-field">Street:
            <input type="text" name="street" value={street} onChange={handleChange} />
          </label>
          <label className="form-field">City:
            <input type="text" name="city" value={city} onChange={handleChange} />
          </label>
          <label className="form-field">State:
            <input type="text" name="state" value={state} onChange={handleChange} />
          </label>
          <label className="form-field">Image:
            <input type="text" name="img_url" value={img_url} onChange={handleChange} />
          </label>
          <label className="form-field">Message:
            <textarea name="message" rows="5" value={message} onChange={handleChange} />
          </label>
          <div className="form-field">
            <p>On-site sales?</p>
            <input type="radio" id="yes" name="sales" value={true} onChange={handleChange} />
            <label for="html">yes</label><br />
            <input type="radio" id="no" name="sales" value={false} onChange={handleChange} />
            <label for="no">no</label> <br />
          </div>
          <label className="form-field">Commission:
            <input type="number" name="commission" value={commission} onChange={handleChange} />
          </label>
          <button type="submit">Submit</button> <button onClick={() => handleDelete(id)}>delete</button>
        </form>
      </div>
    </div>
  )
}
