import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context"
import { useParams, useHistory } from 'react-router-dom'
import { putUser } from '../services/users.js'
import "./css/EditArtist.css"

export default function EditArtist() {
  const { currentUser, setCurrentUser } = useContext(Context)
  const { id } = useParams();
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: '',
    profile_pic: '',
    contact: '',
    city_state: '',
    website: '',
    message: ''
  })

  const { name,
    profile_pic,
    contact,
    city_state,
    website,
    message } = formData;

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
          username: currentUser.username,
          email: currentUser.email,
          password: currentUser.password_digest
        });
    };

    prefillFormData();

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    handleUpdate(currentUser.id, formData)
  }

  const handleUpdate = async (id, formData) => {
    const userData = await putUser(id, formData);
    setCurrentUser({
      userData
    });
    history.push(`/user/${id}}`);
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
        <label className="form-input">Profile_pic:
          <input type="text" name="profile_pic" value={profile_pic} placeholder="link to photo" />
        </label>
        <label className="form-input">Contact:
          <input type="text" name="contact" value={contact} placeholder="email or phone" />
        </label>
        <label className="form-input">City, State:
          <input type="text" name="city_state" value={city_state} placeholder="Where are you located?" />
        </label>
        <label className="form-input">Website:
          <input type="text" name="website" value={website} placeholder="www.yoursite.com" />
        </label>
        <label className="form-input">Message:
          <textarea type="text" name="message" value={message} rows="4" cols="50" placeholder="a little about you" />
        </label>
        <button>Save</button>
      </form>
    </div>
  )
}
