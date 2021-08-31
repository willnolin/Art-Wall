import React, { useState, createContext } from 'react';

export const Context = createContext();

export const Provider = (props) => {

  const [currentUser, setCurrentUser] = useState(null);

  const providerValue = {
    currentUser, setCurrentUser,
  }

  return (
    <>
      <Context.Provider value={providerValue}>
        {props.children}
      </Context.Provider>
    </>
  )
}
