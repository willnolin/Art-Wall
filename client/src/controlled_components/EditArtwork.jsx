import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../Context';
import { useParams, useHistory } from 'react-router-dom';
import { getOneArtwork, putArtwork } from "../services/artworks.js"
import { getAllLocations } from '../services/locations';
import './css/EditArtwork.css'

export default function EditArtwork() {
  const { currentUser, locations, setLocations, artwork, setArtwork } = useContext(Context)
  const { id } = useParams();
  const history = useHistory()

  const [formData, setFormData] = useState({
    title: '',
    img_url: '',
    location_id: 0
  })

  const { title, img_url, location_id } = formData;

  useEffect(() => {
    const fetchArtwork = async () => {
      const thisArt = await getOneArtwork(id);
      setArtwork(thisArt)
    }
    fetchArtwork();
  }, [])

  useEffect(() => {
    const fetchLocations = async () => {
      const resp = await getAllLocations()
      setLocations(resp)
    };
    fetchLocations();
  }, [])

  useEffect(() => {
    const prefillFormData = () => {
      currentUser &&
        setFormData({
          title: artwork?.title,
          img_url: artwork?.img_url,
          location_id: artwork?.location_id
        });
    };

    prefillFormData();

  }, [artwork]);

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate(id, formData)
  }

  const handleUpdate = async (id, formData) => {
    const artData = await putArtwork(id, formData);
    setArtwork(
      artData
    );
    history.push(`/users/${artwork?.user_id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="edit-artwork-form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Edit Artwork</h3>
        <div className="form-row">
          <label>Title:
            <input type="text" name="title" value={title} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>Image URL:
            <input type="text" name="img_url" value={img_url} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>Location:
            <select name="location_id" id="location_select" value={location_id} onChange={handleChange}>
              <option>-select location-</option>
              {locations.map(location => (
                <option value={location.id}>{location.name}</option>
              ))}
            </select>

          </label>
        </div>
        <button>Save</button>
      </form>
    </div>
  )
}
