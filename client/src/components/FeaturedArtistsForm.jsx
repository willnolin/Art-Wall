import React, { useState, useEffect } from 'react'
import { getAllUsers } from '../services/users';

export default function FeaturedArtistsForm(props) {
  const [users, setUsers] = useState([])
  const { userId } = props;
  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    }
    fetchUsers();
  }, [])

  return (
    <div>
      <p>{users.find((user) => user.id === userId)?.name}</p>
    </div>
  )
}
