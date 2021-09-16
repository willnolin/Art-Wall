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
      // console.log(thisArtist)
      setUser(thisArtist)
    };
    fetchUser()
// eslint-disable-next-line
  }, [deleted, id])

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this artwork?")
    if (confirmation) {
      await deleteArtwork(id)
      user.artworks.splice(user.artworks.indexOf(id), 1);
      setDeleted(prevState => !prevState)
    }
  }

  return (

    <div>
      {user.user &&
        <div className="artist-details-container">
          <div className="artist-details-row">
            <div className="artist-details-section">
            <h1 className="artist-details-name">{user.user?.name}</h1>
            <p className="artist-details-city-state">{`Works in: ${user.user?.city_state}`}</p>
              <p>{user.user?.message}</p>
            </div>
            <img src={`${user.user?.profile_pic}`} alt={`${user.user?.username}`} className="profile-pic" />
            <div className="artist-details-section">
            <h4 className="display-titles">{user.user?.name}'s work is currently on display at:</h4>
            {user.locations?.map((location, i) => (
              <Link to={`/locations/${location.id}`}>
                <p className="location-name" key={i}>{location?.name}</p>
              </Link>
            ))}
              {/* {user.artworks.reduce((acc, artwork) => (
                acc.map(a => a.location ? a.location.name : false).includes(artwork.location?.name) ?
                  acc : [...acc, artwork]
              ), [])
              .map((artwork => (
                <React.Fragment key={artwork.id} >
                  <Link to={`/locations/${artwork.location_id}`}>
                    <p className="location-name">{artwork.location?.name}</p></Link>
                </React.Fragment>
                  )
                ))} */}
            </div>
          </div>
        <div className="artist-details-row artwork-row">
            {user.artworks &&
              <React.Fragment key = {user.user?.id}>{
                user.artworks?.map(art => (
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
              <br />
                  <p className="">Add Artwork</p></Link>
              </div>
            }
          </div>
        </div>
      }
    </div>

  )
}
