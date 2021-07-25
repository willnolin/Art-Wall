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
    message: ''
  });
  const { name, street, city, state, img_url, message } = formData;
  const { setLocations } = useContext(Context);
  const history = useHistory();

  const handleCreate = async (formData) => {
    const locationData = await postLocation(formData);
    setLocations((prevState) => [...prevState, locationData]);
    history.push('/locations');
  };

  // const handleUpdate = async (id, formData) => {
  //   const foodData = await putFood(id, formData);
  //   setFoodList((prevState) =>
  //     prevState.map((food) => {
  //       return food.id === Number(id) ? foodData : food;
  //     })
  //   );
  //   history.push('/locations');
  // };

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
          <input type="text" name="message" value={message} onChange={handleChange} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}

