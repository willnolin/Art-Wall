import React, { useState, createContext } from 'react';

export const Context = createContext();

export const Provider = (props) => {
  const [user, setUser] = useState(null);
  const [locations, setLocations] = useState([]);
  // const [searchResult, setSearchResult] = useState(null);
  // const [searchInput, setSearchInput] = useState("");

  const providerValue = {
    user, setUser, locations, setLocations
    //   searchResult, setSearchResult,
    //   searchInput, setSearchInput
  }


  return (
    <>
      <Context.Provider value={providerValue}>
        {props.children}
      </Context.Provider>
    </>
  )
}
