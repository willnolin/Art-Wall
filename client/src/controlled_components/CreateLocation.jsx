import React, { useState, useContext } from 'react'
import { Context } from '../Context'
import { useHistory } from 'react-router-dom'
import { postLocation } from '../services/locations.js'
import "./css/CreateLocation.css"

export default function CreateLocation() {
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
  const { setLocations } = useContext(Context);
  const history = useHistory();

  const handleCreate = async (formData) => {
    const locationData = await postLocation(formData);
    setLocations((prevState) => [...prevState, locationData]);
    history.push('/locations');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="create-location-form">

      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreate(formData);
      }}>
        <h3>Create a Location</h3>
        <label className="form-field">Name:
          <input type="text" name="name" value={name} onChange={handleChange} />
        </label>
        <br />
        <label className="form-field">Street:
          <input type="text" name="street" value={street} onChange={handleChange} />
        </label>
        <br />
        <label className="form-field">City:
          <input type="text" name="city" value={city} onChange={handleChange} />
        </label>
        <br />
        <label className="form-field">State:
          <input type="text" name="state" value={state} onChange={handleChange} />
        </label>
        <br />
        <label className="form-field">Image:
          <input type="text" name="img_url" value={img_url} onChange={handleChange} />
        </label>
        <br />
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
          <input type="number" name="commission" min="0" value={commission} onChange={handleChange} />
        </label>
        <br />
        <button className="submit-btn">Submit</button>
        <p className = "cancel" onClick={() => {history.push("/locations")}}>Cancel</p>
        <br />
      </form>
    </div>
  )
}

