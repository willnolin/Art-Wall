import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { useContext, useState } from 'react';
// import { Provider } from "./Context"
import { Context } from './Context';
// import Landing from './screens/Landing';
// import LocationList from './screens/LocationList';
// import LocationDetail from './screens/LocationDetail';
// import ArtistDetail from './screens/ArtistDetail';
import Login from './screens/Login';
import Register from './screens/Register';
import Layout from './layouts/Layout';
import MainContainer from './containers/MainContainer';
// import EditArtist from './controlled_components/EditArtist';
// import CreateLocation from './controlled_components/CreateLocation';
// import EditArtwork from './controlled_components/EditArtwork';
// import AddArtwork from './controlled_components/AddArtwork';
// import EditLocation from './controlled_components/EditLocation';
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from './services/auth'

function App() {
  const [isOnProfile, setIsOnProfile] = useState(false);
  
  const {setCurrentUser} = useContext(Context)
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
    history.push(`/users/${userData.id}/edit`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
    history.push('/');
  };



  return (
    <div className="App">
      {/* <Provider> */}
      <Layout handleVerify={handleVerify} handleLogout={handleLogout}
        isOnProfile={isOnProfile} setIsOnProfile={setIsOnProfile}
        >
          <Switch>
            <Route path="/login">
              <Login handleLogin={handleLogin}/>
            </Route>
            <Route path="/register">
              <Register handleRegister={handleRegister}/>
            </Route>  
            <Route path="/">
              <MainContainer setIsOnProfile={setIsOnProfile} />
            </Route>
          </Switch>
        </Layout>
      {/* </Provider> */}
    </div>
  );
}

export default App;
