import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../Context'
import { useHistory, useParams } from 'react-router-dom'
import { getOneLocation, putLocation, deleteLocation } from '../services/locations.js'
import { getAllUsers } from '../services/users'
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
  const [artistsUpdated, setArtistsUpdated] = useState(false);  // flag for when the featured artist list is updated
  const [artistFormData, setArtistFormData] = useState({
    artistName: ''
  });
  const { artistName } = artistFormData;
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
  // Location Edit form //////////////////////////////////
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

  //  Add Artist Form /////////////////////////////////////
  // grab all users from this location
  // useEffect(() => {
  //   const initArtists = () => {
  //     const featured = []
  //     location?.artworks.reduce((acc, artwork) => (
  //       acc.map(a => a.user.name).includes(artwork.user.name) ?
  //         acc : [...acc, artwork]
  //     ), [])
  //       .map(artwork => (
  //         featured.push(artwork.user)
  //       )
  //       )
  //     console.log(featured)
  //     setFeaturedArtists(featured)
  //   }
  //   initArtists();
  // }, [location])
  // // handle change for add artist form
  // const artistInputHandleChange = (e) => {
  //   const { name, value } = e.target;
  //   setArtistFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // }
  // // updating state of featured artist list, clear form input, flag change in list
  // const handleArtistList = (artistFormData) => {
  //   setFeaturedArtists(prevState => ([
  //     ...prevState, artistFormData
  //   ]));
  //   setArtistFormData({
  //     artistName: ''
  //   });
  //   setArtistsUpdated(prevState => !prevState);
  // }
  // // check to see if artist exists 
  // const checkForExistingArtist = async () => {
  //   const allArtists = await getAllUsers();
  //   allArtists.map(artist => {
  //     if (artist.name === artistName) {
  //       artist.artworks.location_id = id;
  //       return true;
  //     }
  //   });
  //   return false;
  // }
  // //add artist to location(set user_id to id of entered user in artwork table)
  // const setLocationId = () => {

  // }

  return (
    <div className="edit-location-container">
      {/* <div className="edit-location-artists">
        <form onSubmit={(e) => {
          e.preventDefault();
          handleArtistList(artistFormData);
        }}>
          <label>
            <input type="text" name="artistName" value={artistName} onChange={artistInputHandleChange} />
          </label>
          <button>Add Artist</button>
        </form>
        {featuredArtists?.map(artist => (
          <p>{artist?.name}</p>
        ))}

      </div> */}
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
            <label htmlFor="html">yes</label><br />
            <input type="radio" id="no" name="sales" value={false} onChange={handleChange} />
            <label htmlFor="no">no</label> <br />
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
