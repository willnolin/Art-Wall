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
  const [errorObj, setErrorObj] = useState({});
  const {setCurrentUser} = useContext(Context)
  const history = useHistory(); 

  const handleVerify = async () => {
    const userData = await verifyUser();
    setCurrentUser(userData);
  };

  const handleLogin = async (formData) => {
    const userData = await loginUser(formData);
    if (userData.error) {
      setInvalid(true);
      setErrorObj(userData?.error.response.data)
    } else {
      setInvalid(false);
      setCurrentUser(userData);
      history.push(`/users/${userData.id}`);
     
    }
  };

  const handleRegister = async (formData) => {
      const userData = await registerUser(formData);
    // console.log(userData.error.response.data)
    if (userData.error) {
      setInvalid(true)
      setErrorObj(userData.error.response.data)
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
            <Login handleLogin={handleLogin}
              invalid={invalid}
              setInvalid={setInvalid}
              // errorObj={errorObj}
              // setErrorObj={setErrorObj}
            />
            </Route>
            <Route path="/register">
            <Register handleRegister={handleRegister}
              invalid={invalid} errorObj={errorObj}
              setErrorObj={setErrorObj}
            />
            </Route>  
            <Route path="/">
            <MainContainer isOnProfile={isOnProfile} setIsOnProfile={setIsOnProfile} />
            </Route>
          </Switch>
        </Layout>
   
    </div>
  );
}

export default App;
