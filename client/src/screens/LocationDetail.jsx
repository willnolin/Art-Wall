import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllArtworks } from '../services/artworks'
import { getOneLocation } from '../services/locations'
import { getAllUsers } from '../services/users'
// import { Context } from '../Context'

export default function LocationDetail() {
  const [location, setLocation] = useState(null)
  const [artworks, setArtworks] = useState([])
  const [users, setUsers] = useState([])
  const { id } = useParams()
  // const { user, setUser } = useContext(Context)

  useEffect(() => {
    const fetchLocation = async () => {
      const resp = await getOneLocation(id)
      setLocation(resp)
    };
    const fetchArtworks = async () => {
      const allArt = await getAllArtworks();
      setArtworks(allArt);
    };
    // const fetchUsers = async () => {
    //   const allUsers = await getAllUsers();
    //   setUsers(allUsers);
    // };
    fetchLocation();
    fetchArtworks();
    // fetchUsers();
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }
    fetchUsers();
  }, [users])

  return (
    <div className="location-detail-container">
      <h3>{location?.name}</h3>
      <hr />
      <p>{`${location?.city}, ${location?.state}`}</p>
      <h4>Featured Artists</h4>
      {artworks.map(artwork => {
        if (artwork.location_id === location?.id) {
          //change this to name when we have names in users table
          return <Link to={`/users/${artwork.user_id}`}>
            <p>{users.find((user) => user.id === artwork.user_id)?.username}</p>
          </Link>
        }
      })}
    </div>
  )
}
