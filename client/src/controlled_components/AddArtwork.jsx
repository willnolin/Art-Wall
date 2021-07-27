import React, { useState, useContext } from 'react'
import { postArtwork } from '../services/artworks';
import { Context } from '../Context';
import { useHistory } from 'react-router-dom'
import "./css/AddArtwork.css"

export default function AddArtwork() {
  const { artwork, setArtwork, currentUser } = useContext(Context)
  const [formData, setFormData] = useState({
    title: '',
    img_url: ''
  })

  const history = useHistory()
  const { title, img_url } = formData;

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCreate(formData)
  }


  const handleCreate = async (formData) => {
    const artData = await postArtwork(formData);
    setArtwork(artData);
    console.log(artwork)
    history.push(`/users/${currentUser.id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="add-artwork-form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Add New Artwork</h3>
        <div className="form-row">
          <label>Title:</label>
          <input type="text" name="title" value={title} onChange={handleChange} />
        </div>
        <br />
        <div className="form-row">
          <label>Image URL: </label>
          <input type="text" name="img_url" value={img_url} onChange={handleChange} />
        </div>
        <br />
        <button>Save</button>
      </form>
    </div>
  )
}
