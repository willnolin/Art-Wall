import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from "./Context"
import Landing from './screens/Landing';
import LocationList from './screens/LocationList';
import LocationDetail from './screens/LocationDetail';
import ArtistDetail from './screens/ArtistDetail';
function App() {
  return (
    <div className="App">
      <Provider>
        <Switch>
          <Route path="/users/:id">
            <ArtistDetail />
          </Route>
          <Route path="/locations/:id">
            <LocationDetail />
          </Route>
          <Route path="/locations">
            <LocationList />
          </Route>
          <Route path="/" exact>
            <Landing />
          </Route>
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
