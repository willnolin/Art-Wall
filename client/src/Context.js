import React, { useState, useEffect, createContext } from 'react';
import { useHistory } from "react-router-dom"
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from './services/auth'
import { putUser } from './services/users.js'

export const Context = createContext();

export const Provider = (props) => {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleUpdate = async (id, formData) => {
    const userData = await putUser(id, formData);
    setCurrentUser({
      ...currentUser,
      userData
      // (prevState) =>
      // prevState.map((user) => {
      // 	return user.id === Number(id) ? userData : user;
      // })
    });
    history.push(`/user/${id}}`);
  };

  const providerValue = {
    user, setUser, locations, setLocations,
    handleLogin, handleRegister, handleVerify,
    handleLogout, handleUpdate, currentUser
  }


  return (
    <>
      <Context.Provider value={providerValue}>
        {props.children}
      </Context.Provider>
    </>
  )
}
