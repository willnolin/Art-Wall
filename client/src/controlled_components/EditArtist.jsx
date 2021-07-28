import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context"
import { useParams, useHistory, Link } from 'react-router-dom'
import { putUser } from '../services/users.js'
import "./css/EditArtist.css"

export default function EditArtist() {
  const { currentUser, setCurrentUser, setIsOnProfile } = useContext(Context)
  const { id } = useParams();
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: '',
    profile_pic: '',
    contact: '',
    city_state: '',
    website: '',
    message: '',
  })

  const { name,
    profile_pic,
    contact,
    city_state,
    website,
    message } = formData;

  setIsOnProfile(false);

  useEffect(() => {
    const prefillFormData = () => {
      currentUser &&
        setFormData({
          name: currentUser.name,
          profile_pic: currentUser.profile_pic,
          contact: currentUser.contact,
          city_state: currentUser.city_state,
          website: currentUser.website,
          message: currentUser.message,
          // username: currentUser.username,
          // email: currentUser.email,
          // password: currentUser.password_digest
        });
    };

    prefillFormData();

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate(currentUser.id, formData)
  }

  const handleUpdate = async (id, formData) => {
    const userData = await putUser(id, formData);
    setCurrentUser(
      userData
    );
    history.push(`/users/${id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //add htmlFor and ids for screen readers
  return (
    <div className="edit-form-container">
      <form className="edit-form" onSubmit={(e) => handleSubmit(e)} onChange={handleChange}>
        <label className="form-input">Name:
          <input type="text" name="name" value={name} placeholder="artist name" />
        </label>
        <br />
        <label className="form-input">Profile_pic:
          <input type="text" name="profile_pic" value={profile_pic} placeholder="link to photo" />
        </label>
        <br />
        <label className="form-input">Contact:
          <input type="text" name="contact" value={contact} placeholder="email or phone" />
        </label>
        <br />
        <label className="form-input">City, State:
          <input type="text" name="city_state" value={city_state} placeholder="Where are you located?" />
        </label>
        <br />
        <label className="form-input">Website:
          <input type="text" name="website" value={website} placeholder="www.yoursite.com" />
        </label>
        <br />
        <label className="form-input">Message:
          <textarea type="text" name="message" value={message} rows="4" cols="20" placeholder="a little about you" />
        </label>
        <br />
        <div className="edit-artist-form-footer">
          <button className="save-btn">Save</button> <Link className="back-to-profile" to={`/users/${id}`}>Back to Profile (Discard changes)</Link>
        </div>
        <br />
      </form>
    </div>
  )
}
