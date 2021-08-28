import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { useContext, useState } from 'react';
import { Context } from './Context';
import Login from './screens/Login';
import Register from './screens/Register';
import Layout from './layouts/Layout';
import MainContainer from './containers/MainContainer';
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from './services/auth'

function App() {
  const [isOnProfile, setIsOnProfile] = useState(false);
  const [invalid, setInvalid] = useState(false);
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
    console.log(userData.error)
    if (userData.error) {
      setInvalid(true)
    } else {
      setCurrentUser(userData);
      setInvalid(false)
      history.push(`/users/${userData.id}/edit`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
    history.push('/');
  };



  return (
    <div className="App">
  
      <Layout handleVerify={handleVerify} handleLogout={handleLogout}
        isOnProfile={isOnProfile} setIsOnProfile={setIsOnProfile}
        >
          <Switch>
            <Route path="/login">
              <Login handleLogin={handleLogin}/>
            </Route>
            <Route path="/register">
            <Register handleRegister={handleRegister}
              invalid={invalid} setInvalid={setInvalid}
            />
            </Route>  
            <Route path="/">
              <MainContainer setIsOnProfile={setIsOnProfile} />
            </Route>
          </Switch>
        </Layout>
   
    </div>
  );
}

export default App;
