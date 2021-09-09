import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context"
import { useParams, Link } from 'react-router-dom'
import { getOneUser } from "../services/users";
import { deleteArtwork } from '../services/artworks';
import "./css/ArtistDetail.css"
// ask why the picture takes so long to show up.

export default function ArtistDetail(props) {
  const { isOnProfile, setIsOnProfile } = props;
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(Context)
  
  useEffect(() => {
    setIsOnProfile(true);
   
}, [user])
  useEffect(() => {
    const fetchUser = async () => {
      const thisArtist = await getOneUser(id);
      setUser(thisArtist)
    };
    fetchUser()
// eslint-disable-next-line
  }, [deleted, id])

  const handleDelete = async (id) => {
    await deleteArtwork(id)
    user.artworks.splice(user.artworks.indexOf(id), 1);
    setDeleted(prevState => !prevState)
  }

  return (

    <div>
      {user &&
        <div className="artist-details-container">
          <div className="artist-details-row">
            <div className="artist-details-section">
            <h1 className="artist-details-name">{user.name}</h1>
            <p className="artist-details-city-state">{`Works in: ${user.city_state}`}</p>
              <p>{user.message}</p>
            </div>
            <img src={`${user.profile_pic}`} alt={`${user.username}`} className="profile-pic" />
          <div className="artist-details-section">
            {console.log(user)}
              <h4 className="display-titles">{user.name}'s work is currently on display at:</h4>
              {user.artworks.reduce((acc, artwork) => (
                acc.map(a => a.location ? a.location.name : false).includes(artwork.location?.name) ?
                  acc : [...acc, artwork]
              ), [])
              .map((artwork => (
                <React.Fragment key={artwork.id} >
                <Link to={`/locations/${artwork.location_id}`}><p className="location-name">{artwork.location?.name}</p></Link>
                </React.Fragment>
                  )
                ))}
            </div>
          </div>
          <div className="artist-details-row artwork-row">
            {user.artworks &&
              <React.Fragment key = {user.id}>{
                user.artworks.map(art => (
                  <div className="artwork-container">
                    <h4>{art.title}</h4>
                    <img src={art.img_url} alt={art.title}
                      className="artist-details-artwork" />
                    {currentUser?.id === Number(id) &&
                      <div className="artwork-edit-links">
                        <Link to={`/artworks/${art.id}`}>
                          <p>Edit</p>
                        </Link>

                        <p className="artwork-delete-link"
                          onClick={() => handleDelete(art.id)}>Delete</p>
                      </div>
                    }
                  </div>
                ))
              }</React.Fragment>
            }
            {currentUser?.id === Number(id) &&
              <div className="add-art-container">
                <Link to={`/artworks`}><img src="https://res.cloudinary.com/willnolin/image/upload/v1627152616/add-sign_is1j85.jpg"
                  alt="click to add art"
                  className="artist-details-artwork add-art" />
                  <p className="hidden-text">Add Image</p></Link>
              </div>
            }
          </div>
        </div>
      }
    </div>

  )
}
