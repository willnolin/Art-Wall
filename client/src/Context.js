import React, { useState, createContext } from 'react';
import { useHistory } from "react-router-dom"
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from './services/auth'

export const Context = createContext();

export const Provider = (props) => {
  const [artwork, setArtwork] = useState(null);
  const [locations, setLocations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();

  const handleVerify = async () => {
    const userData = await verifyUser();
    setCurrentUser(userData);
  };

  const handleLogin = async (formData) => {
    const userData = await loginUser(formData);
    setCurrentUser(userData);
    history.push(`/users/${userData.id}`);
  };

  const handleRegister = async (formData) => {
    const userData = await registerUser(formData);
    setCurrentUser(userData);
    history.push('/');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
    history.push('/');
  };

  const providerValue = {
    artwork, setArtwork, locations, setLocations,
    handleLogin, handleRegister, handleVerify,
    handleLogout, currentUser, setCurrentUser, isEditing, setIsEditing
  }


  return (
    <>
      <Context.Provider value={providerValue}>
        {props.children}
      </Context.Provider>
    </>
  )
}
