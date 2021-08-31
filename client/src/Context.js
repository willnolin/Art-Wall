import React, { useState, createContext } from 'react';

export const Context = createContext();

export const Provider = (props) => {
  // const [artwork, setArtwork] = useState(null);
  // const [locations, setLocations] = useState([]);c
  const [currentUser, setCurrentUser] = useState(null);
  // const [isOnProfile, setIsOnProfile] = useState(false);

  const providerValue = {
    // artwork, setArtwork, locations, setLocations,
    currentUser, setCurrentUser,
    // isOnProfile, setIsOnProfile
  }


  return (
    <>
      <Context.Provider value={providerValue}>
        {props.children}
      </Context.Provider>
    </>
  )
}
