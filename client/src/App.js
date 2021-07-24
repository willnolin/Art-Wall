import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
// import { useState, useEffect } from 'react';
import { Provider } from "./Context"
import Landing from './screens/Landing';
import LocationList from './screens/LocationList';
import LocationDetail from './screens/LocationDetail';
import ArtistDetail from './screens/ArtistDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import Layout from './layouts/Layout';
// import {
//   loginUser,
//   registerUser,
//   removeToken,
//   verifyUser,
// } from './services/auth'
import EditArtist from './controlled_components/EditArtist';
function App() {

  // const [currentUser, setCurrentUser] = useState(null);
  // const history = useHistory();

  // useEffect(() => {
  //   const handleVerify = async () => {
  //     const userData = await verifyUser();
  //     setCurrentUser(userData);
  //   };
  //   handleVerify();
  // }, []);

  // const handleLogin = async (formData) => {
  //   const userData = await loginUser(formData);
  //   console.log(userData.id)
  //   setCurrentUser(userData);
  //   history.push(`/users/${userData.id}`);
  // };

  // const handleRegister = async (formData) => {
  //   const userData = await registerUser(formData);
  //   setCurrentUser(userData);
  //   history.push('/');
  // };

  // const handleLogout = () => {
  //   setCurrentUser(null);
  //   localStorage.removeItem('authToken');
  //   removeToken();
  //   history.push('/');
  // };
  return (
    <div className="App">
      <Provider>
        <Layout>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/users/:id/edit">
              <EditArtist />
            </Route>
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
        </Layout>
      </Provider>
    </div>
  );
}

export default App;
