import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import EditArtist from '../controlled_components/EditArtist';
import CreateLocation from '../controlled_components/CreateLocation';
import EditArtwork from '../controlled_components/EditArtwork';
import AddArtwork from '../controlled_components/AddArtwork';
import EditLocation from '../controlled_components/EditLocation';
import Landing from '../screens/Landing';
import LocationList from '../screens/LocationList';
import LocationDetail from '../screens/LocationDetail';
import ArtistDetail from '../screens/ArtistDetail';

export default function MainContainer(props) {
  
  const [artwork, setArtwork] = useState(null);
  const [locations, setLocations] = useState([]);
  const { setIsOnProfile} = props;

  return (
    <div>
      <Switch>
        <Route path="/users/:id/edit">
          <EditArtist setIsOnProfile={setIsOnProfile}/>
        </Route>
        <Route path="/users/:id">
          <ArtistDetail setIsOnProfile={setIsOnProfile}/>
        </Route>
        <Route path="/locations/:id/edit">
          <EditLocation locations={locations} setLocations={setLocations}/>
        </Route>
        <Route path="/locations/new">
          <CreateLocation setLocations={setLocations}/>
        </Route>
        <Route path="/locations/:id">
          <LocationDetail />
        </Route>
        <Route path="/locations">
          <LocationList locations={locations} setLocations={setLocations}/>
        </Route>
        <Route path="/artworks/:id">
          <EditArtwork locations={locations} setLocations={setLocations}
            artwork={artwork} setArtwork={setArtwork}/>
        </Route>
        <Route path="/artworks">
          <AddArtwork setArtwork={setArtwork}/>
        </Route>
        <Route path="/home" >
          <Landing />
        </Route>
      </Switch>
    </div>
  )
}
