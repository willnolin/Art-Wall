import React, { useState, useEffect, useContext } from 'react'
import { Context } from "../Context"
import { useParams } from 'react-router-dom'
import { getOneUser } from "../services/users";
import "./css/ArtistDetail.css"
// ask why the picture takes so long to show up.

export default function ArtistDetail() {
  const { id } = useParams();
  const { user, setUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      const thisArtist = await getOneUser(id);
      setUser(thisArtist)
    };
    fetchUser()

  }, [])

  return (

    <div>
      {user &&
        <div className="artist-details-container">
          <h1>{user.name}</h1>
          <hr />
          <img src={`${user.profile_pic}`} alt={`${user.username}`} className="profile-pic" />

        </div>
      }
    </div>

  )
}
